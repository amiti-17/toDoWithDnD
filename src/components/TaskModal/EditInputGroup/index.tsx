import { ChangeEvent, FocusEvent } from "react";
import EditInput from "../EditInput";
import style from "./style.module.css";
import { CommonStringObj } from "@/config/system/types/generalTypes";

type InputGroupProps = {
  touched: CommonStringObj;
  errors: CommonStringObj;
  values: CommonStringObj;
  name: string;
  placeholder: string;
  handleChange: {
    (e: ChangeEvent<any>): void;
    <T = string | ChangeEvent<any>>(field: T): T extends ChangeEvent<any>
      ? void
      : (e: string | ChangeEvent<any>) => void;
  };
  handleBlur: {
    (e: FocusEvent<any, Element>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
};

const EditInputGroup = ({
  name,
  placeholder,
  touched,
  errors,
  values,
  handleBlur,
  handleChange,
}: InputGroupProps) => {
  return (
    <div className={style.inputWrapper}>
      <EditInput
        name={name}
        placeholder={placeholder}
        values={values}
        handleBlur={handleBlur}
        handleChange={handleChange}
      />
      <div className={style.errorMessage}>{touched[name] && errors[name]}</div>
    </div>
  );
};

export default EditInputGroup;
