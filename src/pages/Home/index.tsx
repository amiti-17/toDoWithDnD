"use client";

import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BoardType,
  defaultBoard,
  sampleBoard,
} from "@/config/system/types/sampleBoard";
import BoardsSection from "@/components/BoardSection";
import SearchBar from "@/components/SearchBar.tsx";
import { BoardContext } from "./hooks/useBoardContext";
import style from "./style.module.css";
import dbAPI from "@/dbAPI";

export default function Home({ id }: { id: string | undefined }) {
  let [board, setBoard] = useState<BoardType>(sampleBoard);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  useEffect(() => {
    console.log("from home component", board);
  }, [board]);

  useEffect(() => {
    (async () => {
      if (id === undefined) {
        const myBoard = await dbAPI.getInitial();
        setBoard(myBoard ?? defaultBoard);
        if (myBoard) {
          router.push("/boards/" + myBoard._id.toString());
        }
        setLoading(false);
      }
      if (id && id !== board._id.toString()) {
        const myBoard = await dbAPI.find(id);
        if (board._id.toString() !== myBoard._id.toString()) {
          setBoard(myBoard);
          router.push("/boards/" + id);
        }
      }
    })();
  }, [id, board]);

  return (
    <BoardContext.Provider value={{ board, setBoard }}>
      <div className={style.searchBarWrapper}>
        <SearchBar setIsDeleted={setIsDeleted} />
        <BoardsSection board={board} isDeleted={isDeleted} />
      </div>
    </BoardContext.Provider>
  );
}
