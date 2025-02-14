
import { prisma } from '@/src/app/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ bookId: string }> }
  ) {
  const bookId = (await params).bookId;
console.log(bookId);
  try {
    const memos = await prisma.memo.findMany({
      where: {
        bookId: bookId
      },
      orderBy: {
        createdAt: "desc"
      }
    })
    return NextResponse.json(memos)
  }catch(e) {
    return NextResponse.json({ error: e }, { status: 400 })
  }
}
