"use client";

import { useContext, useRef } from "react";
import { Formik, FormikErrors } from "formik";
import { useParams, useSearchParams } from "next/navigation";
import EditInputGroup from "./EditInputGroup";
import Overlay from "@/components/Overlay";
import { BoardContext } from "@/myPages/Home/hooks/useBoardContext";
import { CommonStringObj } from "@/config/system/types/generalTypes";
import style from "./style.module.css";
import {
  EditFormType,
  defaultEditForm,
} from "@/config/system/types/editFormType";
import validateEditForm from "./validateEditForm";
import updateOrCreateTaskFunction from "./updateOrCreateTaskFunction";

type TaskModalProps = {
  setIsModalActive?: React.Dispatch<React.SetStateAction<boolean>>;
};

const TaskModal = ({ setIsModalActive }: TaskModalProps) => {
  const { board, setBoard, setIsBoardShouldUpdate } = useContext(BoardContext);
  const overlay = useRef(null);
  const params = useParams();
  const searchParams = useSearchParams();

  const handleForm = async (
    values: EditFormType,
    errors: FormikErrors<EditFormType>
  ) => {
    if (!errors.title && !errors.description) {
      const [type, taskId] = params?.taskParams as string[];
      const columnId = searchParams?.get("columnId");
      const myNewBoard = updateOrCreateTaskFunction({
        values,
        board,
        columnId,
        type: type ?? "",
        taskId: taskId ?? "",
      });

      setBoard(myNewBoard);
      if (setIsModalActive) {
        setIsModalActive(false);
      }
      setIsBoardShouldUpdate(true);
    }
  };

  const getInitialValues = () => {
    return params?.taskParams[0] === "edit"
      ? ({
          title: searchParams?.get("title"),
          description: searchParams?.get("description"),
        } as EditFormType)
      : defaultEditForm;
  };

  return (
    <Overlay ref={overlay} isModalActive={Boolean(setIsModalActive)}>
      <div
        className={style.modalWrapper}
        onClick={() => setIsModalActive && setIsModalActive(false)}
      >
        <Formik
          initialValues={getInitialValues()}
          validate={validateEditForm}
          onSubmit={async (values, { setSubmitting }) => {
            await handleForm(values, {});
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
              <EditInputGroup
                name="title"
                placeholder="title: "
                values={values}
                handleBlur={handleBlur}
                handleChange={handleChange}
                touched={touched as CommonStringObj}
                errors={errors}
              />
              <EditInputGroup
                name="description"
                placeholder="description: "
                values={values}
                handleBlur={handleBlur}
                handleChange={handleChange}
                touched={touched as CommonStringObj}
                errors={errors}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className={style.submit}
                onClick={async () => await handleForm(values, errors)}
              >
                {params?.taskParams[0] === "edit" ? "Update" : "Create"}
              </button>
            </form>
          )}
        </Formik>
      </div>
    </Overlay>
  );
};

export default TaskModal;
