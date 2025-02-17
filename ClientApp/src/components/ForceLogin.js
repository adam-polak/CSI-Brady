import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom"

export const ForceLogin = () => {
    const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();
    const nav = useNavigate();

    if(isAuthenticated) {
        nav("/counter");
    } else if(!isLoading) {
        loginWithRedirect();
    }

    return <></>
}