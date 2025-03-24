import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/db/dbConnect";
import User from "@/db/models/User";

export async function POST(req: Request) {
  try {
    const { name, tel, email, password, role } = await req.json();

    if (!name || !tel || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    await dbConnect();
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ 
      name, 
      tel, 
      email, 
      password: hashedPassword, 
      role: role || "user" // ค่าเริ่มต้นเป็น user
    });

    await newUser.save();

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}