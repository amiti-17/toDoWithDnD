import React, { useContext, useEffect } from "react";
import { BoardContext } from "@/pages/Home/hooks/useBoardContext";
import { columnNamesArr } from "@/config/system/columnNames";
import style from "./style.module.css";
import Task from "@/components/Task";

export default function SubBoard({ columnId }: { columnId: number }) {
  const { board } = useContext(BoardContext);

  useEffect(() => {
    console.log("in subBoard", board);
  }, [board]);

  return (
    <div className={style[columnNamesArr[columnId].title]}>
      <div className={style.title}>{columnNamesArr[columnId].display}</div>
      <div className={style.description}>
        {board[columnNamesArr[columnId].title].map((task, i, arr) => {
          if (!task?._id.toString()) return <></>;
          return (
            <React.Fragment key={task?._id.toString()}>
              <Task task={task} key={task?._id.toString()} />
              {arr.length - 1 !== i && <hr className={style.hr} />}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
