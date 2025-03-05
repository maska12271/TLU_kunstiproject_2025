import config from "../config.js";
import { Link } from "react-router-dom";
import "/src/CSSFiles/Authorization.scss";
import { useState } from "react";

function LoginPage() {
  const [showAddUserModal, setShowAddUserModal] = useState(false);

  return (
    <div className={"authorizationPage"}>
      <div className={"pageTitles"}>
        <div className={"pageTitle"}>TLÜ x PALLAS</div>
        <div className={"pageSubtitle"}>Admin</div>
      </div>
      <div className={"formCard"}>
        <div className={"cardTitle"}>Sisse logimine</div>
        <div className={"cardForm"}>
          <div className={"inputDiv"}>
            <div className={"title"}>Email</div>
            <input placeholder={"Email"} />
          </div>
          <div className={"inputDiv"}>
            <div className={"title"}>Password</div>
            <input type={"password"} placeholder={"Password"} />
          </div>
          <button className={"modalSubmitButton"}>Lisa kasutaja</button>
          <Link to={"/registration"} className={"link"}>
            Registreeru
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
