

import { useCollapse } from "react-collapsed";
import { MdCreateNewFolder, MdFolderDelete } from "react-icons/md";
import style from "./style.module.css";

export default function CollapseActions({ isOpened }: { isOpened: boolean }) {

  const { getCollapseProps } = useCollapse({ isExpanded: isOpened });

  return (
    <div {...getCollapseProps()}>
      <div className={style.collapseWrapper}>
        <button className={style.button}>
          Create new board <MdCreateNewFolder />
        </button>
        <button className={style.button}>
          Delete current board <MdFolderDelete />
        </button>
      </div>
    </div>
  )
}
