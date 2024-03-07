import Link from "next/link";
import { MdLibraryAdd } from "react-icons/md";
import style from "./style.module.css";
import { useParams } from "next/navigation";

const TaskCommands = () => {
  const params = useParams();

  return (
    <div className={style.taskCommand}>
      <Link href={`/boards/${params?.id}/task/create`} className={style.link}>
        <MdLibraryAdd title="add new task" className={style.svg} />
      </Link>
    </div>
  );
};

export default TaskCommands;
