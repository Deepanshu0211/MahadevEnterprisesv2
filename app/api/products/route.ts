import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const sort = searchParams.get("sort") || "featured"
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "12")

    // Connect to MongoDB
    const { db } = await connectToDatabase()

    // Build query
    const query: any = {}

    if (category) {
      query.category = category
    }

    if (search) {
      query.$or = [{ name: { $regex: search, $options: "i" } }, { description: { $regex: search, $options: "i" } }]
    }

    // Build sort options
    let sortOptions: any = {}

    switch (sort) {
      case "featured":
        sortOptions = { isFeatured: -1, createdAt: -1 }
        break
      case "newest":
        sortOptions = { createdAt: -1 }
        break
      case "price-low":
        sortOptions = { price: 1 }
        break
      case "price-high":
        sortOptions = { price: -1 }
        break
      default:
        sortOptions = { isFeatured: -1, createdAt: -1 }
    }

    // Calculate pagination
    const skip = (page - 1) * limit

    // Fetch products
    const products = await db.collection("products").find(query).sort(sortOptions).skip(skip).limit(limit).toArray()

    // Get total count for pagination
    const totalProducts = await db.collection("products").countDocuments(query)
    const totalPages = Math.ceil(totalProducts / limit)

    return NextResponse.json({
      products,
      pagination: {
        currentPage: page,
        totalPages,
        totalProducts,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    // Check authentication and authorization
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    // Connect to MongoDB
    const { db } = await connectToDatabase()

    // Create product
    const result = await db.collection("products").insertOne({
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return NextResponse.json(
      {
        message: "Product created successfully",
        productId: result.insertedId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
