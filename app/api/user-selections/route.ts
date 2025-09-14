import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

export async function GET() {
  const cookieStore = await cookies()

  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  })

  try {
    const { data, error } = await supabase.from("user_selections").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching user selections:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching user selections:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const cookieStore = await cookies()

  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  })

  try {
    const { product_id, user_email, user_name } = await request.json()

    const { data: existingSelection, error: checkError } = await supabase
      .from("user_selections")
      .select("*")
      .eq("product_id", product_id)
      .single()

    if (checkError && checkError.code !== "PGRST116") {
      // PGRST116 is "not found" error, which is expected if no one has reserved it
      console.error("Error checking existing selection:", checkError)
      return NextResponse.json({ error: checkError.message }, { status: 500 })
    }

    if (existingSelection) {
      if (existingSelection.user_email === user_email) {
        return NextResponse.json({ error: "Ya tienes este producto reservado" }, { status: 409 })
      } else {
        return NextResponse.json(
          { error: `Este producto ya está reservado por ${existingSelection.user_name}` },
          { status: 409 },
        )
      }
    }

    const { data, error } = await supabase
      .from("user_selections")
      .insert([
        {
          product_id,
          user_email,
          user_name,
        },
      ])
      .select()

    if (error) {
      console.error("Error adding user selection:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data[0])
  } catch (error) {
    console.error("Error adding user selection:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const cookieStore = await cookies()

  const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        } catch {
          // The `setAll` method was called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  })

  try {
    const { searchParams } = new URL(request.url)
    const product_id = searchParams.get("product_id")
    const user_email = searchParams.get("user_email")

    if (!product_id || !user_email) {
      return NextResponse.json({ error: "Missing product_id or user_email" }, { status: 400 })
    }

    const { error } = await supabase
      .from("user_selections")
      .delete()
      .eq("product_id", product_id)
      .eq("user_email", user_email)

    if (error) {
      console.error("Error removing user selection:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error removing user selection:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
