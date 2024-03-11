import { ReactNode } from "react";
import style from "./style.module.css";

// eslint-disable-next-line react/display-name
const Overlay = ({
  children,
  close,
}: {
  children: ReactNode;
  close: () => void;
}) => {
  return (
    <div className={style.overlay} onClick={close}>
      <div className={style.modalWrapper} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Overlay;
