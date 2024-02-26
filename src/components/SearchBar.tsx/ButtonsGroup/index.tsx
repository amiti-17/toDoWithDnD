import { SetStateAction } from "react";
import { TbLayoutBottombarCollapseFilled } from "react-icons/tb";
import style from "./style.module.css";

type ButtonsGroupType = {
  setCollapseIsOpen: React.Dispatch<SetStateAction<boolean>>,
  styleFromElements: string,
}

export default function ButtonsGroup({ setCollapseIsOpen, styleFromElements }: ButtonsGroupType) {
  return (
    <div className={style.buttonsWrapper}>
      <button type="submit" className={`${styleFromElements} ${style.submitButton}`}>Search</button>
      <TbLayoutBottombarCollapseFilled className={style.collapseDownIcon} onClick={() => setCollapseIsOpen(prev => !prev)} />
    </div>
  )
}