import { useAuth0 } from "@auth0/auth0-react"
import { useState } from "react";

export const Profile = () => {
    const { user, getAccessTokenSilently } = useAuth0();

    const [token, setToken] = useState("");

    getAccessTokenSilently().then(x => {
        setToken(x);
    });

    return (
        <div>
            <p>{token}</p>
            <h1>{user.name}</h1>
        </div>
    );
}