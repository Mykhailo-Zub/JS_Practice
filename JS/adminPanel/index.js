window.onload = function init() {
  const saveButton = document.querySelector("#saveButton");

  saveButton.addEventListener("click", () => {
    const name = document.querySelector("#firstName").value;
    const department = document.querySelector("#department").value;
    const form = document.querySelector("#addNewForm");
    if (validateForm(name, department, form)) {
      saveData(name, department);
      clearForm(form);
    }
  });

  buildWorkersTable();
};

function getWorkers() {
  return JSON.parse(localStorage.getItem("myCompanyWorkers"));
}

function validateForm(name, department, form) {
  let isNameOk = false;
  let isDepartmentOk = false;
  if (!/\W|\d|\s+/gm.test(name) && name !== "") {
    isNameOk = true;
    form.querySelector("input").classList.remove("name__error");
    form.querySelector(".name__error-text").classList.add("hidden");
  } else {
    form.querySelector("input").classList.add("name__error");
    form.querySelector(".name__error-text").classList.remove("hidden");
  }
  if (department !== "choose") {
    form.querySelector("select").classList.remove("department__error");
    form.querySelector(".department__error-text").classList.add("hidden");
    isDepartmentOk = true;
  } else {
    form.querySelector("select").classList.add("department__error");
    form.querySelector(".department__error-text").classList.remove("hidden");
  }
  if (isNameOk && isDepartmentOk) {
    return true;
  } else return false;
}

function saveData(name, department) {
  const newWorker = {
    name: name,
    department: department,
    creationDate: new Date().toLocaleDateString(),
    changeDate: new Date().toLocaleDateString(),
  };
  let savedWorkers = getWorkers();
  if (savedWorkers !== null) {
    newWorker.id = savedWorkers[savedWorkers.length - 1].id + 1;
    savedWorkers.push(newWorker);
  } else {
    newWorker.id = 1;
    savedWorkers = [newWorker];
  }
  const newStorageData = JSON.stringify(savedWorkers);
  localStorage.setItem("myCompanyWorkers", newStorageData);
  buildWorkersTable();
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

  tableData.forEach((rowData, index) => {
    const row = document.createElement("div");
    row.classList.add("table__row");
    if (index % 2 !== 0) {
      row.classList.add("table__row_odd");
    }
    row.innerHTML = `
    <div class="table__data table__data-name">${rowData.name}</div>
    <div class="table__data table__data-department">${rowData.department}</div>
    <div class="table__data table__data-created">${rowData.creationDate}</div>
    <div class="table__data table__data-changed">${rowData.changeDate}</div>
    <div class="table__buttons">
      <div onclick='showModal(${rowData.id})' class="table__btn table__data-changeBtn">Change worker information</div>
      <div onclick='deleteWorker(${rowData.id})' class="table__btn table__data-deleteBtn">Delete worker</div>
    </div>
      `;
    table.append(row);
  });
}

function showModal(id) {
  const tableData = getWorkers();
  document.querySelector(".modal").classList.remove("hidden");
  document.querySelector(".wrapper__modal").classList.remove("hidden");
  tableData.forEach((el) => {
    if (el.id == id) {
      document.querySelector("#firstNameChange").value = el.name;
      document.querySelector("#departmentChange").value = el.department;
    }
  });
  document.querySelector("#changeButton").onclick = () => {
    chahgeWorkerInfo(id, tableData);
  };
  document.querySelector("#closeButton").onclick = () => {
    document.querySelector(".modal").classList.add("hidden");
    document.querySelector(".wrapper__modal").classList.add("hidden");
  };
}

function chahgeWorkerInfo(id, tableData) {
  const name = document.querySelector("#firstNameChange").value;
  const department = document.querySelector("#departmentChange").value;
  const form = document.querySelector("#changeForm");
  if (validateForm(name, department, form)) {
    // const changedWorkers = tableData.filter((el) => el.id != id);
    tableData.forEach((el) => {
      if (el.id == id) {
        el.name = name;
        el.department = department;
        el.changeDate = new Date().toLocaleDateString();
      }
    });
    const newStorageData = JSON.stringify(tableData);
    localStorage.setItem("myCompanyWorkers", newStorageData);
    buildWorkersTable();
    document.querySelector(".modal").classList.add("hidden");
    document.querySelector(".wrapper__modal").classList.add("hidden");
    clearForm(form);
  }
}

function deleteWorker(id) {
  const tableData = getWorkers();
  let isDelete = false;
  tableData.forEach((el) => {
    if (el.id == id) {
      isDelete = confirm(`Do you really want to delete ${el.name}?`);
    }
  });
  if (isDelete) {
    const changedWorkers = tableData.filter((el) => el.id != id);
    const newStorageData = JSON.stringify(changedWorkers);
    localStorage.setItem("myCompanyWorkers", newStorageData);
    buildWorkersTable();
    document.querySelector(".modal").classList.add("hidden");
    document.querySelector(".wrapper__modal").classList.add("hidden");
  }
}

function clearForm(form) {
  form.querySelector("input").value = "";
  form.querySelector("select").value = "choose";
}
