import { SetStateAction } from "react";
import { TbLayoutBottombarCollapseFilled } from "react-icons/tb";
import style from "./style.module.css";

type ButtonsGroupType = {
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
}: ButtonsGroupType) {
  // console.log(disabled);

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
          // console.log("handleSubmit");
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
