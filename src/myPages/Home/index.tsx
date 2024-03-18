"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { BoardContext } from "@/context/Board";
import TaskModal from "@/components/TaskModal";
import SearchBar from "@/components/SearchBar.tsx";
import BoardsSection from "@/components/BoardSection";
import LoadingCircle from "@/components/LoadingCircle";
import { BoardType, sampleBoard } from "@/config/system/types/sampleBoard";
import boardInitialHandler from "@/functions/boardHandlers/boardInitialHandler";
import boardShouldUpdateHandler from "@/functions/boardHandlers/boardShouldUpdateHandler";
import getTaskPropsFromSearchParams from "./getTaskPropsFromSearchParams";
import style from "./style.module.css";

const Home = () => {
  const [board, setBoard] = useState<BoardType>(sampleBoard);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [isBoardDeleted, setIsBoardDeleted] = useState<boolean>(false);
  const [isBoardShouldUpdate, setIsBoardShouldUpdate] =
    useState<boolean>(false);
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const boardId = params?.id as string | undefined;
  const { taskActionType, taskId, columnId, oldTaskTitle, oldTaskDescription } =
    getTaskPropsFromSearchParams(searchParams);

  useEffect(() => {
    setLoading(true);
    (async () =>
      await boardShouldUpdateHandler({
        isBoardShouldUpdate,
        setIsBoardShouldUpdate,
        board,
        setBoard,
        boardId: boardId ?? "",
      }))();
    setLoading(false);
  }, [isBoardShouldUpdate]);

  useEffect(() => {
    setLoading(true);
    (async () => {
      await boardInitialHandler({
        board,
        router,
        boardId: boardId ?? "",
        setError,
        setBoard,
      });
    })();
    setLoading(false);
  }, []);

  return (
    <BoardContext.Provider
      value={{ board, setBoard, isBoardShouldUpdate, setIsBoardShouldUpdate }}
    >
      <div className={style.searchBarWrapper}>
        <SearchBar setIsBoardDeleted={setIsBoardDeleted} />
        {loading && <LoadingCircle />}
        {taskActionType && (
          <TaskModal
            actionType={taskActionType}
            taskId={taskId}
            columnId={columnId}
            oldTitle={oldTaskTitle}
            oldDescription={oldTaskDescription}
          />
        )}
        {!loading && <BoardsSection isDeleted={isBoardDeleted} error={error} />}
      </div>
    </BoardContext.Provider>
  );
};

export default Home;
