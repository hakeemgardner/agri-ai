import { supabase } from "../../../client"; // adjust path as needed

export async function logoutUser() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error signing out:", error.message);
    alert("Failed to log out. Please try again.");
    return;
  }

  console.log("User logged out successfully");
  // Optionally redirect or refresh:
  window.location.href = "/login"; // or your login route
}
