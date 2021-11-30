import React, { useState, useEffect, useCallback } from "react";
import styles from "./App.module.css";
import Table from "./components/Table/Table";

import Form from "./components/Form/Form";

function App() {
  const [tableData, setTableData] = useState([]);
  const [changingId, setChangingId] = useState(null);
  const [isChangedData, setIsChangedData] = useState(false);

  useEffect(() => {
    try {
      const tableData = JSON.parse(localStorage.getItem("myCompanyWorkers"));
      if (tableData) {
        setTableData(tableData);
      }
    } catch {
      console.error("Something wrong when read local storage!");
    }
  }, []);

  useEffect(() => {
    if (isChangedData) {
      try {
        localStorage.setItem("myCompanyWorkers", JSON.stringify(tableData));
        setChangingId(null);
      } catch {
        alert("Writing data to local storage failed!");
      }
    }
  }, [tableData, isChangedData]);

  const deleteWorker = useCallback(
    (id) => {
      const newData = tableData.filter((el) => el.id !== parseInt(id));
      setTableData(newData);
      setIsChangedData(true);
    },
    [tableData]
  );

  const deleteHandler = (id, name) => {
    if (window.confirm(`Do you really want to delete ${name}`)) {
      deleteWorker(id);
    }
  };

  const saveWorker = useCallback(
    (incomeName, incomeDepartment, currentDate) => {
      let newTableData;
      if (changingId) {
        newTableData = tableData.map((el) => {
          const { id } = el;
          if (id === changingId) {
            return {
              ...el,
              name: incomeName,
              department: incomeDepartment,
              changeDate: currentDate,
            };
          }
          return el;
        });
      } else {
        const newWorker = {
          name: incomeName,
          department: incomeDepartment,
          creationDate: currentDate,
          changeDate: currentDate,
          id: tableData.length > 0 ? tableData[tableData.length - 1].id + 1 : 1,
        };

        newTableData = [...tableData, newWorker];
      }
      setTableData(newTableData);
      setIsChangedData(true);
    },
    [tableData, changingId]
  );

  const { name, department } = tableData.find((el) => el.id === changingId) || {};

  return (
    <div className={styles.wrapper}>
      <Form name={name} department={department} changingId={changingId} saveWorker={saveWorker} />
      <div className={styles.table_name}>Employees of the company "Horns and Hooves"</div>
      <Table tableData={tableData} fillFormForChange={setChangingId} deleteWorker={deleteHandler} />
    </div>
  );
}

export default App;
