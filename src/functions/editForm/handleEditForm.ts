import { FormikErrors } from "formik";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { BoardType } from "@/config/system/types/sampleBoard";
import { EditFormType } from "@/config/system/types/editFormType";
import updateOrCreateTaskFunction from "@/components/TaskModal/updateOrCreateTaskFunction";

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
