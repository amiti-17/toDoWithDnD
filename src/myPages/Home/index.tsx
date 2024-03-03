"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BoardErrorType,
  BoardType,
  defaultBoard,
  sampleBoard,
} from "@/config/system/types/sampleBoard";
import BoardsSection from "@/components/BoardSection";
import SearchBar from "@/components/SearchBar.tsx";
import { BoardContext } from "./hooks/useBoardContext";
import style from "./style.module.css";
import dbAPI from "@/dbAPI";
import LoadingCircle from "@/components/LoadingCircle";

export default function Home({ id }: { id: string | undefined }) {
  const [board, setBoard] = useState<BoardType>(sampleBoard);
  const [error, setError] = useState<string>("");
  const [isBoardShouldUpdate, setIsBoardShouldUpdate] =
    useState<boolean>(false);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    console.log("from home component", board);
    if (isBoardShouldUpdate) {
      (async () => {
        if (id) {
          const newBoard: BoardType = await dbAPI.update(id, board);
          setBoard(newBoard);
        }
      })();
      setIsBoardShouldUpdate(false);
    }
    setLoading(false);
  }, [isBoardShouldUpdate]);

  useEffect(() => {
    setLoading(true);
    (async () => {
      if (id === undefined) {
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
        setLoading(false);
      }
      if (id && id !== board._id.toString()) {
        const myBoard = await dbAPI.find(id);
        if (board._id.toString() !== myBoard?._id.toString()) {
          setBoard(myBoard);
          router.push("/boards/" + id);
        }
      }
    })();
    setLoading(false);
  }, [id]);

  return (
    <BoardContext.Provider
      value={{ board, setBoard, isBoardShouldUpdate, setIsBoardShouldUpdate }}
    >
      <div className={style.searchBarWrapper}>
        <SearchBar setIsDeleted={setIsDeleted} />
        {loading && <LoadingCircle />}
        {!loading && <BoardsSection isDeleted={isDeleted} error={error} />}
      </div>
    </BoardContext.Provider>
  );
}