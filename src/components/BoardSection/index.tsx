import { columnNamesArr } from "@/config/system/columnNames";
import SubBoard from "./SubBoard";
import style from "./style.module.css";
import { BoardType } from "@/config/system/types/sampleBoard";

export default function BoardsSection({ board }: { board: BoardType }) {
  return (
    <div className={style.boardWrapper}>
      {columnNamesArr.map((columnName, index) => {
        return (
          <SubBoard
            columnId={index}
            key={index}
            subBoard={board[columnName.title]}
          />
        );
      })}
    </div>
  ); // TODO: add default view, when no boards exists...
}
