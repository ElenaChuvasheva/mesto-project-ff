const handleEsc = (event) => {
  if (event.key === "Escape") {
    closeModal(document.querySelector(".popup_is-opened"));
  }
};

const handleOverlayClick = (event) => {
  if (event.target.classList.contains("popup")) {
    closeModal(event.target);
  }
};

const openModal = (modalEl) => {
  modalEl.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEsc);
};

const closeModal = (modalEl) => {
  modalEl.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEsc);
};

export { closeModal, handleOverlayClick, openModal };
