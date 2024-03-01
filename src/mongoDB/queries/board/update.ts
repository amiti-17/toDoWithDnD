import { BoardType } from "@/config/system/types/sampleBoard";

export default function updateOneById(
  id: string,
  updatedBoard: BoardType
): Promise<BoardType> {
  try {
    return fetch(`/api/boards/${id}`, {
      method: "PUT",
      cache: "no-cache",
      body: JSON.stringify(updatedBoard),
    })
      .then((res) => res.json())
      .then((res) => res.board);
  } catch (error) {
    console.warn("Error occurred in Update board: ", error);
    throw error;
  }
}
