import { TaskType } from "@/config/system/types/sampleBoard";

export default async function create(): Promise<TaskType | undefined> {
  try {
    const data = await fetch("/api/boards", {
      method: "POST",
      body: JSON.stringify({
        title: "",
        description: "",
      }),
    });
    return (await data.json()).task;
  } catch (error) {
    console.warn("We couldn't fetch initial board in getInitial", error);
    return;
  }
}

// #deprecated
// #unUsed
