import { supabase } from "../../../client";

export async function FetchAllProduct() {
    const { data, error } = await supabase.from("marketplace").select("*");
    if (error) {
        alert(error);
        return;
    }
}