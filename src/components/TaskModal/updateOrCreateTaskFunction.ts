import { columnInit } from "@/config/system/columnNames";
import { EditFormType } from "@/config/system/types/editFormType";
import { BoardType, TaskType } from "@/config/system/types/sampleBoard";

type UpdateOrCreateTaskFunctionProps = {
  values: EditFormType;
  board: BoardType;
  columnId: string | null;
  actionType: string;
  taskId: string;
};

const updateOrCreateTaskFunction = ({
  values,
  board,
  columnId,
  actionType,
  taskId,
}: UpdateOrCreateTaskFunctionProps): BoardType => {
  const newBoard: BoardType = {
    ...board,
  };
  if (actionType === "edit" && newBoard) {
    if (!columnId) {
      throw new Error("Error in updateOrCreateTask, columnId is required");
    }
    const columnIdNum = Number(columnId);
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
