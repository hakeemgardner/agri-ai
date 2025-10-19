import { supabase } from "../../../client";

export async function CreateMessage({message}) {
    const { error } = await supabase.from("broadcasts").insert({ message: message });
    if(error)
    {
        alert(error);
        return;
    }
}