"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TaskModal from "@/components/TaskModal";
import { BoardType, sampleBoard } from "@/config/system/types/sampleBoard";
import { BoardContext } from "../Home/hooks/useBoardContext";
import style from "./style.module.css";
import dbAPI from "@/dbAPI";

type TaskPageType = {
  boardId: string;
};
export default function TaskPage({ boardId }: TaskPageType) {
  const router = useRouter();
  const [board, setBoard] = useState<BoardType>(sampleBoard);
  const [isBoardShouldUpdate, setIsBoardShouldUpdate] = useState(false);
  const backLink = "/boards/" + boardId;

  useEffect(() => {
    console.log("from Task component", board);
    if (isBoardShouldUpdate) {
      (async () => {
        const newBoard = await dbAPI.update(boardId, board);
        setBoard(newBoard);
      })();
      setIsBoardShouldUpdate(false);
      router.push(backLink);
    }
  }, [isBoardShouldUpdate]);

  useEffect(() => {
    (async () => {
      const currentBoard = await dbAPI.find(boardId);
      setBoard(currentBoard);
    })();
  }, []);

  return (
    <BoardContext.Provider
      value={{ board, setBoard, isBoardShouldUpdate, setIsBoardShouldUpdate }}
    >
      <Link href={backLink} className={style.backButton}>
        Back
      </Link>
      <TaskModal setIsModalActive={undefined}></TaskModal>
    </BoardContext.Provider>
  );
}
