import Link from "next/link";
import React, { useContext } from "react";
import { useParams } from "next/navigation";
import { MdLibraryAdd } from "react-icons/md";
import { Droppable } from "@hello-pangea/dnd";
import { BoardContext } from "@/pages/Home/hooks/useBoardContext";
import { columnNamesArr } from "@/config/system/columnNames";
import Task from "@/components/Task";
import style from "./style.module.css";

type SubBoardType = {
  columnId: number;
  columnName: string;
};

export default function SubBoard({ columnId, columnName }: SubBoardType) {
  const { board } = useContext(BoardContext);
  const params = useParams();
  return (
    <div className={style[columnNamesArr[columnId].title]}>
      <div className={style.title}>{columnNamesArr[columnId].display}</div>
      <Droppable droppableId={String(columnId)}>
        {(provided) => (
          <div
            className={style.description}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {board[columnNamesArr[columnId].title].map((task, i, arr) => {
              if (!task?._id?.toString()) return <></>;
              return (
                <React.Fragment key={task?._id.toString()}>
                  <Task
                    columnId={columnId}
                    task={task}
                    taskIndex={i}
                    key={task?._id.toString()}
                  />
                  {arr.length - 1 !== i && <hr className={style.hr} />}
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
}
