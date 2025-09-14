import { supabase } from "../../_lib/supabase";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
        }
      );
    }
    const { data: existingUser } = await supabase
      .from("customer")
      .select("id")
      .eq("email", email)
      .single();
    if (existingUser) {
      return new Response(JSON.stringify({ error: "User already exists" }), {
        status: 400,
      });
    }
    const { data: last } = await supabase
      .from("customer")
      .select("id")
      .order("id", { ascending: false })
      .limit(1);

    const newId = last?.[0]?.id ? last[0].id + 1 : 1;

    const hashedPassword = await bcrypt.hash(password, 10);
    const { data, error } = await supabase
      .from("customer")
      .insert([{ id: newId, name, email, password: hashedPassword }])
      .select()
      .single();

    if (error) throw error;

    return new Response(JSON.stringify(data), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
