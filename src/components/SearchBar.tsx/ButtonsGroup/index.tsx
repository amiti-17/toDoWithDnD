import { SetStateAction } from "react";
import { TbLayoutBottombarCollapseFilled } from "react-icons/tb";
import style from "./style.module.css";

type ButtonsGroupProps = {
  setCollapseIsOpen: React.Dispatch<SetStateAction<boolean>>;
  styleFromElements: string;
  disabled: boolean;
  handleSubmit: () => void;
};
export default function ButtonsGroup({
  setCollapseIsOpen,
  styleFromElements,
  disabled,
  handleSubmit,
}: ButtonsGroupProps) {
  const handleFormSubmit = () => {
    handleSubmit();
  };

  return (
    <div className={style.buttonsWrapper}>
      <button
        type="submit"
        className={`${styleFromElements} ${style.submitButton}`}
        disabled={disabled}
        onClick={() => {
          handleFormSubmit();
        }}
      >
        Search
      </button>
      <TbLayoutBottombarCollapseFilled
        className={style.collapseDownIcon}
        onClick={() => setCollapseIsOpen((prev) => !prev)}
      />
    </div>
  );
}
