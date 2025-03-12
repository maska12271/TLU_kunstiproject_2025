import { Link } from "react-router-dom";
import { useState } from "react";

function TestPageToLogin() {

    return (
        <div className={"testPageToLogin"}>
            <Link to="/login">LOGIN</Link>
            <Link to="/admin">ADMIN PAGE</Link>
        </div>
    );
}

export default TestPageToLogin;
