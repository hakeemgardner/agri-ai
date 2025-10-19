import { supabase } from "../../../client";

export async function ReadCurrentUser() {
    const currentUser = supabase.auth.getUser();
    if(currentUser === null) return alert("A problem occured while getting user!")
    const { data, error } = await supabase.from("farmer_profile").select("*").eq('email', (await currentUser).data.user.email);
    if (error) {
        alert(error.message);
    }
    console.log(data[0]);
    return data[0];
}