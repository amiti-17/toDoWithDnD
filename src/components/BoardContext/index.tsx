"use client";

import { useState, ReactNode } from "react";
import { BoardContext } from "./hooks/useBoardContext";
import { BoardType, defaultBoard } from "@/config/system/types/sampleBoard";

export default function BoardContextComponent({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const [board, setBoard] = useState<BoardType>(defaultBoard);

  return (
    <BoardContext.Provider value={{ board, setBoard }}>
      {children}
    </BoardContext.Provider>
  );
}
