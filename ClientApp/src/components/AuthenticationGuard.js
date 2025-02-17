import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";

export const AuthenticationGuard = ({ component }) => {
    const { isAuthenticated } = useAuth0();

    const Component = withAuthenticationRequired(component, {
        onRedirecting: () => (
            <h2>Loading...</h2>
        )
    });

    return isAuthenticated && <Component />
}