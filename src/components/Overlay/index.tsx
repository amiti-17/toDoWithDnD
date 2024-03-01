import { LegacyRef, ReactNode, forwardRef } from "react";
import style from "./style.module.css";

// eslint-disable-next-line react/display-name
const Overlay = forwardRef(
  (
    {
      isModalActive,
      children,
    }: { children: ReactNode; isModalActive: boolean },
    ref: LegacyRef<HTMLDivElement> | undefined
  ) => {
    if (!isModalActive) {
      return <>{children}</>;
    }
    return (
      <div ref={ref} className={style.overlay}>
        {children}
      </div>
    );
  }
);

export default Overlay;
