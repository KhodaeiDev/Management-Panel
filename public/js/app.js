const $ = document;
const addModalElem = $.querySelector("#add-new-course-modal");
const showAddModalBtn = $.querySelector(".courses-btn-add-new-course");

const addModalElemEdit = $.querySelector("#edit-modal");
const showAddModalBtnsEdit = $.querySelectorAll(".courses-btn-edit");
const editCourseForm = $.querySelector("#edit-course-form");

const showAddModel = () => addModalElem.classList.add("visible");
const hideAddModel = () => addModalElem.classList.remove("visible");

const showAddModelEdit = (event) => {
  const courseId = event.target.getAttribute("data-id");
  const courseIdInput = $.querySelector("#course-id");
  courseIdInput.value = courseId;
  addModalElemEdit.classList.add("visible");
  editCourseForm.action = `/courses/edit/${courseId}`;
};

const hideAddModelEdit = () => addModalElemEdit.classList.remove("visible");

showAddModalBtn.addEventListener("click", showAddModel);

showAddModalBtnsEdit.forEach((btn) => {
  btn.addEventListener("click", showAddModelEdit);
});

window.addEventListener("keydown", (event) => {
  if (event.keyCode === 27) {
    hideAddModel();
    hideAddModelEdit();
  }
});
