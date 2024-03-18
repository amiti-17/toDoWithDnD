import { CommonStringObj } from "@/config/system/types/generalTypes";
import {
  HandleBlurType,
  HandleChangeType,
} from "@/config/system/types/formikHandlersTypes";
import EditInput from "./EditInput";
import style from "./style.module.css";

type InputGroupProps = {
  touched: CommonStringObj;
  errors: CommonStringObj;
  values: CommonStringObj;
  name: string;
  placeholder: string;
  handleChange: HandleChangeType;
  handleBlur: HandleBlurType;
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
