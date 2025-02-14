import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';
import { serverAuth } from '../../lib/auth';

export async function POST(req: Request) {
  try{
    const session = await serverAuth();
    const uid = session?.user.id;
    if(!uid) {
      throw Error("no user found");
    }

    const {
      isbn,
      title,
      description,
      author,
      imageUrl,
      googleBookId,
    } = await req.json();

    const book = await prisma.book.create({
      data: {
        isbn,
        title,
        description,
        author,
        imageUrl,
        googleBookId,
        userId: uid
      }
    })
    return NextResponse.json(book)
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 })
  }
}
