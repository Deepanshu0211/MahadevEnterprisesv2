import { NextResponse } from "next/server"
import { hash } from "bcryptjs"
import { connectToDatabase } from "@/lib/mongodb"
import { z } from "zod"

const userSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Validate input
    const result = userSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ message: "Invalid input data", errors: result.error.format() }, { status: 400 })
    }

    const { name, email, password } = result.data

    // Connect to database
    const { db } = await connectToDatabase()

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ email })
    if (existingUser) {
      return NextResponse.json({ message: "User with this email already exists" }, { status: 409 })
    }

    // Hash password
    const hashedPassword = await hash(password, 12)

    // Create user
    const newUser = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      role: "user",
      createdAt: new Date(),
    })

    return NextResponse.json(
      {
        message: "User created successfully",
        userId: newUser.insertedId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ message: "An error occurred during registration" }, { status: 500 })
  }
}
