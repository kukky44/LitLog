import { NextResponse } from "next/server";
import { prisma } from "@/src/app/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {

  try{
    const { email, password } = await req.json();

    if(!email || !password) {
      throw Error("empty email or password");
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    });

    console.log("lgging in user and checking password");
    if(user){
      const match = await bcrypt.compare(password, user.password);
      if(match){
        return NextResponse.json(user);
      }
    }

    throw Error("Login failed");
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 })
  }
}
