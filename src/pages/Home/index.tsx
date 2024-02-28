"use client";

import { useContext, useEffect, useState } from "react";
import {
  BoardType,
  defaultBoard,
  sampleBoard,
} from "@/config/system/types/sampleBoard";
import BoardsSection from "@/components/BoardSection";
import SearchBar from "@/components/SearchBar.tsx";
import { BoardContext } from "./hooks/useBoardContext";
import style from "./style.module.css";
import getInitialBoard from "@/mongoDB/queries/board/getInitial";

export default function Home({ id }: { id: string }) {
  const { board, setBoard } = useContext(BoardContext);

  if (id === undefined) {
    setBoard(defaultBoard);
  }

  useEffect(() => {
    (async () => {
      const myBoards = await getInitialBoard();
      myBoards.toDo.push(myBoards.toDo[0]);
      setBoard(myBoards);
    })();
  }, [id]);

  return (
    <div className={style.searchBarWrapper}>
      <BoardContext.Provider value={{ board, setBoard }}>
        <SearchBar />
        <BoardsSection />
      </BoardContext.Provider>
    </div>
  );
}
