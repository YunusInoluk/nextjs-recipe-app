import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      return new NextResponse("Email already taken", { status: 422 });
    }

    if (!name) return new NextResponse("Name is required", { status: 400 });
    if (!email) return new NextResponse("Email is required", { status: 400 });
    if (!password)
      return new NextResponse("Password is required", { status: 400 });

    const hashedPassword = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        username: name,
        email,
        password: hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });
    if (user) {
      return new NextResponse(
        JSON.stringify({
          name: user.username,
          email: email,
        })
      );
    }
  } catch (error) {
    return new NextResponse("Something went wrong.", { status: 400 });
  }
}
