import { useAuth0 } from "@auth0/auth0-react"

export const Profile = () => {
    const { user } = useAuth0();

    return (
        <div>
            <h1>{user.name}</h1>
        </div>
    );
}