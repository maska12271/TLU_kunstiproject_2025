import "../../CSSFiles/Modals.scss";
import { useState } from "react";

function AddProjectModal({
  // eslint-disable-next-line react/prop-types
  setShowAddProjectModal,
  // eslint-disable-next-line react/prop-types
  setShowAddPostToProjectModalMainPhoto,
}) {
  const [closed, setClosed] = useState(false);

  function closeModal() {
    setClosed(true);
    setTimeout(() => {
      setShowAddProjectModal(false);
    }, "300");
  }

  function openNextModal() {
    setShowAddPostToProjectModalMainPhoto(true);
    setShowAddProjectModal(false);
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

        <div className={"modalTitle"}>Postituse lisamine</div>
        <div className={"modalForm"}>
          <div className={"selectorDiv"}>
            <div className={"title"}>Project</div>
            <div className={"subTitle"}>
              Millisesse projekti postitus lisada?
            </div>
            <select name="projects" id="projects-select">
              <option value="">Vali projekt</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
            </select>
          </div>
          <button
            className={"modalSubmitButton"}
            onClick={() => openNextModal()}
          >
            Lisa kasutaja
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddProjectModal;
