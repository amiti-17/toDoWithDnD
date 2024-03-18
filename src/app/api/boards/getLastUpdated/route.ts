import { NextResponse } from "next/server";
import connectToMongoDb from "@/mongoDB/connect";
import { Board } from "@/mongoDB/models/boardsAndTasks";

export async function GET() {
  await connectToMongoDb();
  const limit = process.env.HOW_MUCH_DISPLAY_SUGGESTIONS_IN_SEARCH
    ? Number(process.env.HOW_MUCH_DISPLAY_SUGGESTIONS_IN_SEARCH)
    : 3;
  const lastModified = await Board.find().sort({ updatedAt: -1 }).limit(limit);
  return NextResponse.json({ boards: lastModified });
}
