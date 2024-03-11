"use client";

import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import TaskModal from "@/components/TaskModal";
import { BoardType, sampleBoard } from "@/config/system/types/sampleBoard";
import { BoardContext } from "../Home/hooks/useBoardContext";
import style from "./style.module.css";
import dbAPI from "@/dbAPI";

type TaskPageProps = {
  boardId: string;
};

const TaskPage = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const boardId = params.id as string;
  const [actionType, taskId] = params?.taskParams as string[];
  const columnId = searchParams?.get("columnId");
  const oldTitle = searchParams?.get("title");
  const oldDescription = searchParams?.get("description");
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
      <TaskModal
        // isModalActive={false}
        // setIsModalActive={() => {}}
        actionType={actionType}
        taskId={taskId}
        columnId={columnId}
        oldTitle={oldTitle}
        oldDescription={oldDescription}
      />
    </BoardContext.Provider>
  );
};

export default TaskPage;
