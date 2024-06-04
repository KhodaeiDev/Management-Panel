const $ = document;
const addModalElem = $.querySelector("#add-new-course-modal");
const showAddModalBtn = $.querySelector(".courses-btn-add-new-course ");

const showAddModel = () => addModalElem.classList.add("visible");
const hideAddModel = () => addModalElem.classList.remove("visible");

const addModalElemEdit = $.querySelector(" #edit-modal");
const showAddModalBtnEdit = $.querySelector(".courses-btn-edit");

const showAddModelEdit = () => addModalElemEdit.classList.add("visible");
const hideAddModelEdit = () => addModalElemEdit.classList.remove("visible");

showAddModalBtn.addEventListener("click", showAddModel);
showAddModalBtnEdit.addEventListener("click", showAddModelEdit);

window.addEventListener("keydown", (event) => {
  if (event.keyCode === 27) {
    hideAddModel();
    hideAddModelEdit();
  }
});
