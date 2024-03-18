import { Draggable } from "@hello-pangea/dnd";
import { TaskType } from "@/config/system/types/sampleBoard";
import TaskTitle from "./TaskTitle";
import TaskDescription from "./TaskDescription";
import TaskManagement from "./TaskManagement";
import style from "./style.module.css";

type TaskComponentProps = {
  task: TaskType;
  columnId: number;
  taskIndex: number;
  activeDragId: string;
  // taskModalProps: TaskModalProps;
  // setTaskModalProps: React.Dispatch<React.SetStateAction<TaskModalProps>>;
};
const Task = ({
  task,
  columnId,
  taskIndex,
  activeDragId,
}: // taskModalProps,
// setTaskModalProps,
TaskComponentProps) => {
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
              // taskModalProps={taskModalProps}
              // setTaskModalProps={setTaskModalProps}
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
