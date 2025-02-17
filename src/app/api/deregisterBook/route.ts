import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

export async function DELETE(req: Request) {
  try {
    const { bookId } = await req.json();

    console.log(bookId);
    await prisma.book.delete({
      where: {
        id: bookId
      }
    });

    return NextResponse.json({message: "Deregisteration successful"}, {status: 200});
  } catch(e) {
    console.log(e);
    return NextResponse.json({message: "failed to deregister the book"}, { status: 500 });
  }
}