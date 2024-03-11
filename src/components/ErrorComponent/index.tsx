import { ReactNode } from "react";
import style from "./style.module.css";

const ErrorComponent = ({ children }: { children: ReactNode }) => {
  return <div className={style.errorMessage}>{children}</div>;
};

export default ErrorComponent;
