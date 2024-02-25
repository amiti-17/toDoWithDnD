

import { useCollapse } from "react-collapsed";
import { MdCreateNewFolder, MdFolderDelete } from "react-icons/md";
import style from "./style.module.css"

export default function CollapseActions({ isOpened }: { isOpened: boolean }) {

  const { getCollapseProps } = useCollapse({ isExpanded: isOpened });

  return ( // TODO: figure out why collapse didn't work property
    <div className={style.collapseWrapper} {...getCollapseProps({ style: {
      display: 'flex', // why it is not set
      width: '100%',
      margin: 'auto',
      marginTop: '15px',
      justifyContent: 'center',
      flexFlow: 'row wrap',
      gap: '15px',
    }})} >
      <button className={style.button}>
        Create new board <MdCreateNewFolder />
      </button>
      <button className={style.button}>
        Delete current board <MdFolderDelete />
      </button>
    </div>
  )
}
