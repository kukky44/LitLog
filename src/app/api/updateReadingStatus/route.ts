import { NextResponse } from "next/server";
import { prisma } from "../../lib/prisma";

export async function PATCH(req: Request) {
  console.log("UPDATE: reading status");
  try {
    const { bookId, readingStatus } = await req.json();

    if(!bookId || readingStatus === undefined || readingStatus === null)
      return NextResponse.json({ message: "book id or status is not valid" }, {status: 403} );

    if(readingStatus < 0 || readingStatus > 2)
      return NextResponse.json({ message: "reading status should be between 0 and 2"}, { status: 403 });

    const result = await prisma.book.update({
      where: {
        id: bookId
      },
      data: {
        readingStatus: readingStatus
      }
    })

    if(result) return NextResponse.json(result);
    else return NextResponse.json({message: "update failed"});
  } catch (e) {
    return NextResponse.json(e, {status: 500});
  }
}