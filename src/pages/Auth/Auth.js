import React, { useState } from "react";
import LoginLogo from '../../assets/images/SVG/P-letter.svg';
import "./Auth.scss";
import LoginForm from "../../components/Auth/LoginForm";

function Auth() {

    return (
        <div className="auth">
            <div className="container-form">
                <LoginForm />
            </div>
        </div>  


    );
}

export default Auth;