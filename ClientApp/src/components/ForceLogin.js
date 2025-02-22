import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom"
import { Alert, Button } from "reactstrap";

export const ForceLogin = ({redirectRoute}) => {
    const { isAuthenticated, loginWithRedirect, isLoading, user } = useAuth0();
    const nav = useNavigate();

    if(user || isAuthenticated) {
        nav(redirectRoute);
    } else if(!isLoading) {
        loginWithRedirect();
    }

    return (
        <div className="text-center">
            <Alert color="info">
                If you are not automatically redirected to login, click the button below to sign in.
            </Alert>
            <Button 
                color="primary" 
                onClick={() => loginWithRedirect()}
                className="mt-3"
                size="lg"
            >
                Log In
            </Button>
        </div>
    );
}