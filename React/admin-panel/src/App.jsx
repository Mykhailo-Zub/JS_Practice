import styles from "./App.module.css";
import Table from "./components/Table/Table";

const tableData = [
  { name: "Vasya", department: "Developers", emplDate: "25.10.2021", changeDate: "26.10.2021", id: "1" },
  { name: "Vasya", department: "Developers", emplDate: "25.10.2021", changeDate: "26.10.2021", id: "2" },
  { name: "Vasya", department: "Developers", emplDate: "25.10.2021", changeDate: "26.10.2021", id: "3" },
  { name: "Vasya", department: "Developers", emplDate: "25.10.2021", changeDate: "26.10.2021", id: "4" },
];

function App() {
  return (
    <div className={styles.wrapper}>
      <Table tableData={tableData} />
    </div>
  );
}

export default App;
