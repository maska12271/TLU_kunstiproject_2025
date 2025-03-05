import config from "../config.js";
import {Link} from "react-router-dom";
import '/src/CSSFiles/AdminPanelPage.scss'
import AddUserModal from "./Modals/AddUserModal.jsx";
import { useState } from "react";
import AddProjectModal from "./Modals/AddProjectModal.jsx";
import img from '/img.png';
import EditUserModal from "./Modals/EditUserModal.jsx";
import AddPostToProjectModalMainPhoto from "./Modals/AddPostToProjectModalMainPhoto.jsx";

function AdminPanelPage() {
    const [showAddUserModal, setShowAddUserModal] = useState(false)
    const [showEditUserModal, setShowEditUserModal] = useState(false)
    const [showAddProjectModal, setShowAddProjectModal] = useState(false)
    const [showAddPostToProjectModalMainPhoto, setShowAddPostToProjectModalMainPhoto] = useState(false)
    const [openedEditUserData, setOpenedEditUserData] = useState({})

  return (
    <div className={"adminPanelPage"}>
      <div className="adminPanelPageTitle">Töölaud</div>

            <div className="users">
                <div className="usersTitle">Kasutajad</div>
                <button className="usersAddButton addButton" onClick={() => setShowAddUserModal(true)}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.00016 1.33325V10.6666M1.3335 5.99992H10.6668" stroke="#F5F5F5" stroke-width="1.6"
                              stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <div className={"text"}>Lisa kasutaja</div>
                </button>
                <div className="usersBody">
                    <table className="usersTable">
                        <thead>
                        <tr>
                            <th>Nimi</th>
                            <th>Roll</th>
                            <th>Postitusi</th>
                            <th>Project</th>
                            <th>Kasutajanimi</th>
                            <th>Parool</th>
                            <th>Toimingud</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Karl</td>
                            <td>Kasutaja</td>
                            <td>6</td>
                            <td>Lillede project</td>
                            <td className={"showNickname"}>Näita kasutajanime</td>
                            <td className={"showPass"}>Näita parooli</td>
                            <td className={"actions"}>
                                <svg onClick={() => setShowEditUserModal(true)} width="16" height="16" viewBox="0 0 16 16" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M7.76172 2.66665H3.09505C2.74143 2.66665 2.40229 2.80713 2.15224 3.05718C1.90219 3.30723 1.76172 3.64637 1.76172 3.99999V13.3333C1.76172 13.6869 1.90219 14.0261 2.15224 14.2761C2.40229 14.5262 2.74143 14.6667 3.09505 14.6667H12.4284C12.782 14.6667 13.1211 14.5262 13.3712 14.2761C13.6212 14.0261 13.7617 13.6869 13.7617 13.3333V8.66665M12.7617 1.66665C13.0269 1.40144 13.3866 1.25244 13.7617 1.25244C14.1368 1.25244 14.4965 1.40144 14.7617 1.66665C15.0269 1.93187 15.1759 2.29158 15.1759 2.66665C15.1759 3.04173 15.0269 3.40144 14.7617 3.66665L8.42838 9.99999L5.76172 10.6667L6.42839 7.99999L12.7617 1.66665Z"
                                        stroke="#1E1E1E" stroke-width="1.6" stroke-linecap="round"
                                        stroke-linejoin="round"/>
                                </svg>
                                <svg width="15" height="16" viewBox="0 0 15 16" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M1.42871 3.99992H2.76204M2.76204 3.99992H13.4287M2.76204 3.99992L2.76204 13.3333C2.76204 13.6869 2.90252 14.026 3.15257 14.2761C3.40262 14.5261 3.74176 14.6666 4.09538 14.6666H10.762C11.1157 14.6666 11.4548 14.5261 11.7049 14.2761C11.9549 14.026 12.0954 13.6869 12.0954 13.3333V3.99992M4.76204 3.99992V2.66659C4.76204 2.31296 4.90252 1.97382 5.15257 1.72378C5.40262 1.47373 5.74176 1.33325 6.09538 1.33325H8.76204C9.11567 1.33325 9.4548 1.47373 9.70485 1.72378C9.9549 1.97382 10.0954 2.31296 10.0954 2.66659V3.99992M6.09538 7.33325V11.3333M8.76204 7.33325V11.3333"
                                        stroke="#1E1E1E" stroke-width="1.6" stroke-linecap="round"
                                        stroke-linejoin="round"/>
                                </svg>
                            </td>
                        </tr>
                        </tbody>

                    </table>
                </div>
            </div>

            <div className={"posts"}>
                <div className="postsTitle">Viimased postitused</div>
                <button className="postsAddButton addButton" onClick={() => setShowAddProjectModal(true)}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.00016 1.33325V10.6666M1.3335 5.99992H10.6668" stroke="#F5F5F5" stroke-width="1.6"
                              stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <div className={"text"}>Lisa postitus</div>
                </button>
                <div className={"postsTabsLinks"}>
                    <div className={"postsTabsLink active"}>Kõik postitused</div>
                    <div className={"postsTabsLink"}>Projekt1</div>
                    <div className={"postsTabsLink"}>Projekt2</div>
                </div>
                <div className="postsBody">
                    <div className={"postDiv"}>
                        <img src={img} alt="Description"/>
                        <div className={"postFooter"}>
                            <div className={"titleAndSubtitle"}>
                                <div className={"title"}>Postituse tiitel</div>
                                <div className={"subTitle"}>Projekt</div>
                            </div>
                            <div className={"actions"}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M7.76172 2.66665H3.09505C2.74143 2.66665 2.40229 2.80713 2.15224 3.05718C1.90219 3.30723 1.76172 3.64637 1.76172 3.99999V13.3333C1.76172 13.6869 1.90219 14.0261 2.15224 14.2761C2.40229 14.5262 2.74143 14.6667 3.09505 14.6667H12.4284C12.782 14.6667 13.1211 14.5262 13.3712 14.2761C13.6212 14.0261 13.7617 13.6869 13.7617 13.3333V8.66665M12.7617 1.66665C13.0269 1.40144 13.3866 1.25244 13.7617 1.25244C14.1368 1.25244 14.4965 1.40144 14.7617 1.66665C15.0269 1.93187 15.1759 2.29158 15.1759 2.66665C15.1759 3.04173 15.0269 3.40144 14.7617 3.66665L8.42838 9.99999L5.76172 10.6667L6.42839 7.99999L12.7617 1.66665Z"
                                        stroke="#1E1E1E" stroke-width="1.6" stroke-linecap="round"
                                        stroke-linejoin="round"/>
                                </svg>
                                <svg width="15" height="16" viewBox="0 0 15 16" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M1.42871 3.99992H2.76204M2.76204 3.99992H13.4287M2.76204 3.99992L2.76204 13.3333C2.76204 13.6869 2.90252 14.026 3.15257 14.2761C3.40262 14.5261 3.74176 14.6666 4.09538 14.6666H10.762C11.1157 14.6666 11.4548 14.5261 11.7049 14.2761C11.9549 14.026 12.0954 13.6869 12.0954 13.3333V3.99992M4.76204 3.99992V2.66659C4.76204 2.31296 4.90252 1.97382 5.15257 1.72378C5.40262 1.47373 5.74176 1.33325 6.09538 1.33325H8.76204C9.11567 1.33325 9.4548 1.47373 9.70485 1.72378C9.9549 1.97382 10.0954 2.31296 10.0954 2.66659V3.99992M6.09538 7.33325V11.3333M8.76204 7.33325V11.3333"
                                        stroke="#1E1E1E" stroke-width="1.6" stroke-linecap="round"
                                        stroke-linejoin="round"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/*//delete*/}
                    <div className={"postDiv"}>
                        <img src={img} alt="Description"/>
                        <div className={"postFooter"}>
                            <div className={"titleAndSubtitle"}>
                                <div className={"title"}>Postituse tiitel</div>
                                <div className={"subTitle"}>Projekt</div>
                            </div>
                            <div className={"actions"}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M7.76172 2.66665H3.09505C2.74143 2.66665 2.40229 2.80713 2.15224 3.05718C1.90219 3.30723 1.76172 3.64637 1.76172 3.99999V13.3333C1.76172 13.6869 1.90219 14.0261 2.15224 14.2761C2.40229 14.5262 2.74143 14.6667 3.09505 14.6667H12.4284C12.782 14.6667 13.1211 14.5262 13.3712 14.2761C13.6212 14.0261 13.7617 13.6869 13.7617 13.3333V8.66665M12.7617 1.66665C13.0269 1.40144 13.3866 1.25244 13.7617 1.25244C14.1368 1.25244 14.4965 1.40144 14.7617 1.66665C15.0269 1.93187 15.1759 2.29158 15.1759 2.66665C15.1759 3.04173 15.0269 3.40144 14.7617 3.66665L8.42838 9.99999L5.76172 10.6667L6.42839 7.99999L12.7617 1.66665Z"
                                        stroke="#1E1E1E" stroke-width="1.6" stroke-linecap="round"
                                        stroke-linejoin="round"/>
                                </svg>
                                <svg width="15" height="16" viewBox="0 0 15 16" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M1.42871 3.99992H2.76204M2.76204 3.99992H13.4287M2.76204 3.99992L2.76204 13.3333C2.76204 13.6869 2.90252 14.026 3.15257 14.2761C3.40262 14.5261 3.74176 14.6666 4.09538 14.6666H10.762C11.1157 14.6666 11.4548 14.5261 11.7049 14.2761C11.9549 14.026 12.0954 13.6869 12.0954 13.3333V3.99992M4.76204 3.99992V2.66659C4.76204 2.31296 4.90252 1.97382 5.15257 1.72378C5.40262 1.47373 5.74176 1.33325 6.09538 1.33325H8.76204C9.11567 1.33325 9.4548 1.47373 9.70485 1.72378C9.9549 1.97382 10.0954 2.31296 10.0954 2.66659V3.99992M6.09538 7.33325V11.3333M8.76204 7.33325V11.3333"
                                        stroke="#1E1E1E" stroke-width="1.6" stroke-linecap="round"
                                        stroke-linejoin="round"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className={"postDiv"}>
                        <img src={img} alt="Description"/>
                        <div className={"postFooter"}>
                            <div className={"titleAndSubtitle"}>
                                <div className={"title"}>Postituse tiitel</div>
                                <div className={"subTitle"}>Projekt</div>
                            </div>
                            <div className={"actions"}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M7.76172 2.66665H3.09505C2.74143 2.66665 2.40229 2.80713 2.15224 3.05718C1.90219 3.30723 1.76172 3.64637 1.76172 3.99999V13.3333C1.76172 13.6869 1.90219 14.0261 2.15224 14.2761C2.40229 14.5262 2.74143 14.6667 3.09505 14.6667H12.4284C12.782 14.6667 13.1211 14.5262 13.3712 14.2761C13.6212 14.0261 13.7617 13.6869 13.7617 13.3333V8.66665M12.7617 1.66665C13.0269 1.40144 13.3866 1.25244 13.7617 1.25244C14.1368 1.25244 14.4965 1.40144 14.7617 1.66665C15.0269 1.93187 15.1759 2.29158 15.1759 2.66665C15.1759 3.04173 15.0269 3.40144 14.7617 3.66665L8.42838 9.99999L5.76172 10.6667L6.42839 7.99999L12.7617 1.66665Z"
                                        stroke="#1E1E1E" stroke-width="1.6" stroke-linecap="round"
                                        stroke-linejoin="round"/>
                                </svg>
                                <svg width="15" height="16" viewBox="0 0 15 16" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M1.42871 3.99992H2.76204M2.76204 3.99992H13.4287M2.76204 3.99992L2.76204 13.3333C2.76204 13.6869 2.90252 14.026 3.15257 14.2761C3.40262 14.5261 3.74176 14.6666 4.09538 14.6666H10.762C11.1157 14.6666 11.4548 14.5261 11.7049 14.2761C11.9549 14.026 12.0954 13.6869 12.0954 13.3333V3.99992M4.76204 3.99992V2.66659C4.76204 2.31296 4.90252 1.97382 5.15257 1.72378C5.40262 1.47373 5.74176 1.33325 6.09538 1.33325H8.76204C9.11567 1.33325 9.4548 1.47373 9.70485 1.72378C9.9549 1.97382 10.0954 2.31296 10.0954 2.66659V3.99992M6.09538 7.33325V11.3333M8.76204 7.33325V11.3333"
                                        stroke="#1E1E1E" stroke-width="1.6" stroke-linecap="round"
                                        stroke-linejoin="round"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className={"postDiv"}>
                        <img src={img} alt="Description"/>
                        <div className={"postFooter"}>
                            <div className={"titleAndSubtitle"}>
                                <div className={"title"}>Postituse tiitel</div>
                                <div className={"subTitle"}>Projekt</div>
                            </div>
                            <div className={"actions"}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M7.76172 2.66665H3.09505C2.74143 2.66665 2.40229 2.80713 2.15224 3.05718C1.90219 3.30723 1.76172 3.64637 1.76172 3.99999V13.3333C1.76172 13.6869 1.90219 14.0261 2.15224 14.2761C2.40229 14.5262 2.74143 14.6667 3.09505 14.6667H12.4284C12.782 14.6667 13.1211 14.5262 13.3712 14.2761C13.6212 14.0261 13.7617 13.6869 13.7617 13.3333V8.66665M12.7617 1.66665C13.0269 1.40144 13.3866 1.25244 13.7617 1.25244C14.1368 1.25244 14.4965 1.40144 14.7617 1.66665C15.0269 1.93187 15.1759 2.29158 15.1759 2.66665C15.1759 3.04173 15.0269 3.40144 14.7617 3.66665L8.42838 9.99999L5.76172 10.6667L6.42839 7.99999L12.7617 1.66665Z"
                                        stroke="#1E1E1E" stroke-width="1.6" stroke-linecap="round"
                                        stroke-linejoin="round"/>
                                </svg>
                                <svg width="15" height="16" viewBox="0 0 15 16" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M1.42871 3.99992H2.76204M2.76204 3.99992H13.4287M2.76204 3.99992L2.76204 13.3333C2.76204 13.6869 2.90252 14.026 3.15257 14.2761C3.40262 14.5261 3.74176 14.6666 4.09538 14.6666H10.762C11.1157 14.6666 11.4548 14.5261 11.7049 14.2761C11.9549 14.026 12.0954 13.6869 12.0954 13.3333V3.99992M4.76204 3.99992V2.66659C4.76204 2.31296 4.90252 1.97382 5.15257 1.72378C5.40262 1.47373 5.74176 1.33325 6.09538 1.33325H8.76204C9.11567 1.33325 9.4548 1.47373 9.70485 1.72378C9.9549 1.97382 10.0954 2.31296 10.0954 2.66659V3.99992M6.09538 7.33325V11.3333M8.76204 7.33325V11.3333"
                                        stroke="#1E1E1E" stroke-width="1.6" stroke-linecap="round"
                                        stroke-linejoin="round"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className={"postDiv"}>
                        <img src={img} alt="Description"/>
                        <div className={"postFooter"}>
                            <div className={"titleAndSubtitle"}>
                                <div className={"title"}>Postituse tiitel</div>
                                <div className={"subTitle"}>Projekt</div>
                            </div>
                            <div className={"actions"}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M7.76172 2.66665H3.09505C2.74143 2.66665 2.40229 2.80713 2.15224 3.05718C1.90219 3.30723 1.76172 3.64637 1.76172 3.99999V13.3333C1.76172 13.6869 1.90219 14.0261 2.15224 14.2761C2.40229 14.5262 2.74143 14.6667 3.09505 14.6667H12.4284C12.782 14.6667 13.1211 14.5262 13.3712 14.2761C13.6212 14.0261 13.7617 13.6869 13.7617 13.3333V8.66665M12.7617 1.66665C13.0269 1.40144 13.3866 1.25244 13.7617 1.25244C14.1368 1.25244 14.4965 1.40144 14.7617 1.66665C15.0269 1.93187 15.1759 2.29158 15.1759 2.66665C15.1759 3.04173 15.0269 3.40144 14.7617 3.66665L8.42838 9.99999L5.76172 10.6667L6.42839 7.99999L12.7617 1.66665Z"
                                        stroke="#1E1E1E" stroke-width="1.6" stroke-linecap="round"
                                        stroke-linejoin="round"/>
                                </svg>
                                <svg width="15" height="16" viewBox="0 0 15 16" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M1.42871 3.99992H2.76204M2.76204 3.99992H13.4287M2.76204 3.99992L2.76204 13.3333C2.76204 13.6869 2.90252 14.026 3.15257 14.2761C3.40262 14.5261 3.74176 14.6666 4.09538 14.6666H10.762C11.1157 14.6666 11.4548 14.5261 11.7049 14.2761C11.9549 14.026 12.0954 13.6869 12.0954 13.3333V3.99992M4.76204 3.99992V2.66659C4.76204 2.31296 4.90252 1.97382 5.15257 1.72378C5.40262 1.47373 5.74176 1.33325 6.09538 1.33325H8.76204C9.11567 1.33325 9.4548 1.47373 9.70485 1.72378C9.9549 1.97382 10.0954 2.31296 10.0954 2.66659V3.99992M6.09538 7.33325V11.3333M8.76204 7.33325V11.3333"
                                        stroke="#1E1E1E" stroke-width="1.6" stroke-linecap="round"
                                        stroke-linejoin="round"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className={"postDiv"}>
                        <img src={img} alt="Description"/>
                        <div className={"postFooter"}>
                            <div className={"titleAndSubtitle"}>
                                <div className={"title"}>Postituse tiitel</div>
                                <div className={"subTitle"}>Projekt</div>
                            </div>
                            <div className={"actions"}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M7.76172 2.66665H3.09505C2.74143 2.66665 2.40229 2.80713 2.15224 3.05718C1.90219 3.30723 1.76172 3.64637 1.76172 3.99999V13.3333C1.76172 13.6869 1.90219 14.0261 2.15224 14.2761C2.40229 14.5262 2.74143 14.6667 3.09505 14.6667H12.4284C12.782 14.6667 13.1211 14.5262 13.3712 14.2761C13.6212 14.0261 13.7617 13.6869 13.7617 13.3333V8.66665M12.7617 1.66665C13.0269 1.40144 13.3866 1.25244 13.7617 1.25244C14.1368 1.25244 14.4965 1.40144 14.7617 1.66665C15.0269 1.93187 15.1759 2.29158 15.1759 2.66665C15.1759 3.04173 15.0269 3.40144 14.7617 3.66665L8.42838 9.99999L5.76172 10.6667L6.42839 7.99999L12.7617 1.66665Z"
                                        stroke="#1E1E1E" stroke-width="1.6" stroke-linecap="round"
                                        stroke-linejoin="round"/>
                                </svg>
                                <svg width="15" height="16" viewBox="0 0 15 16" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M1.42871 3.99992H2.76204M2.76204 3.99992H13.4287M2.76204 3.99992L2.76204 13.3333C2.76204 13.6869 2.90252 14.026 3.15257 14.2761C3.40262 14.5261 3.74176 14.6666 4.09538 14.6666H10.762C11.1157 14.6666 11.4548 14.5261 11.7049 14.2761C11.9549 14.026 12.0954 13.6869 12.0954 13.3333V3.99992M4.76204 3.99992V2.66659C4.76204 2.31296 4.90252 1.97382 5.15257 1.72378C5.40262 1.47373 5.74176 1.33325 6.09538 1.33325H8.76204C9.11567 1.33325 9.4548 1.47373 9.70485 1.72378C9.9549 1.97382 10.0954 2.31296 10.0954 2.66659V3.99992M6.09538 7.33325V11.3333M8.76204 7.33325V11.3333"
                                        stroke="#1E1E1E" stroke-width="1.6" stroke-linecap="round"
                                        stroke-linejoin="round"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showAddUserModal && <AddUserModal setShowAddUserModal={setShowAddUserModal}/>}
            {showEditUserModal && <EditUserModal setShowEditUserModal={setShowEditUserModal} userData={openedEditUserData}/>}
            {showAddProjectModal && <AddProjectModal setShowAddProjectModal={setShowAddProjectModal} setShowAddPostToProjectModalMainPhoto={setShowAddPostToProjectModalMainPhoto}/>}
            {showAddPostToProjectModalMainPhoto && <AddPostToProjectModalMainPhoto setShowAddPostToProjectModalMainPhoto={setShowAddPostToProjectModalMainPhoto} />}
        </div>
    )
}

export default AdminPanelPage;
