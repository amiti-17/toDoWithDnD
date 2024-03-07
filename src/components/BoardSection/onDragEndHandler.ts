import { columnInit } from "@/config/system/columnNames";
import { BoardType } from "@/config/system/types/sampleBoard";
import { DropResult } from "@hello-pangea/dnd";

type OnDragEndProps = {
  result: DropResult;
  board: BoardType;
};

const onDragEndHandler = ({ result, board }: OnDragEndProps): BoardType => {
  const {
    destination,
    source,
    draggableId, // id of dragging task
  } = result;

  if (!destination) {
    return board;
  }
  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return board;
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
  return newBoard;
};
export default onDragEndHandler;
