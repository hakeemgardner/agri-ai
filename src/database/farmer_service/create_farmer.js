import { supabase } from "../../../client";

export async function createFarmer({email, telephone, parish, name}) {
    const { error } = await supabase.from("farmer_profile").insert({ "email": email, "telephone": telephone, "parish": parish, "isFarmer": true, "name": name });
    if (error) {
        alert(error.message);
        return;
    }
}