import { BoardType } from "@/config/system/types/sampleBoard";
import dbAPI from "@/dbAPI";
import React from "react";

type BoardShouldUpdateHandlerProps = {
  isBoardShouldUpdate: boolean;
  setIsBoardShouldUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  board: BoardType;
  setBoard: React.Dispatch<React.SetStateAction<BoardType>>;
  boardId: string;
};

const boardShouldUpdateHandler = async ({
  isBoardShouldUpdate,
  setIsBoardShouldUpdate,
  board,
  setBoard,
  boardId,
}: BoardShouldUpdateHandlerProps) => {
  if (isBoardShouldUpdate && boardId) {
    const newBoard: BoardType = await dbAPI.update(boardId, board);
    setBoard(newBoard);
    setIsBoardShouldUpdate(false);
  }
};

export default boardShouldUpdateHandler;
