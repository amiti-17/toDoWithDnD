import { useContext, useState } from "react";
import {
  DragDropContext,
  OnBeforeCaptureResponder,
  OnDragEndResponder,
} from "@hello-pangea/dnd";
import { BoardContext } from "@/context/Board";
import { columnInit } from "@/config/system/columnNames";
import ErrorComponent from "@/components/ErrorComponent";
import SubBoard from "./SubBoard";
import onDragEndHandler from "./onDragEndHandler";
import style from "./style.module.css";

type BoardsSectionProps = {
  isDeleted: boolean;
  error: string;
};

const BoardsSection = ({ isDeleted, error }: BoardsSectionProps) => {
  const { board, setBoard, setIsBoardShouldUpdate } = useContext(BoardContext);
  const [activeDragId, setActiveDragId] = useState<string>("");

  if (isDeleted) {
    return <ErrorComponent>This board was deleted</ErrorComponent>;
  }
  if (error) {
    return <ErrorComponent>{error}</ErrorComponent>;
  }
  if (board?._id === undefined) {
    return <ErrorComponent>{"This board doesn't exists"}</ErrorComponent>;
  }

  const onDragEnd: OnDragEndResponder = (result) => {
    setActiveDragId("");
    const newBoard = onDragEndHandler({ result, board });
    setBoard(newBoard);
    setIsBoardShouldUpdate(true);
  };

  const onBeforeCapture: OnBeforeCaptureResponder = ({ draggableId }) => {
    setActiveDragId(draggableId ?? "");
  };

  return (
    <DragDropContext onDragEnd={onDragEnd} onBeforeCapture={onBeforeCapture}>
      <div className={style.boardWrapper}>
        {columnInit.map((columnName, index) => {
          return (
            <SubBoard
              activeDragId={activeDragId}
              columnId={index}
              key={index}
              columnName={columnName.title}
            />
          );
        })}
      </div>
    </DragDropContext>
  ); // TODO: add default view, when no boards exists...
};

export default BoardsSection;
