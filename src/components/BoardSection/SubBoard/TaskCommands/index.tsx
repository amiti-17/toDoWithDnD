import Link from "next/link";
import { MdLibraryAdd } from "react-icons/md";
import { usePathname } from "next/navigation";
import style from "./style.module.css";

const TaskCommands = () => {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <div className={style.taskCommand}>
      <Link href={`${pathname}?actionType=create`} className={style.link}>
        <MdLibraryAdd title="add new task" className={style.svg} />
      </Link>
    </div>
  );
};

export default TaskCommands;
