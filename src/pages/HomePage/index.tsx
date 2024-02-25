'use client'

import { use, useEffect, useState } from "react";
import { BoardType, sampleBoard } from "@/config/system/types/sampleBoard";
import BoardsSection from "./components/BoardSection";
import SearchBar from "./components/SearchBar.tsx";
import { BoardContext } from "./hooks/useBoardContext";
import style from "./style.module.css";

async function getInitialBoard() { // TODO: move somewhere else...
  try {
    const data  = await fetch('/api/boards', {
      method: "GET",
    })
    return data.json();
  } catch (error) {
    console.log("We couldn't fetch initial board in src/pages/HomePage", error);
  }
}

export default function Home() {

  const [ board, setBoard ] = useState<BoardType>(sampleBoard);

  useEffect(() => {
    (async () => {
      const myBoards = await getInitialBoard();
      myBoards.boards[0].toDo.push(myBoards.boards[1].toDo[0])
      setBoard(myBoards.boards[0]);
    })()
  }, []);
  
  return (
    <div className={style.searchBarWrapper}>
      <BoardContext.Provider value={{ board, setBoard }}>
        <SearchBar />
        <BoardsSection />
      </BoardContext.Provider>
    </div>
  )
}