import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { prisma } from "@/lib/db";
import jwt from "jsonwebtoken";

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
        console.log("User does not exists");
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

    const tokenData = {
        id: user.id,
        email: user.email,
        username: user.username
    }

    const token = await jwt.sign(tokenData, process.env.JWT_SECRET!, {
        expiresIn: "1d"
    })

    const response = NextResponse.json({
      message:"Login successful",
      success: true,
    })
    response.cookies.set("token", token, {
        httpOnly: true
    })

    return response;
  
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
