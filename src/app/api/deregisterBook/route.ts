import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

export async function DELETE(req: Request) {
  try {
    const { bookId } = await req.json();

    const result = await prisma.book.delete({
      where: {
        id: bookId
      }
    });

    if(result) NextResponse.json({message: "Deregisteration successful"}, {status: 200});
  } catch(e) {
    return NextResponse.json({message: "failed to deregister the book"}, { status: 500 });
  }
}