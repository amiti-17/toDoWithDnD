import connectToMongoDb from "@/mongoDB/connect";
import { Task } from "@/mongoDB/models/boardsAndTasks";
import { NextRequest, NextResponse } from "next/server";

// export async function GET() {
//   await connectToMongoDb();
//   const tasks = await Task.find();
//   return NextResponse.json({ tasks });
// }
