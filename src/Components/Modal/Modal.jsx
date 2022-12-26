import React from "react";
import { useNavigate } from "react-router-dom";
import "./Modal.css";

export const Modal = ({ children, isOpen, toggleModal }) => {
  const navigate = useNavigate();
  return (
    <>
      {isOpen && (
        <div
          className="modal"
          onClick={(e) => {
            if (!e.target.classList.contains("modal")) return;
            navigate("/home/*");
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
