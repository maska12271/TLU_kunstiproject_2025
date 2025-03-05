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
        <div className={"closePage"}>
          <Link to={"/login"} className={"closePageButton"}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.4 14L0 12.6L5.6 7L0 1.4L1.4 0L7 5.6L12.6 0L14 1.4L8.4 7L14 12.6L12.6 14L7 8.4L1.4 14Z"
                fill="#1D1B20"
              />
            </svg>
          </Link>
        </div>
        <div className={"cardTitle"}>Sisse logimine</div>
        <div className={"cardForm"}>
          <div className={"inputDiv"}>
            <div className={"title"}>Nimi</div>
            <input placeholder={"Nimi"} />
          </div>
          <div className={"inputDiv"}>
            <div className={"title"}>Email</div>
            <input placeholder={"Email"} />
          </div>
          <div className={"selectorDiv"}>
            <div className={"title"}>Osaleb projektis</div>
            <select name="projects" id="projects-select">
              <option value="">Vali projekt</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
            </select>
          </div>
          <button className={"modalSubmitButton"}>
            Saada registreerumistaotlus
          </button>
          <div className={"description"}>
            Sinu taotluse võtab vastu veebilehe administraator ning saadab sulle
            sisselogimise parooli.
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
