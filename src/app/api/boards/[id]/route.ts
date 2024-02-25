import Board from "@/mongoDB/models/boards";
import connectToMongoDb from "@/mongoDB";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(request: NextRequest, { params }: { params: { id: mongoose.Types.ObjectId }}) {
  const { id } = params;
  const myNewData = await request.json();
  await connectToMongoDb();
  await Board.findByIdAndUpdate(id, myNewData);
  return NextResponse.json({ message: 'Board was updated'}, { status: 200 });
}

export async function GET(request: NextRequest, { params }: { params: { id: mongoose.Types.ObjectId }}) {
  const { id } = params;
  await connectToMongoDb();
  const board = await Board.findById(id);
  return NextResponse.json({ board }, { status: 200});
}