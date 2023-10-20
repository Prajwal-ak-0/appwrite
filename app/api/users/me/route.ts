import { getDataFromToken } from "@/lib/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request:NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const user = await prisma.user.findFirst({
            where:{
                id:userId
            },
            select:{
                id:true,
                email:true,
                username:true
            }
        });

        if(!user) throw new Error("User not found");

        return NextResponse.json({
            message:"User found",
            data:user
        })
        
    } catch (error:any) {
        return NextResponse.json({ error: error.message }, { status: 401 });
    }
}