import config from "../../config.js";
import { Link } from "react-router-dom";
import "/src/CSSFiles/AddPostModal.scss";
import { useState } from "react";

function EditUserModal({ setShowAddPostToProjectModalMainPhoto }) {
  const [closed, setClosed] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  function closeModal() {
    setClosed(true);
    setTimeout(() => {
      setShowAddPostToProjectModalMainPhoto(false);
    }, "300");
  }

  function openNextModal() {
    setShowAddPostToProjectModalMainPhoto(false);
    // setShowAddProjectModal(false)
  }

  function handleChangeImg(e) {
    console.log(e.target.files);
    setSelectedImage(URL.createObjectURL(e.target.files[0]));
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

        <div className={"modalWindowBody"}>
          <div className={"modalTitle"}>Postituse lisamine</div>
          <div className={"modalDescription"}>Lisa peamine pilt siia</div>
          <label className={"fileUploadDiv"}>
            <input type="file" accept="image/*" onChange={handleChangeImg} />
            {selectedImage ? (
              <img src={selectedImage} />
            ) : (
              <>
                <svg
                  width="49"
                  height="49"
                  viewBox="0 0 49 49"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.0977 42.9802H38.0977C40.3068 42.9802 42.0977 41.1894 42.0977 38.9802V10.9802C42.0977 8.77109 40.3068 6.98022 38.0977 6.98022H10.0977C7.88852 6.98022 6.09766 8.77109 6.09766 10.9802V38.9802C6.09766 41.1894 7.88852 42.9802 10.0977 42.9802ZM10.0977 42.9802L32.0977 20.9802L42.0977 30.9802M20.0977 17.9802C20.0977 19.6371 18.7545 20.9802 17.0977 20.9802C15.4408 20.9802 14.0977 19.6371 14.0977 17.9802C14.0977 16.3234 15.4408 14.9802 17.0977 14.9802C18.7545 14.9802 20.0977 16.3234 20.0977 17.9802Z"
                    stroke="#1E1E1E"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p>Lae üles peamine pilt</p>
              </>
            )}
          </label>
        </div>

        <button className={"modalNextButton"} onClick={() => openNextModal()}>
          Edasi
        </button>
      </div>
    </div>
  );
}

export default EditUserModal;
