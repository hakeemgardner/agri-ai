import { supabase } from "../../../client";

export async function CreateProduct(
    { title, description, category, image_url, price, quantity, weight, weight_unit, location }
) {
    const currentUser = await supabase.auth.getUser();
    console.log("User Data: ", currentUser)
    if (currentUser.data.user === null) return alert("No User Logged In");
    const { data, error } = await supabase.from("marketplace").insert(
        {
            farmer_id: currentUser.data.user.id,         // UUID from farmer_profile.user_id
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
        console.log("Error happened: ", error)
        alert(error.message);
        return;
    }
}

export const uploadImageToSupabase = async (file) => {    
    if (!file) return null;

    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `crop-images/${fileName}`;

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('products') // Replace 'products' with your actual bucket name
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error("Supabase upload error:", error);
        throw error;
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('products')
        .getPublicUrl(filePath);

      return urlData.publicUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw new Error("Failed to upload image");
    }
  };