import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Connect to MongoDB
    const { db } = await connectToDatabase()

    // Find product by ID
    let product

    try {
      // Try to find by ObjectId (for MongoDB generated IDs)
      product = await db.collection("products").findOne({ _id: new ObjectId(id) })
    } catch (error) {
      // If not a valid ObjectId, try to find by string ID
      product = await db.collection("products").findOne({ id: id })
    }

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({ product })
  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const body = await request.json()

    // Connect to MongoDB
    const { db } = await connectToDatabase()

    // Update product
    let result

    try {
      // Try to update by ObjectId
      result = await db.collection("products").updateOne({ _id: new ObjectId(id) }, { $set: body })
    } catch (error) {
      // If not a valid ObjectId, try to update by string ID
      result = await db.collection("products").updateOne({ id: id }, { $set: body })
    }

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // Get updated product
    let updatedProduct

    try {
      updatedProduct = await db.collection("products").findOne({ _id: new ObjectId(id) })
    } catch (error) {
      updatedProduct = await db.collection("products").findOne({ id: id })
    }

    return NextResponse.json({ product: updatedProduct })
  } catch (error) {
    console.error("Error updating product:", error)
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Connect to MongoDB
    const { db } = await connectToDatabase()

    // Delete product
    let result

    try {
      // Try to delete by ObjectId
      result = await db.collection("products").deleteOne({ _id: new ObjectId(id) })
    } catch (error) {
      // If not a valid ObjectId, try to delete by string ID
      result = await db.collection("products").deleteOne({ id: id })
    }

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting product:", error)
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}
