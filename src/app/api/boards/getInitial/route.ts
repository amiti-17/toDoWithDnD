import { NextResponse } from "next/server";
import connectToMongoDb from "@/mongoDB/connect";
import { Board } from "@/mongoDB/models/boardsAndTasks";

export async function GET() {
  await connectToMongoDb();
  const lastCreated = await Board.findOne().sort({ createdAt: -1 });
  const lastModified = await Board.findOne().sort({ updatedAt: -1 });

  console.log({ lastModified, lastCreated });

  return NextResponse.json({
    board:
      lastCreated.createdAt > lastModified.updatedAt
        ? lastCreated
        : lastModified,
  });
}
