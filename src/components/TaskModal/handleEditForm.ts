import { EditFormType } from "@/config/system/types/editFormType";
import { FormikErrors } from "formik";
import updateOrCreateTaskFunction from "./updateOrCreateTaskFunction";
import { BoardType } from "@/config/system/types/sampleBoard";

type HandleEditFormProps = {
  values: EditFormType;
  errors: FormikErrors<EditFormType>;
  board: BoardType;
  columnId: string | null;
  actionType: string;
  taskId: string | null;
  setBoard: React.Dispatch<React.SetStateAction<BoardType>>;
  setIsModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  setIsBoardShouldUpdate: React.Dispatch<React.SetStateAction<boolean>>;
};

const handleEditForm = async ({
  values,
  errors,
  board,
  columnId,
  actionType,
  taskId,
  setBoard,
  setIsModalActive,
  setIsBoardShouldUpdate,
}: HandleEditFormProps) => {
  if (!errors.title && !errors.description) {
    const myNewBoard = updateOrCreateTaskFunction({
      values,
      board,
      columnId: columnId ?? "",
      actionType: actionType ?? "",
      taskId: taskId ?? "",
    });

    setBoard(myNewBoard);
    if (setIsModalActive) {
      setIsModalActive(false);
    }
    setIsBoardShouldUpdate(true);
  }
};

export default handleEditForm;
