import { useEffect } from "react"
import { supabase } from "../../client"

export const ProtectedRoutes = ({ children }) => {
    useEffect(() => {
        async function fetchActiveUsers() {
            const { data, error } = await supabase.auth.getSession();
            
      }
    
    }, [])
    
}