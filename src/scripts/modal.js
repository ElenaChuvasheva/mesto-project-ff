const escHandler = (event) => {
  if (event.key === "Escape") {
    const modal = document.querySelector(".popup_is-opened");
    closeModal(modal);
  }
};

const openModal = (modalEl) => {
  modalEl.classList.add("popup_is-opened");
  document.addEventListener("keydown", escHandler);
};

const closeModal = (modalEl) => {
  modalEl.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", escHandler);
};

const openFormPopupClassesObj = {
  ".profile__add-button": ".popup_type_new-card",
  ".profile__edit-button": ".popup_type_edit",
};

const openPopupClassesObj = Object.assign(
  { ".card__image": ".popup_type_image" },
  openFormPopupClassesObj
);

export { closeModal, openFormPopupClassesObj, openModal, openPopupClassesObj };
