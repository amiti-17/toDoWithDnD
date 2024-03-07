import { ChangeEvent, FocusEvent } from "react";

export type HandleBlurType = {
  (e: FocusEvent<any, Element>): void;
  <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
};

export type HandleChangeType = {
  (e: ChangeEvent<any>): void;
  <T = string | ChangeEvent<any>>(field: T): T extends ChangeEvent<any>
    ? void
    : (e: string | ChangeEvent<any>) => void;
};
