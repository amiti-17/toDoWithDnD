type Title = "toDo" | "inProgress" | "done";
type Display = "To do" | "In progress" | "Done";
type Column = {
  title: Title;
  display: Display;
};

export const columnInit: Column[] = [
  {
    title: "toDo",
    display: "To do",
  },
  {
    title: "inProgress",
    display: "In progress",
  },
  {
    title: "done",
    display: "Done",
  },
];
