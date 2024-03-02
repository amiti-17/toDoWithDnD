import TaskPage from "@/myPages/Task";

export default function Page({
  params,
}: {
  params: { taskParams: string[]; id: string };
}) {
  return <TaskPage boardId={params.id} />;
}
