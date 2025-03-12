import config from "../../config.js";
import {Link} from "react-router-dom";
import '/src/CSSFiles/Modals.scss'
import {useMutation, useQuery} from "@tanstack/react-query";
import { useTRPC } from "../../utils/trpc.js";
import "../../CSSFiles/Modals.scss";
import {useEffect, useState} from "react";

function AddUserModal({ setShowAddUserModal, allProjects }) {
    const trpc = useTRPC();

    const [closed, setClosed] = useState(false);
    const [name, setName] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [projectId, setProjectId] = useState(null);

    const createUserMutation = useMutation(trpc.user.create.mutationOptions(
        {
            onSuccess: (data) => {
                closeModal();
            },
            onError: (err) => {
                console.log(err);
            }
        }
    ));

    const handleCreateUser = () => {
        createUserMutation.mutate({
            name: name,
            isAdmin: isAdmin,
            projectId: projectId,
        });
    };

  function closeModal() {
    setClosed(true);
    setTimeout(() => {
      setShowAddUserModal(false);
    }, "300");
  }

  return (
    <div
      className={closed ? "modalBackground closing" : "modalBackground"}
      onClick={() => closeModal()}
    >
        <div className={"modalWindow"} onClick={(e) => e.stopPropagation()}>
            <div className={"closeModal"}>
                <button className={"closeModalButton"} onClick={() => closeModal()}>
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
                </button>
            </div>
            <div className={"modalTitle"}>Kasutaja lisamine</div>
            <div className={"modalForm"}>
                <div className={"inputDiv"}>
                    <div className={"title"}>Nimi</div>
                    <input placeholder={"Nimi"} required onChange={(e) => setName(e.target.value)} />
                </div>
                <div className={"inputDiv"}>
                    <div className={"title"}>Email</div>
                    <input placeholder={"Email"}/>
                </div>
                <div className={"selectorDiv"}>
                    <div className={"title"}>Osalus projektis</div>
                    <select name="projects" id="projects-select" required onChange={(e) => setProjectId(e.target.value)} >
                        <option value="">Vali projekt</option>
                        {allProjects.map((project) => {
                            return (
                                <option value={project.id}>{project.name}</option>
                            )
                        })}
                    </select>
                </div>
                <div className={"checkboxes"}>
                    <div className={"checkboxAndTitle"}>
                        <input type={"checkbox"} value={isAdmin.toString()} onChange={(e) => setIsAdmin(e.target.checked)} />
                        <div className={"title"}>Admin</div>
                    </div>
                    <div className={"subTitle"}>Lisa kasutaja adminina</div>
                </div>
                <button className={"modalSubmitButton"} onClick={() => handleCreateUser()}>Lisa kasutaja</button>
            </div>
            <div className={"modalFormFooter"}>Saada saadud info kasutajale</div>
        </div>
    </div>
  )
}

export default AddUserModal;
