import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';

export async function POST(req: Request) {
  try{
    const { bookId, page, memo } = await req.json();

    const book = await prisma.memo.create({
      data: {
        bookId,
        content: memo,
        pageNumber: page,

      }
    })
    return NextResponse.json(book)
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 })
  }
}
