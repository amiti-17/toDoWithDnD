import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import {
  BoardErrorType,
  BoardType,
  defaultBoard,
} from "@/config/system/types/sampleBoard";
import dbAPI from "@/dbAPI";

type BoardInitialHandlerProps = {
  boardId: string;
  router: AppRouterInstance;
  board: BoardType;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setBoard: React.Dispatch<React.SetStateAction<BoardType>>;
};

const boardInitialHandler = async ({
  board,
  boardId,
  router,
  setError,
  setBoard,
}: BoardInitialHandlerProps) => {
  if (boardId === "") {
    const myProbablyBoard = await dbAPI.getInitial();
    if ((myProbablyBoard as unknown as BoardErrorType)?.error) {
      setError((myProbablyBoard as unknown as BoardErrorType).error);
      return;
    }
    const myBoard = myProbablyBoard as BoardType;
    setBoard(myBoard ?? defaultBoard);
    if (myBoard) {
      router.push("/boards/" + myBoard._id.toString());
    }
  }
  if (boardId && boardId !== board._id.toString()) {
    const myBoard = await dbAPI.find(boardId);
    if (board._id.toString() !== myBoard?._id.toString()) {
      setBoard(myBoard);
      router.push("/boards/" + boardId);
    }
  }
};

export default boardInitialHandler;
