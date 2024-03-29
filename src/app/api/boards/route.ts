import { NextRequest, NextResponse } from "next/server";
import connectToMongoDb from "@/mongoDB/connect";
import { Board } from "@/mongoDB/models/boardsAndTasks";

export async function POST(request: NextRequest) {
  const myData = await request.json();
  await connectToMongoDb();
  console.log(myData);
  await Board.create(myData);
  const myCreatedBoard = await Board.findOne().sort({ createdAt: -1 });
  return NextResponse.json({ board: myCreatedBoard }, { status: 201 });
}

export async function GET() {
  await connectToMongoDb();
  const boards = await Board.find();
  return NextResponse.json({ boards });
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  await connectToMongoDb();
  console.log(await Board.findByIdAndDelete(id));
  return NextResponse.json({ message: "Topic deleted" }, { status: 200 });
}
