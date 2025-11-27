import { supabase } from "@/lib/supabaseClient";

export default async function Test() {
  const { data, error } = await supabase.from("products").select("*").limit(1);

  console.log("DATA:", data);
  console.log("ERROR:", error);

  return (
    <pre className="p-10 text-sm">
      {JSON.stringify({ data, error }, null, 2)}
    </pre>
  );
}
