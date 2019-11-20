import React from "react";
import "./Navigation.css";

const Navigation = ({isSignedIn, onClick}) => {
    if (isSignedIn) {
        return (
            <nav className="user">
                <p className="link underline pa3 dim f3 black" onClick={() => onClick("signin")} >Sign Out</p>
            </nav>
        );
    } else {
        return (
            <nav className="user">
                <p className="link underline pa3 dim f3 black" onClick={() => onClick("register")} >Register</p>
                <p className="link underline pa3 dim f3 black" onClick={() => onClick("signin")} >Sign In</p>
            </nav>
        );
    }
}

export default Navigation;