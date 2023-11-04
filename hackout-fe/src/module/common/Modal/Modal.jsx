import React, { useState, useEffect } from "react";
import { StyledDialog } from "./Modal.styles";

export function Modal({ isOpen, setIsOpen, onClose, className, children }) {
  const [isModalOpen, setModalOpen] = useState(isOpen);

  const handleCloseModal = () => {
    if (onClose) {
      onClose();
    }
    setIsOpen(false);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      handleCloseModal();
    }
  };

  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  return (
    <StyledDialog
      onKeyDown={handleKeyDown}
      open={isModalOpen}
      className={className}
    >
      <div className="modal">{children}</div>
    </StyledDialog>
  );
}
