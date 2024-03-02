import { useContext } from "react";
import { DragDropContext, OnDragEndResponder } from "@hello-pangea/dnd";
import SubBoard from "./SubBoard";
import { columnNamesArr } from "@/config/system/columnNames";
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
  // const template = { // how OnDragEndResponder props looks like
  //   combine: null,
  //   destination: { droppableId: "1", index: 0 },
  //   draggableId: "65e1e99676a0bb0f9c9a9ea5",
  //   mode: "FLUID",
  //   reason: "DROP",
  //   source: { index: 0, droppableId: "2" },
  //   type: "DEFAULT",
  // };

  const onDragEnd: OnDragEndResponder = (result) => {
    const {
      destination,
      source,
      draggableId, // id of dragging task
    } = result;
    console.log(result);
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
    let currentTask =
      newBoard[columnNamesArr[Number(source.droppableId)].title][source.index];
    newBoard[columnNamesArr[Number(source.droppableId)].title] = newBoard[
      columnNamesArr[Number(source.droppableId)].title
    ].filter((task) => task._id.toString() !== draggableId);
    newBoard[columnNamesArr[Number(destination.droppableId)].title].splice(
      destination.index,
      0,
      currentTask
    );
    setBoard(newBoard);
    setIsBoardShouldUpdate(true);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={style.boardWrapper}>
        {columnNamesArr.map((columnName, index) => {
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
