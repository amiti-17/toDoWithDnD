import { useContext, useState } from "react";
import {
  DragDropContext,
  OnBeforeCaptureResponder,
  OnDragEndResponder,
} from "@hello-pangea/dnd";
import SubBoard from "./SubBoard";
import { columnInit } from "@/config/system/columnNames";
import { BoardContext } from "@/myPages/Home/hooks/useBoardContext";
import style from "./style.module.css";
import onDragEndHandler from "./onDragEndHandler";
import { TaskModalProps } from "@/config/system/types/taskModalComponentProps";
import TaskModal from "../TaskModal";
import ErrorComponent from "../ErrorComponent";

type BoardsSectionProps = {
  // taskModalProps: TaskModalProps;
  // setTaskModalProps: React.Dispatch<React.SetStateAction<TaskModalProps>>;
  isDeleted: boolean;
  error: string;
};

const BoardsSection = ({
  isDeleted,
  error,
}: // taskModalProps,
// setTaskModalProps,
BoardsSectionProps) => {
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
              // taskModalProps={taskModalProps}
              // setTaskModalProps={setTaskModalProps}
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
