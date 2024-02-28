"use client";

import { FormEvent, useState } from "react";
import style from "./style.module.css";
import CollapseActions from "./CollapseActions";
import ButtonsGroup from "./ButtonsGroup";
import mongoose from "mongoose";
import { Formik } from "formik";

export default function SearchBar() {
  const onSubmit = async (
    value: { idField: string }
    // event: FormEvent<HTMLFormElement>
  ) => {
    console.log(event);
    // event.preventDefault();
  }; // TODO: should be implemented

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
          if (!values.idField) {
            errors.idField = "Required";
          } else if (!mongoose.isValidObjectId(values.idField)) {
            errors.idField =
              "Invalid input, should be 12 byte string, or 24 character hex string";
          }
          return errors;
        }}
        onSubmit={(values) => onSubmit(values)}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit} className={style.form}>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.idField}
              className={`${style.input} ${style.formElements}`}
              placeholder="Search board by id..."
            />
            {errors.idField && touched.idField && errors.idField}
            <ButtonsGroup
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
