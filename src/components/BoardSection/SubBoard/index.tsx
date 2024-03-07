import React, { useContext } from "react";
import { columnInit } from "@/config/system/columnNames";
import { Title as ColumnIndex } from "@/config/system/columnNames";
import style from "./style.module.css";
import DroppableArea from "./DroppableArea";
import TaskCommands from "./TaskCommands";
import { BoardContext } from "@/myPages/Home/hooks/useBoardContext";
import Task from "@/components/Task";

type SubBoardProps = {
  columnId: number;
  columnName: ColumnIndex;
  activeDragId: string;
};

const SubBoard = ({ columnId, columnName, activeDragId }: SubBoardProps) => {
  const { board } = useContext(BoardContext);

  return (
    <div className={style[columnName]}>
      <div className={style.title}>{columnInit[columnId].display}</div>
      <DroppableArea columnId={columnId}>
        {board[columnName].map((task, taskIndex, arr) => {
          if (!task?._id?.toString()) return <></>;
          const currentTaskId = task?._id.toString();
          return (
            <React.Fragment key={currentTaskId}>
              <Task
                columnId={columnId}
                task={task}
                taskIndex={taskIndex}
                key={currentTaskId}
                activeDragId={activeDragId}
              />
              {arr.length - 1 !== taskIndex && <hr className={style.hr} />}
            </React.Fragment>
          );
        })}
      </DroppableArea>
      {!columnId && <TaskCommands />}
    </div>
  );
};

export default SubBoard;
