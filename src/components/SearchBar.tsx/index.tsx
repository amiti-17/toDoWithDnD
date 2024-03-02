"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import mongoose from "mongoose";
import { Formik, FormikErrors } from "formik";
import dbAPI from "@/dbAPI";
import ButtonsGroup from "./ButtonsGroup";
import CollapseActions from "./CollapseActions";
import { BoardContext } from "@/myPages/Home/hooks/useBoardContext";
import style from "./style.module.css";

type SearchBarType = {
  setIsDeleted: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SearchBar({ setIsDeleted }: SearchBarType) {
  const router = useRouter();
  const { board } = useContext(BoardContext);
  console.log(board);

  const onSubmitForm = async (
    value: { idField: string },
    errors: FormikErrors<{
      idField: string;
    }>
  ) => {
    console.log("submit is triggered");
    if (!errors?.idField) {
      const newBoard = await dbAPI.find(value.idField);
      if (newBoard?._id && newBoard?._id.toString() !== board._id.toString()) {
        router.push("/boards/" + newBoard._id);
      }
    }
  };

  const [collapseIsOpen, setCollapseIsOpen] = useState<boolean>(false);

  return (
    <header className={style.formWrapper}>
      <Formik
        initialValues={{ idField: "" }}
        validate={(values: { idField: string }) => {
          const errors: { [index: string]: string } = {};
          try {
            errors.idField = mongoose.Types.ObjectId.isValid(values.idField)
              ? ""
              : "Invalid input, should be 12 byte string, or 24 character hex string";
          } catch (error) {
            errors.idField =
              "Invalid input, should be 12 byte string, or 24 character hex string";
          }
          console.log("current errors: ", errors);
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log("search was triggered");
          onSubmitForm(values, {});
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
          <form onSubmit={handleSubmit} className={style.form}>
            <div className={style.inputWrapper}>
              <input
                type="text"
                name="idField"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.idField}
                className={`${style.input} ${style.formElements}`}
                placeholder="Search board by id..."
              />
              <div className={style.errorWrapper}>
                {touched.idField && errors.idField}
              </div>
            </div>
            <ButtonsGroup
              handleSubmit={() => onSubmitForm(values, errors)}
              setCollapseIsOpen={setCollapseIsOpen}
              styleFromElements={style.formElements}
              disabled={isSubmitting}
            />
          </form>
        )}
      </Formik>
      <CollapseActions
        isOpened={collapseIsOpen}
        setIsDeleted={setIsDeleted}
        currentId={board?._id?.toString()}
      />
    </header>
  );
}
