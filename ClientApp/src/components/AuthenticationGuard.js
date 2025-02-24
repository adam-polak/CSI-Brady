import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthenticationGuard = ({ component }) => {
    const { isAuthenticated } = useAuth0();
    const nav = useNavigate();

    const Component = withAuthenticationRequired(component, {
        onRedirecting: () => (
            <div className="container-lg">
                <h2 className="text-center mt-4">Loading...</h2>
            </div>
        )
    });

    useEffect(() => {
        if(!isAuthenticated) {
            nav("/");
        }
    });

    return isAuthenticated && <Component />
}