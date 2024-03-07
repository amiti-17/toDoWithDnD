import { CommonStringObj } from "@/config/system/types/generalTypes";
import {
  HandleBlurType,
  HandleChangeType,
} from "@/config/system/types/formikHandlersTypes";
import style from "./style.module.css";

type EditInputProps = {
  name: string;
  placeholder: string;
  values: CommonStringObj;
  handleChange: HandleChangeType;
  handleBlur: HandleBlurType;
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
