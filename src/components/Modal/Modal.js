import { Div, DivModal } from "./Modal.styled";
import propTypes from "prop-types";
import { useEffect } from "react";

export default function Modal({ selectedImage, tags, onClose }) {
  const preventScroll = (e) => {
    e.preventDefault();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (press) => {
      if (press.code === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
    };
  }, [onClose]);

  return (
    <Div onClick={handleBackdropClick}>
      <DivModal>
        <img src={selectedImage} alt={tags} />
      </DivModal>
    </Div>
  );
}

Modal.propTypes = {
  selectedImage: propTypes.string.isRequired,
  tags: propTypes.string.isRequired,
  onClose: propTypes.func.isRequired,
};
