import { columnNamesArr } from "@/config/system/columnNames";
import SubBoard from "./SubBoard";
import style from "./style.module.css";

export default function BoardsSection() {
  return (
    <div className={style.boardWrapper}>
      {columnNamesArr.map((columnName, index) => {
        return <SubBoard columnId={index} key={index} />;
      })}
    </div>
  ); // TODO: add default view, when no boards exists...
}
