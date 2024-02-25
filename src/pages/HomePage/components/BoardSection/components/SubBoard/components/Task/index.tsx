
import style from "./style.module.css";

import { TaskType } from "@/config/system/types/sampleBoard";
import TaskTitle from "./components/TaskTitle";
import TaskDescription from "./components/TaskDescription";
import TaskManagement from "./components/TaskManagement";


export default function Task({ task }: { task: TaskType}) {

  return (
    <div className={style.taskWrapper}>
      <TaskTitle title={task.title} />
      <TaskDescription description={task.description} />
      <TaskManagement /> 
    </div>
    
  ) // TODO: add some functions to task management...
}