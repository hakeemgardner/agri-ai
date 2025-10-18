import { supabase } from "../../../client";

export async function FetchAllProduct() {
    const { data, error } = await supabase.from("marketplace").select("*").eq("is_available", true);
    if (error) {
        alert(error);
        return;
    }
    return data;
}