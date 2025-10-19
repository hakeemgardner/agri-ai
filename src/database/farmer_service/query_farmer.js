import { supabase } from "../../../client";

export async function QueryFarmer({ id }) {
    const { data, error } = await supabase.from("farmer_profile").select("*").eq("user_id", id);
    if (error) {
        alert(error.message);
        return;
    }
    return data;
}