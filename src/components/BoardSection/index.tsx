import { columnNamesArr } from "@/config/system/columnNames";
import SubBoard from "./SubBoard";
import style from "./style.module.css";
import { BoardType } from "@/config/system/types/sampleBoard";
import { BoardContext } from "@/pages/Home/hooks/useBoardContext";
import { useContext } from "react";

type BoardsSectionType = {
  board: BoardType;
  isDeleted: boolean;
};

export default function BoardsSection({ isDeleted }: BoardsSectionType) {
  const { board } = useContext(BoardContext);
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
            columnName={columnName.title}
          />
        );
      })}
    </div>
  ); // TODO: add default view, when no boards exists...
}
