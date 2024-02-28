"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import style from "./style.module.css";
import CollapseActions from "./CollapseActions";
import ButtonsGroup from "./ButtonsGroup";
import mongoose from "mongoose";
import { Formik, FormikErrors } from "formik";
import dbAPI from "@/dbAPI";
import { BoardType } from "@/config/system/types/sampleBoard";

type SearchBarType = {
  currentId: string;
  setBoard: React.Dispatch<React.SetStateAction<BoardType>>;
};

export default function SearchBar({ currentId, setBoard }: SearchBarType) {
  const router = useRouter();

  const onSubmitForm = async (
    value: { idField: string },
    errors: FormikErrors<{
      idField: string;
    }>
  ) => {
    console.log("submit is triggered");
    if (!errors.idField) {
      const newBoard = await dbAPI.find(value.idField);
      if (newBoard?._id.toString() !== currentId) {
        router.push("/boards/" + newBoard._id);
      }
    }
  };

  const [collapseIsOpen, setCollapseIsOpen] = useState<boolean>(false);

  return (
    <header className={style.formWrapper}>
      {/* <form onSubmit={onSubmit} className={style.form}>
        <input
          className={`${style.input} ${style.formElements}`}
          placeholder="Search board by id..."
        ></input>
        <ButtonsGroup
          setCollapseIsOpen={setCollapseIsOpen}
          styleFromElements={style.formElements}
        />
      </form> */}
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
        onSubmit={() => {
          console.log("submit!");
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
      <CollapseActions isOpened={collapseIsOpen} />
    </header>
  );
}
