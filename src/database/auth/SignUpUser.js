import { supabase } from "../../../client";

export async function SignUpUser({ email, password }) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
        alert(error.message);
    }
    if (data.user) {
        alert("User with this email address already exists")
    }
    if (!data.user) {
        alert("An email verification was sent");
    }
    return true;
}