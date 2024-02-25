
import { useContext, useEffect } from "react";
import { BoardContext } from "@/pages/HomePage/hooks/useBoardContext";
import { ColumnNamesType, columnNames } from "@/config/system/columnNames";
import style from "./style.module.css";
import Task from "./components/Task";


export default function SubBoard({title}: { title: keyof ColumnNamesType}) {

  const { board } = useContext(BoardContext);

  useEffect(() => {
    console.log(board);
  }, [board]);

  return (
    <div className={style[title]}>
      <div className={style.title}>{columnNames[title]}</div>
      <div className={style.description}>
        {
          board[title].map((task, i, arr) => {
            return (
              <>
                <Task task={task} key={task._id.toString()} />
                { arr.length - 1 !== i && (<hr className={style.hr} />) }
              </>
            )
          })
        }
      </div>
    </div>
  )
}