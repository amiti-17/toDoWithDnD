import { TaskType } from "@/config/system/types/sampleBoard";
import TaskTitle from "./TaskTitle";
import TaskDescription from "./TaskDescription";
import TaskManagement from "./TaskManagement";
import style from "./style.module.css";

type TaskComponentType = {
  task: TaskType;
  columnId: number;
  taskIndex: number;
};
export default function Task({ task, columnId, taskIndex }: TaskComponentType) {
  return (
    <div className={style.taskWrapper}>
      <TaskTitle title={task.title} />
      <TaskDescription description={task.description} />
      <TaskManagement
        columnId={columnId}
        taskId={task._id.toString()}
        taskIndex={taskIndex}
      />
    </div>
  ); // TODO: add some functions to task management...
}
