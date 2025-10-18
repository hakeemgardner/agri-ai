import { supabase } from "../../../client";

export async function ReadAllFarmers() {
    const { data, error } = await supabase.from("farmer_profile").select("*").eq("isFarmer", true);
    if (error) {
        alert(error.message);
        return;
    }
    return data;
}