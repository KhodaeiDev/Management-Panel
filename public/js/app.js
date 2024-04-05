const $ = document;
const addModalElem = $.querySelector("#add-new-course-modal");
const showAddModalBtn = $.querySelector(".courses-btn-add-new-course");

const showAddModel = () => addModalElem.classList.add("visible");
const hideAddModel = () => addModalElem.classList.remove("visible");

showAddModalBtn.addEventListener("click", showAddModel);

window.addEventListener("keydown", (event) => {
  if (event.keyCode === 27) {
    hideAddModel();
  }
});
