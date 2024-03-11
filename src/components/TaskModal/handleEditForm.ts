import { FormikErrors } from "formik";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import updateOrCreateTaskFunction from "./updateOrCreateTaskFunction";
import { EditFormType } from "@/config/system/types/editFormType";
import { BoardType } from "@/config/system/types/sampleBoard";

type HandleEditFormProps = {
  values: EditFormType;
  errors: FormikErrors<EditFormType>;
  board: BoardType;
  columnId: string | null;
  actionType: string;
  taskId: string | null;
  router: AppRouterInstance;
  backLink: string;
  setBoard: React.Dispatch<React.SetStateAction<BoardType>>;
  // setIsModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  setIsBoardShouldUpdate: React.Dispatch<React.SetStateAction<boolean>>;
};

const handleEditForm = async ({
  values,
  errors,
  board,
  columnId,
  actionType,
  taskId,
  router,
  backLink,
  setBoard,
  // setIsModalActive,
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
    setIsBoardShouldUpdate(true);
    router.push(backLink);
  }
};

export default handleEditForm;
