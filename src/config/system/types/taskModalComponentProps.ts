export type TaskModalProps = {
  actionType: string;
  taskId: string | null;
  columnId: string | null;
  oldTitle: string | null;
  oldDescription: string | null;
};

export const initialTaskModalProps: TaskModalProps = {
  actionType: "",
  taskId: null,
  columnId: null,
  oldTitle: null,
  oldDescription: null,
};
