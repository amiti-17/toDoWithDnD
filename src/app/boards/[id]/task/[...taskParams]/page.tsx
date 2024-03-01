import TaskPage from "@/pages/Task";

export default function Page({
  params,
}: {
  params: { taskParams: string[]; id: string };
}) {
  console.log(params);
  return (
    <TaskPage
      boardId={params.id}
      type={params.taskParams[0]}
      taskId={params.taskParams[1]}
    />
  );
}
