import { prisma } from '../../lib/prisma';
import { NextResponse } from 'next/server';
import { serverAuth } from '../../lib/auth';

export async function GET() {
  try {
    const session = await serverAuth();
    const uid = session?.user.id;
    if(!uid){
      throw Error("no user found");
    }
    const books = await prisma.book.findMany({
      where: {
        userId: uid
      },
      orderBy: {
        updatedAt: "desc"
      }
    })
    return NextResponse.json(books)
  }catch(e) {
    return NextResponse.json({ error: e }, { status: 400 })
  }
}
