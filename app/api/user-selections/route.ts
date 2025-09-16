import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { HARDCODED_PRODUCTS } from '@/lib/constants';
import { createServerClient } from '@supabase/ssr';

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

    // Verificar si el usuario ya tiene este producto reservado
    const { data: userExistingSelection, error: userCheckError } = await supabase
      .from("user_selections")
      .select("*")
      .eq("product_id", product_id)
      .eq("user_email", user_email)
      .single()

    if (userCheckError && userCheckError.code !== "PGRST116") {
      console.error("Error checking user existing selection:", userCheckError)
      return NextResponse.json({ error: userCheckError.message }, { status: 500 })
    }

    if (userExistingSelection) {
      return NextResponse.json({ 
        error: "Ya elegiste este regalo para Emily. Actualiza la página para ver el estado actual." 
      }, { status: 409 })
    }

    // Obtener todas las reservas existentes para este producto
    const { data: existingReservations, error: reservationsError } = await supabase
      .from("user_selections")
      .select("*")
      .eq("product_id", product_id)

    if (reservationsError) {
      console.error("Error checking existing reservations:", reservationsError)
      return NextResponse.json({ error: reservationsError.message }, { status: 500 })
    }

    // Obtener la información del producto para verificar la cantidad máxima
    const product = HARDCODED_PRODUCTS.find(p => p.id === product_id);
    const maxQuantity = product?.quantity || 1;
    const currentReservations = existingReservations?.length || 0;

    if (currentReservations >= maxQuantity) {
      return NextResponse.json(
        { error: "Este regalo ya fue elegido por alguien más para Emily. Actualiza la página para ver el estado actual." },
        { status: 409 },
      )
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
