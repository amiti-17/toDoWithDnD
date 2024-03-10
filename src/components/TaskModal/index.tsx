"use client";

import { useContext, useRef } from "react";
import { Formik, FormikErrors } from "formik";
import EditInputGroup from "./EditInputGroup";
import Overlay from "@/components/Overlay";
import { BoardContext } from "@/myPages/Home/hooks/useBoardContext";
import { CommonStringObj } from "@/config/system/types/generalTypes";
import {
  EditFormType,
  defaultEditForm,
} from "@/config/system/types/editFormType";
import validateEditForm from "./validateEditForm";
import handleEditForm from "./handleEditForm";
import style from "./style.module.css";
import { TaskModalProps } from "@/config/system/types/taskModalComponentProps";

const TaskModal = ({
  isModalActive,
  setIsModalActive,
  actionType,
  taskId,
  columnId,
  oldTitle,
  oldDescription,
}: TaskModalProps) => {
  const { board, setBoard, setIsBoardShouldUpdate } = useContext(BoardContext);
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
      setBoard,
      setIsModalActive,
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
    <Overlay ref={overlay} isModalActive={isModalActive}>
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
                {actionType === "edit" ? "Update" : "Create"}
              </button>
            </form>
          )}
        </Formik>
      </div>
    </Overlay>
  );
};

export default TaskModal;
