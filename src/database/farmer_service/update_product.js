import { supabase } from "../../../client";

// ... your existing functions ...

export async function UpdateProduct(productId, updatedData) {
    const { data, error } = await supabase
        .from("marketplace")
        .update({
            title: updatedData.title,
            category: updatedData.category,
            price: updatedData.price,
            quantity: updatedData.amount,
            weight: updatedData.weight,
            weight_unit: updatedData.weight_unit,
            location: updatedData.parish,
        })
        .eq("id", productId)
        .select();
    
    if (error) {
        alert("Error updating product: " + error.message);
        return null;
    }
    
    alert("Product updated successfully!");
    return data[0];
}