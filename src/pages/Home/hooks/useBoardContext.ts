import React, { SetStateAction } from "react";
import { BoardType, sampleBoard } from "@/config/system/types/sampleBoard";

export type BoardContextType = {
  board: BoardType;
  setBoard: React.Dispatch<SetStateAction<BoardType>>;
  isBoardShouldUpdate: boolean;
  setIsBoardShouldUpdate: React.Dispatch<SetStateAction<boolean>>;
};

export const defaultBoardContext: BoardContextType = {
  board: sampleBoard,
  setBoard: () => {},
  isBoardShouldUpdate: false,
  setIsBoardShouldUpdate: () => {},
};

export const BoardContext =
  React.createContext<BoardContextType>(defaultBoardContext);
