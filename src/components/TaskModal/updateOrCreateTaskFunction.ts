import { columnInit } from "@/config/system/columnNames";
import { EditFormType } from "@/config/system/types/editFormType";
import { BoardType, TaskType } from "@/config/system/types/sampleBoard";

type UpdateOrCreateTaskFunctionProps = {
  values: EditFormType;
  board: BoardType;
  columnId: string | null;
  type: string;
  taskId: string;
};

const updateOrCreateTaskFunction = ({
  values,
  board,
  columnId,
  type,
  taskId,
}: UpdateOrCreateTaskFunctionProps): BoardType => {
  const newBoard: BoardType = {
    ...board,
  };
  const columnIdNum = Number(columnId);
  if (type === "edit" && columnId && newBoard) {
    newBoard[columnInit[columnIdNum].title] = newBoard[
      columnInit[columnIdNum].title
    ].map((el) => {
      if (el._id.toString() === taskId) {
        return values as TaskType;
      }
      return el;
    });
  } else {
    board[columnInit[0].title].unshift(values as TaskType);
  }
  return newBoard;
};

export default updateOrCreateTaskFunction;
