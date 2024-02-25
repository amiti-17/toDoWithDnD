import { HiArchiveBoxXMark } from "react-icons/hi2";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import style from "./style.module.css";

export default function TaskManagement() {
  return (
    <div className={style.managementWrapper}>
      <FaLongArrowAltLeft />
      <FaLongArrowAltRight />
      <HiArchiveBoxXMark />
    </div>
  )
}