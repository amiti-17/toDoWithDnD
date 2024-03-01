import Link from "next/link";
import { useContext, useState } from "react";
import { MdEditSquare } from "react-icons/md";
import { HiArchiveBoxXMark } from "react-icons/hi2";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import style from "./style.module.css";
import { BoardContext } from "@/pages/Home/hooks/useBoardContext";
import { columnNamesArr } from "@/config/system/columnNames";
import { BoardType } from "@/config/system/types/sampleBoard";
import CreateTaskModal from "@/components/TaskModal";
import {
  useRouter,
  useParams,
  usePathname,
  useSearchParams,
  useSelectedLayoutSegment,
  useSelectedLayoutSegments,
} from "next/navigation";

type TaskManagementType = {
  columnId: number;
  taskId: string;
  taskIndex: number;
};

export default function TaskManagement({
  columnId, // it's just index of the column by default 0-2
  taskIndex, // it's index in array of task
  taskId, // index of current task
}: TaskManagementType) {
  const { board, setBoard, setIsBoardShouldUpdate } = useContext(BoardContext);
  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  const amountOfColumns = columnNamesArr.length;
  const columnTitle = columnNamesArr[columnId].title;
  const currentTask = board[columnTitle][taskIndex];
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectedLayoutSegment = useSelectedLayoutSegment();
  const selectedLayoutSegments = useSelectedLayoutSegments();
  console.log({
    pathname,
    params,
    searchParams,
    selectedLayoutSegment,
    selectedLayoutSegments,
  });

  // is it good approach to write function like this?

  function deleteTask(): BoardType {
    const newBoard = {
      ...board,
      [columnTitle]: board[columnTitle].filter(
        (task) => task._id.toString() !== currentTask._id.toString()
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
      newBoard[columnNamesArr[columnId + 1].title].push(currentTask);
      setBoard(newBoard);
      setIsBoardShouldUpdate(true);
    }
  }

  function moveLeft() {
    if (!columnId) {
      return;
    } else {
      const newBoard = deleteTask();
      newBoard[columnNamesArr[columnId - 1].title].push(currentTask);
      setBoard(newBoard);
      setIsBoardShouldUpdate(true);
    }
  }

  return (
    <div className={style.managementWrapper}>
      {isModalActive && <CreateTaskModal setIsModalActive={setIsModalActive} />}
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
        // href={""}
        href={`/boards/${params?.id}/task/edit/${taskId}?columnId=${columnId}&title=${currentTask.title}&description=${currentTask.description}`}
        scroll={false}
        shallow={true}
        className={style.link}
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
}
