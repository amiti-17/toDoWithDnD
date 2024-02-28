import React, { useContext } from "react";
import { BoardContext } from "@/pages/Home/hooks/useBoardContext";
import { columnNamesArr } from "@/config/system/columnNames";
import style from "./style.module.css";
import Task from "@/components/Task";
import { TaskType } from "@/config/system/types/sampleBoard";

type SubBoardType = {
  columnId: number;
  subBoard: TaskType[];
};

export default function SubBoard({ columnId, subBoard }: SubBoardType) {
  const { board } = useContext(BoardContext);
  return (
    <div className={style[columnNamesArr[columnId].title]}>
      <div className={style.title}>{columnNamesArr[columnId].display}</div>
      <div className={style.description}>
        {subBoard.map((task, i, arr) => {
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
