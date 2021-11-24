import React, { useState, useEffect, useCallback } from "react";
import styles from "./App.module.css";
import Table from "./components/Table/Table";

import Form from "./components/Form/Form";

function App() {
  const [tableData, setTableData] = useState([]);
  const [changingId, setChangingId] = useState(null);

  useEffect(() => {
    try {
      const tableData = JSON.parse(localStorage.getItem("myCompanyWorkers"));
      if (tableData) setTableData(tableData);
    } catch {
      console.error("Something wrong when read local storage!");
    }
  }, []);

  const fillFormForChange = useCallback((id) => {
    setChangingId(id);
  }, []);

  const deleteWorker = useCallback((id, name) => {
    setTableData((prevTableData) => {
      if (window.confirm(`Do you really want to delete ${name}`)) {
        const newData = prevTableData.filter((el) => el.id !== parseInt(id));
        saveToStorage(newData);
        return newData;
      }
    });
  }, []);

  const saveWorker = useCallback(
    (incomeName, incomeDepartment) => {
      setTableData((prevTableData) => {
        let newTableData;
        if (changingId) {
          newTableData = prevTableData.map((el) => {
            const { id } = el;
            if (id === changingId) {
              return {
                ...el,
                name: incomeName,
                department: incomeDepartment,
                changeDate: new Date().toLocaleDateString(),
              };
            }
            return el;
          });
        } else {
          const newWorker = {
            name: incomeName,
            department: incomeDepartment,
            creationDate: new Date().toLocaleDateString(),
            changeDate: new Date().toLocaleDateString(),
            id: prevTableData.length > 0 ? prevTableData[prevTableData.length - 1].id + 1 : 1,
          };

          newTableData = [...prevTableData, newWorker];
        }
        saveToStorage(newTableData);
        return newTableData;
      });
    },
    [changingId]
  );

  const saveToStorage = (data) => {
    try {
      localStorage.setItem("myCompanyWorkers", JSON.stringify(data));
      setChangingId(null);
    } catch {
      alert("Writing data to local storage failed!");
    }
  };

  let changingData = {};
  if (changingId) {
    changingData = tableData.find((el) => el.id === changingId);
  }
  const { name, department } = changingData;
  return (
    <div className={styles.wrapper}>
      <Form name={name} department={department} changingId={changingId} saveWorker={saveWorker} />
      <div className={styles.table_name}>Employees of the company "Horns and Hooves"</div>
      <Table tableData={tableData} fillFormForChange={fillFormForChange} deleteWorker={deleteWorker} />
    </div>
  );
}

export default App;
