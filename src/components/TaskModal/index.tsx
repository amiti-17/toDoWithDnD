"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useRef } from "react";
import { Formik, FormikErrors } from "formik";
import EditInputGroup from "./EditInputGroup";
import Overlay from "@/components/Overlay";
import { BoardContext } from "@/myPages/Home/hooks/useBoardContext";
import { CommonStringObj } from "@/config/system/types/generalTypes";
import { TaskModalProps } from "@/config/system/types/taskModalComponentProps";
import {
  EditFormType,
  defaultEditForm,
} from "@/config/system/types/editFormType";
import validateEditForm from "./validateEditForm";
import handleEditForm from "./handleEditForm";
import style from "./style.module.css";

const TaskModal = ({
  // isModalActive,
  // setIsModalActive,
  actionType,
  taskId,
  columnId,
  oldTitle,
  oldDescription,
}: TaskModalProps) => {
  const { board, setBoard, setIsBoardShouldUpdate } = useContext(BoardContext);
  const router = useRouter();
  const boardId = board._id.toString();
  const backLink = "/boards/" + boardId;
  const overlay = useRef(null);

  const handleForm = (
    values: EditFormType,
    errors: FormikErrors<EditFormType>
  ) =>
    handleEditForm({
      values,
      errors,
      board,
      columnId,
      actionType,
      taskId,
      router,
      backLink,
      setBoard,
      setIsBoardShouldUpdate,
    });

  const getInitialValues = () => {
    return actionType === "edit"
      ? ({
          title: oldTitle,
          description: oldDescription,
        } as EditFormType)
      : defaultEditForm;
  };

  return (
    <Overlay ref={overlay} close={router.back}>
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
              {actionType === "edit" ? "Update" : "Create"}
            </button>
            <Link href={backLink} className={style.backButton}>
              Back
            </Link>
            {/* <button onClick={router.back} className={style.backButton}>
              Back
            </button> */}
          </form>
        )}
      </Formik>
    </Overlay>
  );
};

export default TaskModal;
