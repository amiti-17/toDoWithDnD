import React, { ReactNode } from "react";
import { Droppable } from "@hello-pangea/dnd";
import style from "./style.module.css";

type DroppableAreaProps = {
  columnId: number;
  children: ReactNode;
};

const DroppableArea = ({ columnId, children }: DroppableAreaProps) => {
  return (
    <Droppable droppableId={String(columnId)}>
      {(provided) => (
        <div
          className={style.description}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default DroppableArea;
