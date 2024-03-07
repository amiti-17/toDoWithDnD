import {
  EditFormType,
  defaultEditForm,
} from "@/config/system/types/editFormType";

const validateEditForm = (values: EditFormType): EditFormType => {
  const errors: EditFormType = { ...defaultEditForm };
  if (!values.title) {
    errors.title = "Required title";
  } else if (!values.description) {
    errors.description = "Required description";
  }
  return errors;
};

export default validateEditForm;
