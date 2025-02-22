import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";
import { useNavigate } from "react-router-dom";

export const AuthenticationGuard = ({ component }) => {
    const { isAuthenticated, isLoading } = useAuth0();
    const nav = useNavigate();

    const Component = withAuthenticationRequired(component, {
        onRedirecting: () => (
            <h2>Loading...</h2>
        )
    });

    if(!isLoading && !isAuthenticated) {
        nav("/");
    }

    return isAuthenticated && <Component />
}