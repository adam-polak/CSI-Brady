import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom"
import { Button } from "reactstrap";

export const ForceLogin = ({redirectRoute}) => {
    const { isAuthenticated, loginWithRedirect, isLoading, user } = useAuth0();
    const nav = useNavigate();

    if(user || isAuthenticated) {
        nav(redirectRoute);
    } else if(!isLoading) {
        loginWithRedirect();
    }

    return (
        <div className="text-center bg-grey" style={{height: "94vh"}}>
            <Button 
                color="primary" 
                onClick={() => loginWithRedirect()}
                className="mt-5"
                size="lg"
            >
                Log In
            </Button>
        </div>
    );
}