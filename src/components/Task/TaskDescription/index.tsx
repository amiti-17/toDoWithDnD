import { TaskType } from "@/config/system/types/sampleBoard";
import style from "./style.module.css";

export default function TaskDescription({ description }: Pick<TaskType, 'description'>) {
  return (
    <div className={style.description}>{description}</div>
  )
}