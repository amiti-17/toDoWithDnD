import Link from "next/link";
import { useContext } from "react";
import { MdEditSquare } from "react-icons/md";
import { HiArchiveBoxXMark } from "react-icons/hi2";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { BoardContext } from "@/context/Board";
import { columnInit } from "@/config/system/columnNames";
import { BoardType } from "@/config/system/types/sampleBoard";
import style from "./style.module.css";

type TaskManagementProps = {
  columnId: number;
  taskId: string;
  taskIndex: number;
  // taskModalProps: TaskModalProps;
  // setTaskModalProps: React.Dispatch<React.SetStateAction<TaskModalProps>>;
};

const TaskManagement = ({
  columnId, // it's just index of the column by default 0-2
  taskIndex, // it's index in array of task
  taskId, // index of current task
}: TaskManagementProps) => {
  const { board, setBoard, setIsBoardShouldUpdate } = useContext(BoardContext);
  const boardId = board._id.toString();
  const amountOfColumns = columnInit.length;
  const columnTitle = columnInit[columnId].title;
  const currentTask = board[columnTitle][taskIndex];

  function deleteTask(): BoardType {
    const newBoard = {
      ...board,
      [columnTitle]: board[columnTitle].filter(
        (task) => task._id.toString() !== taskId
      ),
    };
    return newBoard;
  }

  function deleteWithChangeState() {
    const newBoard = deleteTask();
    setBoard(newBoard);
    setIsBoardShouldUpdate(true);
  }

  function moveRight() {
    if (amountOfColumns === columnId + 1) {
      return;
    } else {
      const newBoard = deleteTask();
      newBoard[columnInit[columnId + 1].title].push(currentTask);
      setBoard(newBoard);
      setIsBoardShouldUpdate(true);
    }
  }

  function moveLeft() {
    if (!columnId) {
      return;
    } else {
      const newBoard = deleteTask();
      newBoard[columnInit[columnId - 1].title].push(currentTask);
      setBoard(newBoard);
      setIsBoardShouldUpdate(true);
    }
  }

  return (
    <div className={style.managementWrapper}>
      <FaLongArrowAltLeft
        className={`${style.svg} ${columnId === 0 ? style.disabled : ""}`}
        title="move left"
        onClick={moveLeft}
      />
      <FaLongArrowAltRight
        className={`${style.svg} ${
          columnId === amountOfColumns - 1 ? style.disabled : ""
        }`}
        title="move right"
        onClick={moveRight}
      />
      <Link
        // as={`/boards/${boardId}/task/edit/${taskId}?columnId=${columnId}&title=${currentTask.title}&description=${currentTask.description}`}
        href={`/boards/${boardId}?actionType=edit&taskId=${taskId}&columnId=${columnId}&title=${currentTask.title}&description=${currentTask.description}`}
        scroll={false}
        shallow={true}
        className={style.link}
        prefetch={true}
      >
        <MdEditSquare title="edit this task" className={style.svg} />
      </Link>
      <HiArchiveBoxXMark
        title="delete this task"
        className={style.svg}
        onClick={deleteWithChangeState}
      />
    </div>
  );
};

export default TaskManagement;
