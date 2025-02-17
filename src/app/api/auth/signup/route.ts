import { NextResponse } from "next/server";
import { prisma } from "@/src/app/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {

  try{
    const { email, password } = await req.json();

    if(!email || !password) {
      return NextResponse.json({message: "email or password empty"}, { status: 422 });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email
      }
    })

    if(existingUser) return NextResponse.json({message: "existing email"}, { status: 422});

    const hashed = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email: email,
        password: hashed,
      }
    })

    return NextResponse.json({message: "user registration success"}, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 })
  }
};