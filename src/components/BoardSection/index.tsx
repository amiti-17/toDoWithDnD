import { ColumnNamesType, columnNames } from "@/config/system/columnNames";
import SubBoard from "./SubBoard";
import style from "./style.module.css";

export default function BoardsSection() {

  const boardColumns = Object.keys(columnNames) as (keyof ColumnNamesType)[];

  return (
    <div className={style.boardWrapper}>
      {
        boardColumns.map(key => {
          return <SubBoard title={key} key={key} />
        })
      }
    </div>
  ) // TODO: add default view, when no boards exists...
}