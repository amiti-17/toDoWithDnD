"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
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
import TaskModal from "@/components/TaskModal";
import getTaskPropsFromSearchParams from "./getTaskPropsFromSearchParams";

const Home = () => {
  const [board, setBoard] = useState<BoardType>(sampleBoard);
  const [error, setError] = useState<string>("");
  const [isBoardShouldUpdate, setIsBoardShouldUpdate] =
    useState<boolean>(false);
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params?.id as string | undefined;
  const { taskActionType, taskId, columnId, oldTaskTitle, oldTaskDescription } =
    getTaskPropsFromSearchParams(searchParams);
  const [loading, setLoading] = useState(true);
  const [isBoardDeleted, setIsBoardDeleted] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
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
    console.log(params);
  }, [id]);

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
