const saveButton = document.querySelector("#saveButton");
const cancelButton = document.querySelector("#cancelButton");
const formHeading = document.querySelector(".form__heading");
const workerName = document.querySelector("#firstName");
const workerNameError = document.querySelector(".name__error-text");
const department = document.querySelector("#department");
const departmentError = document.querySelector(".department__error-text");

function getWorkers() {
  let workers;
  try {
    workers = JSON.parse(localStorage.getItem("myCompanyWorkers"));
  } catch {
    workers = null;
  }
  return workers;
}

function saveWorkers(workers) {
  const newStorageData = JSON.stringify(workers);
  try {
    localStorage.setItem("myCompanyWorkers", newStorageData);
  } catch {
    alert("Writing data to local storage failed!");
  }
}

function clearForm() {
  workerName.value = "";
  department.value = "choose";
  workerName.classList.remove("name__error");
  workerNameError.classList.add("hidden");
  department.classList.remove("department__error");
  departmentError.classList.add("hidden");
  cancelButton.classList.add("hidden");
  saveButton.textContent = "Add new worker";
  formHeading.textContent = "Add new worker";
  saveButton.removeAttribute("data-workerid");
}

function validateForm() {
  let isNameOk = false;
  let isDepartmentOk = false;
  if (!/\W|\d|\s+/gm.test(workerName.value) && workerName.value !== "") {
    isNameOk = true;
    workerName.classList.remove("name__error");
    workerNameError.classList.add("hidden");
  } else {
    workerName.classList.add("name__error");
    workerNameError.classList.remove("hidden");
  }
  if (department.value !== "choose") {
    department.classList.remove("department__error");
    departmentError.classList.add("hidden");
    isDepartmentOk = true;
  } else {
    department.classList.add("department__error");
    departmentError.classList.remove("hidden");
  }
  if (isNameOk && isDepartmentOk) {
    return true;
  } else return false;
}

function saveData(changingId) {
  let savedWorkers = getWorkers();
  if (changingId) {
    savedWorkers.find((el) => {
      if (el.id == changingId) {
        el.name = workerName.value;
        el.department = department.value;
        el.changeDate = new Date().toLocaleDateString();
      }
    });
  } else {
    const newWorker = {
      name: workerName.value,
      department: department.value,
      creationDate: new Date().toLocaleDateString(),
      changeDate: new Date().toLocaleDateString(),
    };
    if (savedWorkers !== null && savedWorkers.length > 0) {
      newWorker.id = savedWorkers[savedWorkers.length - 1].id + 1;
      savedWorkers.push(newWorker);
    } else {
      newWorker.id = 1;
      savedWorkers = [newWorker];
    }
  }
  saveWorkers(savedWorkers);
  buildWorkersTable();
}

function fillForm(changingId) {
  const tableData = getWorkers();
  tableData.find((el) => {
    const { name, department: departmentForChange, id } = el;
    if (id == changingId) {
      workerName.value = name;
      department.value = departmentForChange;
    }
  });
  saveButton.dataset.workerid = changingId;
  cancelButton.classList.remove("hidden");
  cancelButton.addEventListener("click", () => {
    clearForm();
  });
  saveButton.textContent = "Change worker info";
  formHeading.textContent = "Change worker info";
}

function deleteWorker(id) {
  const tableData = getWorkers();
  let isDelete = false;
  tableData.find((el) => {
    if (el.id == id) {
      isDelete = confirm(`Do you really want to delete ${el.name}?`);
    }
  });
  if (isDelete) {
    const changedWorkers = tableData.filter((el) => el.id != id);
    saveWorkers(changedWorkers);
    buildWorkersTable();
  }
}

function buildWorkersTable() {
  const tableData = getWorkers();
  const table = document.querySelector(".table__body");
  const currentRows = document.querySelectorAll(".table__row");
  if (currentRows.length > 0) {
    currentRows.forEach((row) => {
      row.remove();
    });
  }
  if (!tableData) return;

  tableData.forEach((rowData) => {
    const { name, department, creationDate, changeDate, id } = rowData;
    const row = document.createElement("div");
    row.classList.add("table__row");
    row.innerHTML = `
    <div class="table__data table__data-name">${name}</div>
    <div class="table__data table__data-department">${department}</div>
    <div class="table__data table__data-created">${creationDate}</div>
    <div class="table__data table__data-changed">${changeDate}</div>
    <div class="table__buttons">
      <div data-workerid='${id}' class="table__btn table__data-changeBtn">Change worker information</div>
      <div data-workerid='${id}' class="table__btn table__data-deleteBtn">Delete worker</div>
    </div>
      `;
    table.append(row);
  });
  const changeBtns = document.querySelectorAll(".table__data-changeBtn");
  const deleteBtns = document.querySelectorAll(".table__data-deleteBtn");

  changeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      fillForm(btn.dataset.workerid);
    });
  });
  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      deleteWorker(btn.dataset.workerid);
    });
  });
}

window.onload = function () {
  saveButton.addEventListener("click", () => {
    const id = saveButton.dataset.workerid;
    if (validateForm()) {
      saveData(id);
      clearForm();
    }
  });

  buildWorkersTable();
};