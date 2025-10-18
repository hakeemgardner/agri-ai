import { supabase } from "../../../client";

export async function SignUpUser({ email, password }) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
        alert(error.message);
        return;
    }
    if (data.user) {
        alert("User with this email address already exists");
        return;
    }
    if (!data.user) {
        alert("An email verification was sent");
        return;
    }
    return true;
}