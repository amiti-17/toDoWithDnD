"use client";

import { useEffect, useState } from "react";
import { BoardType, sampleBoard } from "@/config/system/types/sampleBoard";
import BoardsSection from "@/components/BoardSection";
import SearchBar from "@/components/SearchBar.tsx";
import { BoardContext } from "./hooks/useBoardContext";
import style from "./style.module.css";
import getInitialBoard from "@/mongoDB/queries/board/getInitial";

export default function Home() {
  const [board, setBoard] = useState<BoardType>(sampleBoard);

  useEffect(() => {
    (async () => {
      const myBoards = await getInitialBoard();
      myBoards.toDo.push(myBoards.toDo[0]);
      setBoard(myBoards);
    })();
  }, []);

  return (
    <div className={style.searchBarWrapper}>
      <BoardContext.Provider value={{ board, setBoard }}>
        <SearchBar />
        <BoardsSection />
      </BoardContext.Provider>
    </div>
  );
}
