"use client";

import { useContext, useRef } from "react";
import { Formik, FormikErrors } from "formik";
import { useParams, useSearchParams } from "next/navigation";
import Overlay from "@/components/Overlay";
import { columnInit } from "@/config/system/columnNames";
import { BoardContext } from "@/myPages/Home/hooks/useBoardContext";
import { BoardType, TaskType } from "@/config/system/types/sampleBoard";
import style from "./style.module.css";

type TaskModalProps = {
  setIsModalActive?: React.Dispatch<React.SetStateAction<boolean>>;
};

type FormType = {
  title: string;
  description: string;
};

const baseFormObj: FormType = {
  title: "",
  description: "",
};

export default function TaskModal({ setIsModalActive }: TaskModalProps) {
  const { board, setBoard, setIsBoardShouldUpdate } = useContext(BoardContext);
  const overlay = useRef(null);
  const params = useParams();
  const searchParams = useSearchParams();

  const taskFunction = async (
    values: FormType,
    errors: FormikErrors<FormType>
  ) => {
    if (!errors.title && !errors.description) {
      const newBoard: BoardType = {
        ...board,
      };
      const columnId = Number(searchParams?.get("columnId"));
      if (
        params?.taskParams[0] === "edit" &&
        searchParams?.get("columnId") &&
        newBoard
      ) {
        newBoard[columnInit[columnId].title] = newBoard[
          columnInit[columnId].title
        ].map((el) => {
          if (el._id.toString() === params.taskParams[1]) {
            return values as TaskType;
          }
          return el;
        });
      } else {
        board[columnInit[0].title].push(values as TaskType);
      }

      setBoard(newBoard);
      if (setIsModalActive) {
        setIsModalActive(false);
      }
      setIsBoardShouldUpdate(true);
    }
  };

  return (
    <Overlay ref={overlay} isModalActive={Boolean(setIsModalActive)}>
      <div
        className={style.modalWrapper}
        onClick={() => setIsModalActive && setIsModalActive(false)}
      >
        <Formik
          initialValues={
            params?.taskParams[0] === "edit"
              ? ({
                  title: searchParams?.get("title"),
                  description: searchParams?.get("description"),
                } as FormType)
              : baseFormObj
          }
          validate={(values: FormType) => {
            const errors: FormType = { ...baseFormObj };
            if (!values.title) {
              errors.title = "Required title";
            } else if (!values.description) {
              errors.description = "Required description";
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            await taskFunction(values, {});
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit} className={style.taskFunctionForm}>
              <div className={style.inputWrapper}>
                <input
                  className={style.input}
                  type="text"
                  name="title"
                  placeholder="title:"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                />
                <div className={style.errorMessage}>
                  {touched.title && errors.title}
                </div>
              </div>
              <div className={style.inputWrapper}>
                <input
                  className={style.input}
                  type="text"
                  name="description"
                  placeholder="description:"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                />
                <div className={style.errorMessage}>
                  {touched.description && errors.description}
                </div>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={style.submit}
                onClick={async () => await taskFunction(values, errors)}
              >
                {params?.taskParams[0] === "edit" ? "Update" : "Create"}
              </button>
            </form>
          )}
        </Formik>
      </div>
    </Overlay>
  );
}
