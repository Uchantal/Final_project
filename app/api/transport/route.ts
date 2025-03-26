import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/db"
import type { Transport } from "@/lib/models/transport"

// GET all transport providers
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const provider = searchParams.get("provider")
    const location = searchParams.get("location")
    const vehicleType = searchParams.get("vehicleType")
    const feature = searchParams.get("feature")
    const minCapacity = searchParams.get("minCapacity")
    const availability = searchParams.get("availability")

    // Build query
    const query: any = {}
    if (provider) query.provider = provider
    if (location) query.location = location
    if (vehicleType) query.vehicleType = vehicleType
    if (feature) query.features = feature
    if (availability) query.availability = availability

    // Capacity
    if (minCapacity) query.capacity = { $gte: Number.parseInt(minCapacity) }

    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db()

    // Get transport providers
    const transporters = await db.collection("transport").find(query).toArray()

    return NextResponse.json(transporters)
  } catch (error) {
    console.error("Error fetching transport providers:", error)
    return NextResponse.json({ error: "Failed to fetch transport providers" }, { status: 500 })
  }
}

// POST new transport provider
export async function POST(req: NextRequest) {
  try {
    const transportData = await req.json()

    // Validate input
    if (!transportData.name || !transportData.provider || !transportData.capacity || !transportData.pricePerKm) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Connect to MongoDB
    const client = await clientPromise
    const db = client.db()

    // Create new transport provider
    const newTransport: Transport = {
      ...transportData,
      availability: "Available", // Initially available
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Insert transport into database
    const result = await db.collection("transport").insertOne(newTransport)

    // Return success response
    return NextResponse.json(
      {
        message: "Transport provider added successfully",
        transportId: result.insertedId,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error adding transport provider:", error)
    return NextResponse.json({ error: "Failed to add transport provider" }, { status: 500 })
  }
}

