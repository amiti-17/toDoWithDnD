import { useContext } from "react";
import { DragDropContext, OnDragEndResponder } from "@hello-pangea/dnd";
import SubBoard from "./SubBoard";
import { columnInit } from "@/config/system/columnNames";
import { BoardContext } from "@/myPages/Home/hooks/useBoardContext";
import style from "./style.module.css";

type BoardsSectionType = {
  isDeleted: boolean;
  error: string;
};

export default function BoardsSection({ isDeleted, error }: BoardsSectionType) {
  const { board, setBoard, setIsBoardShouldUpdate } = useContext(BoardContext);
  if (isDeleted) {
    return <div>This board was deleted</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  if (board?._id === undefined) {
    return <div>{"This board doesn't exists"}</div>;
  }

  const onDragEnd: OnDragEndResponder = (result) => {
    const {
      destination,
      source,
      draggableId, // id of dragging task
    } = result;

    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newBoard = {
      ...board,
    };
    const sourceColumnIndex = columnInit[Number(source.droppableId)].title;
    const destinationColumnIndex =
      columnInit[Number(destination.droppableId)].title;
    let currentTask = newBoard[sourceColumnIndex][source.index];

    newBoard[sourceColumnIndex] = newBoard[sourceColumnIndex].filter(
      (task) => task._id.toString() !== draggableId
    );
    newBoard[destinationColumnIndex].splice(destination.index, 0, currentTask);
    setBoard(newBoard);
    setIsBoardShouldUpdate(true);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={style.boardWrapper}>
        {columnInit.map((columnName, index) => {
          return (
            <SubBoard
              columnId={index}
              key={index}
              columnName={columnName.title}
            />
          );
        })}
      </div>
    </DragDropContext>
  ); // TODO: add default view, when no boards exists...
}
