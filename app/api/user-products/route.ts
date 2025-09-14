import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = await createClient()

    const { data: userProducts, error } = await supabase
      .from("user_products")
      .select("*")
      .order("created_at", { ascending: true })

    if (error) {
      console.error("Error fetching user products:", error)
      return NextResponse.json({ error: "Failed to fetch user products" }, { status: 500 })
    }

    return NextResponse.json(userProducts)
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { product_id, user_email, user_name } = await request.json()

    if (!product_id || !user_email || !user_name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const supabase = await createClient()

    const { data, error } = await supabase
      .from("user_products")
      .insert({
        product_id,
        user_email,
        user_name,
      })
      .select()
      .single()

    if (error) {
      if (error.code === "23505") {
        // Unique constraint violation
        return NextResponse.json({ error: "Product already in your wishlist" }, { status: 409 })
      }
      console.error("Error adding to wishlist:", error)
      return NextResponse.json({ error: "Failed to add to wishlist" }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const product_id = searchParams.get("product_id")
    const user_email = searchParams.get("user_email")

    if (!product_id || !user_email) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    const supabase = await createClient()

    const { error } = await supabase
      .from("user_products")
      .delete()
      .eq("product_id", product_id)
      .eq("user_email", user_email)

    if (error) {
      console.error("Error removing from wishlist:", error)
      return NextResponse.json({ error: "Failed to remove from wishlist" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
