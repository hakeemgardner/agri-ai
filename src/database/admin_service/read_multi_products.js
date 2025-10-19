import { supabase } from "../../../client";

export async function getAllProductListing() {
    const { data, error } = await supabase.from("marketplace").select("*");
    if (error) {
        alert(error.message);
        return;
    }
    return data;
}

export async function readFarmers() {
    const { data, err } = await supabase.from("farmer_profile").select('*');
    if (err) {
        console.log(err);
    }

    return data;
}

export async function ReadData() {
    const { data, err } = await supabase.from("marketplace").select("*");

    return data;
}
