import Board from "@/mongoDB/models/boards";
import connectToMongoDb from "@/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // TODO: figure out which type is here
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
