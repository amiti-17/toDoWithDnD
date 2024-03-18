"use client";

import Link from "next/link";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { Formik, FormikErrors } from "formik";
import Overlay from "@/components/Overlay";
import {
  EditFormType,
  defaultEditForm,
} from "@/config/system/types/editFormType";
import { BoardContext } from "@/context/Board";
import handleEditForm from "@/functions/editForm/handleEditForm";
import { CommonStringObj } from "@/config/system/types/generalTypes";
import validateEditForm from "@/functions/editForm/validateEditForm";
import { TaskModalProps } from "@/config/system/types/taskModalComponentProps";
import EditInputGroup from "./EditInputGroup";
import style from "./style.module.css";

const TaskModal = ({
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
    <Overlay close={router.back}>
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
          </form>
        )}
      </Formik>
    </Overlay>
  );
};

export default TaskModal;
