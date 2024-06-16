const $ = document;
const addModalElem = $.querySelector("#add-new-course-modal");
const showAddModalBtn = $.querySelector(".courses-btn-add-new-course");

const addModalElemEdit = $.querySelector("#edit-modal");
const showAddModalBtnsEdit = $.querySelectorAll(".courses-btn-edit");
const editCourseForm = $.querySelector("#edit-course-form");

const showAddModel = () => addModalElem.classList.add("visible");
const hideAddModel = () => addModalElem.classList.remove("visible");

const showAddModelEdit = (event) => {
  const courseID = event.target.getAttribute("data-id");
  // const courseIdInput = $.querySelector("#course-id");
  // courseIdInput.value = courseId;
  addModalElemEdit.classList.add("visible");
  editCourseForm.action = `/courses/edit/${courseID}`;
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

document
  .getElementById("edit-course-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    let courseID = document
      .querySelector(".courses-btn-edit")
      .getAttribute("data-id");

    const name = document.getElementById("input1").value;
    const price = document.getElementById("input2").value;
    const teacher = document.getElementById("input3").value;

    const data = { name, price, teacher };

    await fetch(`http://localhost:3000/courses/edit/${courseID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      // .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        window.location.reload();
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  });
