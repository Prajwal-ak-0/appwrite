import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    console.log(reqBody);

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
        console.log("User does exists");
      return NextResponse.json(
        { message: "User does not exists" },
        { status: 400 }
      );
    }
    
    const validPassword = await bcryptjs.compare(password, user.password);
    if(!validPassword) {
        return NextResponse.json(
            { message: "Invalid password" },
            { status: 400 }
          );
    }
  
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
