import Link from "next/link";
import React, { useContext } from "react";
import { useParams } from "next/navigation";
import { MdLibraryAdd } from "react-icons/md";
import { Droppable } from "@hello-pangea/dnd";
import { BoardContext } from "@/myPages/Home/hooks/useBoardContext";
import { columnInit } from "@/config/system/columnNames";
import { Title as ColumnIndex } from "@/config/system/columnNames";
import Task from "@/components/Task";
import style from "./style.module.css";

type SubBoardProps = {
  columnId: number;
  columnName: ColumnIndex;
  activeDragId: string;
};

const SubBoard = ({ columnId, columnName, activeDragId }: SubBoardProps) => {
  const { board } = useContext(BoardContext);
  const params = useParams();
  return (
    <div className={style[columnName]}>
      <div className={style.title}>{columnInit[columnId].display}</div>
      <Droppable droppableId={String(columnId)}>
        {(provided) => (
          <div
            className={style.description}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
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
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {!columnId && (
        <div className={style.taskCommand}>
          <Link
            href={`/boards/${params?.id}/task/create`}
            className={style.link}
          >
            <MdLibraryAdd title="add new task" className={style.svg} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default SubBoard;
