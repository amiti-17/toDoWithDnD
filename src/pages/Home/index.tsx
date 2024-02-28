"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { defaultBoard } from "@/config/system/types/sampleBoard";
import BoardsSection from "@/components/BoardSection";
import SearchBar from "@/components/SearchBar.tsx";
import { BoardContext } from "./hooks/useBoardContext";
import style from "./style.module.css";
import dbAPI from "@/dbAPI";

export default function Home({ id }: { id: string }) {
  const { board, setBoard } = useContext(BoardContext);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(id, board._id.toString());
    (async () => {
      if (id === undefined) {
        const myBoard = await dbAPI.getInitial();
        console.log(myBoard);
        setBoard(myBoard ?? defaultBoard);
        if (myBoard) {
          router.push("/boards/" + myBoard._id.toString());
        }
        setLoading(false);
      }
      if (id && id !== board._id.toString()) {
        const myBoard = await dbAPI.find(id);
        if (board._id.toString() !== myBoard._id.toString()) {
          console.log("is board set", myBoard);
          setBoard(myBoard);
          router.push("/boards/" + id);
        }
      }
    })();
  }, [id, board]);

  useEffect(() => {
    console.log(board);
  }, [board]);

  return (
    <div className={style.searchBarWrapper}>
      <BoardContext.Provider value={{ board, setBoard }}>
        <SearchBar />
        <BoardsSection />
      </BoardContext.Provider>
    </div>
  );
}
