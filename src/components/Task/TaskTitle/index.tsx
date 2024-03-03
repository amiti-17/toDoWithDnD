// import { HiArchiveBoxXMark } from "react-icons/hi2";
import { TaskType } from "@/config/system/types/sampleBoard";
import style from "./style.module.css";

const TaskTitle = ({ title }: Pick<TaskType, "title">) => {
  return (
    <div className={style.taskTitleWrapper}>
      <div className={style.title}>{title}</div>
      {/* <HiArchiveBoxXMark className={style.icon} />  */}
    </div>
  );
};

export default TaskTitle;
