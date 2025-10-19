import { supabase } from "../../../client";

export async function CreateProduct(
    { farmer_id, title, description, category, image_url, price, quantity, weight, weight_unit, location }
) {
    const currentUser = await supabase.auth.getUser();
    console.log(currentUser);
    if (currentUser.data.user === null) return alert("No User Logged In");
    const { data, error } = await supabase.from("marketplace").insert(
        {
            farmer_id: farmer_id,         // UUID from farmer_profile.user_id
            email: currentUser.data.user.email,
            title: title,             // product name
            description: description,       // product description
            category: category,          // e.g. 'Vegetables', 'Fruits', 'Livestock'
            image_url: image_url,         // main product image URL
            price: price,           // product price
            quantity: quantity,           // available stock
            weight: weight,          // weight per unit
            weight_unit: weight_unit,     // one of: 'kg', 'lb', 'g', 'oz'
            location: location,          // parish or selling location
            is_available: true,    // product availability
        }
    );
    if (error) {
        alert(error.message);
        return;
    }
}