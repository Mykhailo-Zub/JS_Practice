import "./App.css";
import Table from "./components/Table/Table";
import TableRow from "./components/TableRow/TableRow";

const tableData = [
  { name: "Vasya", department: "Developers", emplDate: "25.10.2021", changeDate: "26.10.2021", id: "1" },
  { name: "Vasya", department: "Developers", emplDate: "25.10.2021", changeDate: "26.10.2021", id: "2" },
  { name: "Vasya", department: "Developers", emplDate: "25.10.2021", changeDate: "26.10.2021", id: "3" },
  { name: "Vasya", department: "Developers", emplDate: "25.10.2021", changeDate: "26.10.2021", id: "4" },
];

function App() {
  return (
    <div className="main__wrapper">
      <Table>
        {tableData.map((row, index) => (
          <TableRow data={row} key={index} changeInfo={() => console.log("Change", row.id)} deleteWorker={() => console.log("Delete", row.id)} />
        ))}
      </Table>
    </div>
  );
}

export default App;
