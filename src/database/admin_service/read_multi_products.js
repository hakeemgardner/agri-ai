import { supabase } from "../../../client";

export async function getAllProductListing() {
    const { data, error } = await supabase.from("marketplace").select("*");
    if (error) {
        alert(error.message);
        return;
    }
    return data;
}