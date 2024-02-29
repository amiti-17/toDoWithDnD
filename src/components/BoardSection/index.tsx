import { columnNamesArr } from "@/config/system/columnNames";
import SubBoard from "./SubBoard";
import style from "./style.module.css";
import { BoardType } from "@/config/system/types/sampleBoard";

type BoardsSectionType = {
  board: BoardType;
  isDeleted: boolean;
};

export default function BoardsSection({ board, isDeleted }: BoardsSectionType) {
  if (isDeleted) {
    return <div>This board was deleted</div>;
  }
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
