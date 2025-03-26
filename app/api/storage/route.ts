import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/db"
import type { Storage } from "@/lib/models/storage"

// GET all storage facilities
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const provider = searchParams.get("provider")
    const location = searchParams.get("location")
    const feature = searchParams.get("feature")
    const minAvailable = searchParams.get("minAvailable")

    // Build query
    const query: any = {}
    if (provider) query.provider = provider
    if (location) query.location = location
    if (feature) query.features = feature

    // Available capacity
    if (minAvailable) query.available = { $gte: Number.parseInt(minAvailable) }

    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db()

    // Get storage facilities
    const storages = await db.collection("storage").find(query).toArray()

    return NextResponse.json(storages)
  } catch (error) {
    console.error("Error fetching storage facilities:", error)
    return NextResponse.json({ error: "Failed to fetch storage facilities" }, { status: 500 })
  }
}

// POST new storage facility
export async function POST(req: NextRequest) {
  try {
    const storageData = await req.json()

    // Validate input
    if (!storageData.name || !storageData.provider || !storageData.capacity || !storageData.pricePerTon) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db()

    // Create new storage facility
    const newStorage: Storage = {
      ...storageData,
      available: storageData.capacity, // Initially all capacity is available
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Insert storage into database
    const result = await db.collection("storage").insertOne(newStorage)

    // Return success response
    return NextResponse.json(
      {
        message: "Storage facility added successfully",
        storageId: result.insertedId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error adding storage facility:", error)
    return NextResponse.json({ error: "Failed to add storage facility" }, { status: 500 })
  }
}

