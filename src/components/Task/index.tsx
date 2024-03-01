import { Draggable } from "@hello-pangea/dnd";
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
    <Draggable draggableId={task._id.toString()} index={taskIndex}>
      {(provided) => {
        return (
          <div
            className={style.taskWrapper}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <TaskTitle title={task.title} />
            <TaskDescription description={task.description} />
            <TaskManagement
              columnId={columnId}
              taskId={task._id.toString()}
              taskIndex={taskIndex}
            />
          </div>
        );
      }}
    </Draggable>
  ); // TODO: add some functions to task management...
}
