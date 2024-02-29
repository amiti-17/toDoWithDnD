import { useContext } from "react";
import { MdEditSquare } from "react-icons/md";
import { HiArchiveBoxXMark } from "react-icons/hi2";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import style from "./style.module.css";
import { columnNamesArr } from "@/config/system/columnNames";
import { BoardContext } from "@/pages/Home/hooks/useBoardContext";

type TaskManagementType = {
  columnId: number;
  taskId: string;
  taskIndex: number;
};

export default function TaskManagement({
  columnId,
  taskIndex,
  taskId,
}: TaskManagementType) {
  const { board, setBoard } = useContext(BoardContext);
  const amountOfColumns = columnNamesArr.length;
  const columnTitle = columnNamesArr[columnId].title;
  const currentTask = board[columnTitle][taskIndex];

  // is it good approach to write function like this?
  function moveRight() {
    console.log("it's triggered");
    if (amountOfColumns === columnId + 1) {
      return;
    } else {
      const newBoard = {
        ...board,
        [columnTitle]: board[columnTitle].filter(
          (task) => task._id.toString() !== currentTask._id.toString()
        ),
      };
      newBoard[columnNamesArr[columnId + 1].title].push(currentTask);
      setBoard(newBoard);
    }
  }

  function moveLeft() {
    console.log("it's triggered");
    if (!columnId) {
      return;
    } else {
      const newBoard = {
        ...board,
        [columnTitle]: board[columnTitle].filter(
          (task) => task._id.toString() !== currentTask._id.toString()
        ),
      };
      newBoard[columnNamesArr[columnId - 1].title].push(currentTask);
      setBoard(newBoard);
    }
  }

  return (
    <div className={style.managementWrapper}>
      <FaLongArrowAltLeft
        className={columnId === 0 ? style.disabled : ""}
        title="move left"
        onClick={moveLeft}
      />
      <FaLongArrowAltRight
        className={columnId === amountOfColumns - 1 ? style.disabled : ""}
        title="move right"
        onClick={moveRight}
      />
      <MdEditSquare title="edit this task" />
      <HiArchiveBoxXMark title="delete this task" />
    </div>
  );
}
