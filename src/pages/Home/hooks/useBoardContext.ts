import React, { SetStateAction } from "react";
import { BoardType, sampleBoard } from "@/config/system/types/sampleBoard";

export type BoardContextType = {
  board: BoardType,
  setBoard: React.Dispatch<SetStateAction<BoardType>>,
}

export const defaultBoardContext: BoardContextType = {
  board: sampleBoard,
  setBoard: () => {}
}

export const BoardContext = React.createContext<BoardContextType>(defaultBoardContext);
