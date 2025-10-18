import { supabase } from "../../../client";

export async function LogInUser({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
        alert(error.message);
        return;
    } 
    return true;
}