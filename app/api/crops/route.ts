import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/db"
import { type Crop, CropStatus } from "@/lib/models/crop"

// GET all crops
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const farmer = searchParams.get("farmer")
    const name = searchParams.get("name")
    const location = searchParams.get("location")
    const quality = searchParams.get("quality")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const status = searchParams.get("status")

    // Build query
    const query: any = {}
    if (farmer) query.farmer = farmer
    if (name) query.name = { $regex: name, $options: "i" }
    if (location) query.location = location
    if (quality) query.quality = quality
    if (status) query.status = status

    // Price range
    if (minPrice || maxPrice) {
      query.price = {}
      if (minPrice) query.price.$gte = Number.parseInt(minPrice)
      if (maxPrice) query.price.$lte = Number.parseInt(maxPrice)
    }

    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db()

    // Get crops
    const crops = await db.collection("crops").find(query).toArray()

    return NextResponse.json(crops)
  } catch (error) {
    console.error("Error fetching crops:", error)
    return NextResponse.json({ error: "Failed to fetch crops" }, { status: 500 })
  }
}

// POST new crop
export async function POST(req: NextRequest) {
  try {
    const cropData = await req.json()

    // Validate input
    if (!cropData.name || !cropData.farmer || !cropData.quantity || !cropData.price) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db()

    // Create new crop
    const newCrop: Crop = {
      ...cropData,
      status: CropStatus.AVAILABLE,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Insert crop into database
    const result = await db.collection("crops").insertOne(newCrop)

    // Return success response
    return NextResponse.json(
      {
        message: "Crop added successfully",
        cropId: result.insertedId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error adding crop:", error)
    return NextResponse.json({ error: "Failed to add crop" }, { status: 500 })
  }
}

