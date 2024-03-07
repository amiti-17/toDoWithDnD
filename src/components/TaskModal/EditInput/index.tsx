import { ChangeEvent, FocusEvent } from "react";
import style from "./style.module.css";
import { CommonStringObj } from "@/config/system/types/generalTypes";

type EditInputProps = {
  name: string;
  placeholder: string;
  values: CommonStringObj;
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

const EditInput = ({
  name,
  placeholder,
  values,
  handleBlur,
  handleChange,
}: EditInputProps) => {
  return (
    <input
      className={style.input}
      type="text"
      name={name}
      placeholder={placeholder}
      onChange={handleChange}
      onBlur={handleBlur}
      value={values[name]}
    ></input>
  );
};

export default EditInput;
