import { supabase } from "../../../client";

export async function DeleteProduct(productId) {
    const { data, error } = await supabase
        .from("marketplace")
        .delete()
        .eq("id", productId)
        .select();
    
    if (error) {
        alert("Error deleting product: " + error.message);
        return null;
    }
    
    alert("Product deleted successfully!");
    return data;
}