import { Board } from "@/mongoDB/models/boardsAndTasks";
import connectToMongoDb from "@/mongoDB/connect";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: mongoose.Types.ObjectId } }
) {
  const { id } = params;
  const myNewData = await request.json();
  await connectToMongoDb();
  await Board.findByIdAndUpdate(id, myNewData);
  const updatedBoard = await Board.findById(id);
  console.log(updatedBoard);
  return NextResponse.json({ board: updatedBoard }, { status: 200 });
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: mongoose.Types.ObjectId } }
) {
  const { id } = params;
  await connectToMongoDb();
  const board = await Board.findById(id);
  return NextResponse.json({ board }, { status: 200 });
}
