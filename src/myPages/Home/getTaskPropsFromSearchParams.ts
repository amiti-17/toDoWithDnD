import { ReadonlyURLSearchParams } from "next/navigation";

const getTaskPropsFromSearchParams = (
  searchParams: ReadonlyURLSearchParams
) => {
  return {
    taskActionType: searchParams?.get("actionType"),
    taskId: searchParams?.get("taskId"),
    columnId: searchParams?.get("columnId"),
    oldTaskTitle: searchParams?.get("title"),
    oldTaskDescription: searchParams?.get("description"),
  };
};

export default getTaskPropsFromSearchParams;
