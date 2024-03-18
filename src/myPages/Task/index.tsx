"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import dbAPI from "@/dbAPI";
import { BoardContext } from "@/context/Board";
import TaskModal from "@/components/TaskModal";
import { BoardType, sampleBoard } from "@/config/system/types/sampleBoard";
import boardShouldUpdateHandler from "@/functions/boardHandlers/boardShouldUpdateHandler";

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
    if (isBoardShouldUpdate) {
      (async () =>
        await boardShouldUpdateHandler({
          isBoardShouldUpdate,
          setIsBoardShouldUpdate,
          board,
          setBoard,
          boardId: boardId ?? "",
        }))();
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
