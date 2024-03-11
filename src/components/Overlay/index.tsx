import { LegacyRef, ReactNode, forwardRef } from "react";
import style from "./style.module.css";
import Link from "next/link";

// eslint-disable-next-line react/display-name
const Overlay = forwardRef(
  (
    { children, close }: { children: ReactNode; close: () => void },
    ref: LegacyRef<HTMLDivElement> | undefined
  ) => {
    return (
      <div ref={ref} className={style.overlay} onClick={close}>
        <div
          className={style.modalWrapper}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    );
  }
);

export default Overlay;
