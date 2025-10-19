import { supabase } from "../../../client";

export async function SignUpUser({ email, password }) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
        alert(error.message);
        return;
    }
    return data;
}