import { useCollapse } from "react-collapsed";
import { MdCreateNewFolder, MdFolderDelete } from "react-icons/md";
import style from "./style.module.css";
import { useEffect, useState } from "react";
import dbAPI from "@/dbAPI";
import { useRouter } from "next/navigation";

type CollapseActionsType = {
  isOpened: boolean;
  setIsDeleted: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function CollapseActions({
  isOpened,
  setIsDeleted,
}: CollapseActionsType) {
  const { getCollapseProps } = useCollapse({ isExpanded: isOpened });
  const [isCreateButtonDisabled, setIsCreateButtonDisabled] = useState(false);
  const router = useRouter();

  async function createBoard() {
    setIsCreateButtonDisabled(true);
    if (!isCreateButtonDisabled) {
      const newBoard = await dbAPI.create();
      router.push("/boards/" + newBoard._id.toString());
    }
  }

  // useEffect(() => {
  //   (async () => {})();
  // }, []);

  return (
    <div {...getCollapseProps()}>
      <div className={style.collapseWrapper}>
        <button
          className={style.button}
          onClick={createBoard}
          disabled={isCreateButtonDisabled}
        >
          Create new board <MdCreateNewFolder />
        </button>
        <button className={style.button}>
          Delete current board <MdFolderDelete />
        </button>
      </div>
    </div>
  );
}
