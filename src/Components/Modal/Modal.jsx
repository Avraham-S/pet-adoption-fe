import React from "react";
import "./Modal.css";

export const Modal = ({ children, isOpen, toggleModal }) => {
  return (
    <>
      {isOpen && (
        <div
          className="modal"
          onClick={(e) => {
            if (!e.target.classList.contains("modal")) return;
            toggleModal();
          }}
        >
          <div className="modal-content">
            <button onClick={toggleModal}>X</button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};
