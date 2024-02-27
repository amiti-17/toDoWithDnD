import { TaskType } from "@/config/system/types/sampleBoard";
import TaskTitle from "./TaskTitle";
import TaskDescription from "./TaskDescription";
import TaskManagement from "./TaskManagement";
import style from "./style.module.css";

export default function Task({ task }: { task: TaskType}) {

  return (
    <div className={style.taskWrapper}>
      <TaskTitle title={task.title} />
      <TaskDescription description={task.description} />
      <TaskManagement /> 
    </div>
    
  ) // TODO: add some functions to task management...
}
