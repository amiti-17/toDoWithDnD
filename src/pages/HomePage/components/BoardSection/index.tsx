import { ColumnNamesType, columnNames } from "@/config/system/columnNames";
import SubBoard from "./components/SubBoard";
import style from "./style.module.css";

export default function BoardsSection() {

  return (
    <div className={style.boardWrapper}>
      {
        (Object.keys(columnNames) as (keyof ColumnNamesType)[]).map(key => {
          return <SubBoard title={key} key={key} />
        })
      }
    </div>
  )
}