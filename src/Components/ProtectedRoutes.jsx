import { useEffect, useState } from "react"
import { supabase } from "../../client"
import { LoginPage } from "../pages/auth/LoginPage";
import { Navigate } from "react-router";

export const ProtectedRoutes = ({ children }) => {
    const [isLoggedIn, setisLoggedIn] = useState(null);
    useEffect(() => {
        async function fetchActiveUsers() {
            const { data, error } = await supabase.auth.getSession();
            console.log(data);
            setisLoggedIn(!!data.session);
        }
        
        fetchActiveUsers();

        const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
            setisLoggedIn(!!session);
        });

        return () => listener.subscription.unsubscribe();
    
    }, []);
    console.log(isLoggedIn);

    if (isLoggedIn === null) return <div>Loading</div>
    if (!isLoggedIn) return <Navigate to='/login' />
    return children;
    
}

export const SuperAdminRoute = ({ children }) => {
    const [authState, setAuthState] = useState({ loading: true, isLoggedIn: false, isAdmin: false });
    
    useEffect(() => {
        async function checkAdminStatus() {
            const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
            
            if (!sessionData.session) {
                setAuthState({ loading: false, isLoggedIn: false, isAdmin: false });
                return;
            }

            const { data: profile, error: profileError } = await supabase
                .from('farmer_profile') 
                .select('isAdmin')
                .eq('email', sessionData.session.user.email)
                .single();

            if (profileError) {
                console.error('Error fetching profile:', profileError);
                setAuthState({ loading: false, isLoggedIn: true, isAdmin: false });
                return;
            }

            setAuthState({
                loading: false,
                isLoggedIn: true,
                isAdmin: profile?.isAdmin || false
            });
        }
        
        checkAdminStatus();

        const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (!session) {
                setAuthState({ loading: false, isLoggedIn: false, isAdmin: false });
                return;
            }

            // Re-check admin status on auth change
            const { data: profile } = await supabase
                .from('farmer_profile')
                .select('isAdmin')
                .eq('email', session.user.email)
                .single();

            setAuthState({
                loading: false,
                isLoggedIn: true,
                isAdmin: profile?.isAdmin || false
            });
        });

        return () => listener.subscription.unsubscribe();
    
    }, []);

    if (authState.loading) return <div>Loading...</div>
    if (!authState.isLoggedIn) return <Navigate to='/login' />
    if (!authState.isAdmin) return <Navigate to='/' /> // Or redirect to home
    
    return children;
}