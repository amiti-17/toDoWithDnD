import {
  EditFormType,
  defaultEditForm,
} from "@/config/system/types/editFormType";

const validateEditForm = (values: EditFormType): EditFormType => {
  const errors: EditFormType = { ...defaultEditForm };
  if (!values.title.trim()) {
    errors.title = "Required title, just space - not allowed";
  } else if (!values.description) {
    errors.description = "Required description";
  }
  return errors;
};

export default validateEditForm;
