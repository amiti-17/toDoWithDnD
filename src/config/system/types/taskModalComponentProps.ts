export type TaskModalProps = {
  isModalActive: boolean;
  setIsModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  actionType: string;
  taskId: string | null;
  columnId: string | null;
  oldTitle: string | null;
  oldDescription: string | null;
};

export const initialTaskModalProps: TaskModalProps = {
  isModalActive: false,
  setIsModalActive: () => {},
  actionType: "",
  taskId: null,
  columnId: null,
  oldTitle: null,
  oldDescription: null,
};
