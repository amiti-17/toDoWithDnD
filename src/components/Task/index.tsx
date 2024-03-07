import { Draggable } from "@hello-pangea/dnd";
import TaskTitle from "./TaskTitle";
import TaskDescription from "./TaskDescription";
import TaskManagement from "./TaskManagement";
import { TaskType } from "@/config/system/types/sampleBoard";
import style from "./style.module.css";

type TaskComponentProps = {
  task: TaskType;
  columnId: number;
  taskIndex: number;
  activeDragId: string;
};
const Task = ({
  task,
  columnId,
  taskIndex,
  activeDragId,
}: TaskComponentProps) => {
  const currentTaskId = task._id.toString();

  return (
    <Draggable draggableId={currentTaskId} index={taskIndex}>
      {(provided) => {
        return (
          <div
            className={`${style.taskWrapper} ${
              activeDragId === currentTaskId && style.taskWrapperActive
            }`}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <TaskTitle title={task.title} />
            <TaskDescription description={task.description} />
            <TaskManagement
              columnId={columnId}
              taskId={currentTaskId}
              taskIndex={taskIndex}
            />
          </div>
        );
      }}
    </Draggable>
  ); // TODO: add some functions to task management...
};

export default Task;
