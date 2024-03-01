import React, { useContext } from "react";
import { MdLibraryAdd } from "react-icons/md";
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
  return (
    <div className={style[columnNamesArr[columnId].title]}>
      <div className={style.title}>{columnNamesArr[columnId].display}</div>
      <div className={style.description}>
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
      </div>
      {!columnId && (
        <div className={style.taskCommand}>
          <MdLibraryAdd title="add new task" />
        </div>
      )}
    </div>
  );
}
