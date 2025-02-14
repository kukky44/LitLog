import { NextRequest, NextResponse } from "next/server";
import { serverAuth } from "../../../lib/auth";
import { prisma } from "../../../lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ googleBookId: string }> }
) {
  const session = await serverAuth();
  if(!session) return NextResponse.json({message: "No logged in user"}, {status: 403});
  const uid = session?.user.id;

  const gBookId = (await params).googleBookId;
  if(!gBookId) return NextResponse.json({message: "Book Google ID is required."}, { status: 400 });

  try {
    const book = await prisma.book.findFirst({
      where: {
        userId: uid,
        googleBookId: gBookId
      }
    })

    if(!book) NextResponse.json({message: "Book is not registered"}, {status: 404});

    return NextResponse.json(book, {status: 200});
  } catch (err) {
    console.log("Error fetching book", err);
    return NextResponse.json({message: "Error fethcing book"}, {status: 500});
  }
}