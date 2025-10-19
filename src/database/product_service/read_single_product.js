import { supabase } from "../../../client";

export async function FetchCurrentUserProducts() {
    // Get the current authenticated user
    const currentUser = supabase.auth.getUser();
    if(currentUser === null) {
        alert("A problem occurred while getting user!");
        return null;
    }
    
    const userEmail = (await currentUser).data.user.email;
    
    // First, get the user_id from farmer_profile table using email
    const { data: farmerData, error: farmerError } = await supabase
        .from("farmer_profile")
        .select("user_id")
        .eq('email', userEmail)
        .single();
    
    if (farmerError) {
        alert("Error fetching farmer profile: " + farmerError.message);
        return null;
    }
    
    // Then, fetch products from marketplace where farmer_id matches user_id
    const { data: products, error: productsError } = await supabase
        .from("marketplace")
        .select("*")
        .eq("farmer_id", farmerData.user_id);
    
    if (productsError) {
        alert("Error fetching products: " + productsError.message);
        return null;
    }
    
    console.log("User products:", products);
    console.log(products);
    return products;
}
