import config from "../Config.js";
import {Link, Outlet} from "react-router-dom";
import '/src/CSSFiles/MainLayout.scss'
import AdminPanelPage from "./AdminPanelPage.jsx";
import React from "react";

function MainLayout() {
    const sidebarRef = React.useRef(null);

    return (
        <div className={"mainLayout"}>
            <div className={"sidenav"} ref={sidebarRef} >
                <div className={"sidenavHeader"}>
                    <div className={"sidenavTitle"}>TLÜ x PALLAS</div>
                    <Link className={"sidenavHeaderLink"} to={"/"}>
                        <div className={"text"}>Mine veebilehele</div>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 8.66667V12.6667C12 13.0203 11.8595 13.3594 11.6095 13.6095C11.3594 13.8595 11.0203 14 10.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V5.33333C2 4.97971 2.14048 4.64057 2.39052 4.39052C2.64057 4.14048 2.97971 4 3.33333 4H7.33333M10 2H14M14 2V6M14 2L6.66667 9.33333"
                                stroke="black" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </Link>
                </div>

                <div className={"sidenavPageName"}>Töölaud</div>

                <div className={"sidenavProjects"}>
                    <div className={"sidenavProjectsTitle"}>Projektid</div>
                    <div className={"sidenavProjectsName"}>Lillede projekt</div>
                </div>
            </div>
            <div className={"mainContent"}>
                <div className={"header"}>
                    <Link className={"myAccount"} to={"/"}>
                        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M14.6663 16V14.3333C14.6663 13.4493 14.3152 12.6014 13.69 11.9763C13.0649 11.3512 12.2171 11 11.333 11H4.66634C3.78229 11 2.93444 11.3512 2.30932 11.9763C1.6842 12.6014 1.33301 13.4493 1.33301 14.3333V16M11.333 4.33333C11.333 6.17428 9.84062 7.66667 7.99967 7.66667C6.15873 7.66667 4.66634 6.17428 4.66634 4.33333C4.66634 2.49238 6.15873 1 7.99967 1C9.84062 1 11.333 2.49238 11.333 4.33333Z"
                                stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <div className={"text"}>Minu kasutaja</div>
                    </Link>
                </div>
                <AdminPanelPage/>
            </div>
        </div>
    )
}

export default MainLayout
