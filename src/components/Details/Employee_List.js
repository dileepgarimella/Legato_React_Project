import {
   Button,Table
} from "react-bootstrap";
import { UpArrow, DownArrow } from "../Icons/icon";

export const Employee_List = (props) => {
  const {
    emp_details,
    sortTable,
    sortTypeName,
    sortTypeCity,
    sortType,
    sortTypeProject,
    sortTypePhone,
    sortTypeManager,
    modifyEmployee,
  } = props;
  return (
    <Table striped bordered hover>
      {emp_details.length > 0 ? (
        <thead>
          <tr>
            <th>#</th>
            <th
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                sortTable("name");
              }}
            >
              Name
              {sortType === "name" && (!sortTypeName ? UpArrow : DownArrow)}
            </th>
            <th
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                sortTable("city");
              }}
            >
              Location
              {sortType === "city" && (!sortTypeCity ? UpArrow : DownArrow)}
            </th>
            <th
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                sortTable("project");
              }}
            >
              Project
              {sortType === "project" &&
                (!sortTypeProject ? UpArrow : DownArrow)}
            </th>
            <th
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                sortTable("phone");
              }}
            >
              Phone
              {sortType === "phone" && (!sortTypePhone ? UpArrow : DownArrow)}
            </th>
            <th
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                sortTable("managerId");
              }}
            >
              Manager
              {sortType === "managerId" &&
                (!sortTypeManager ? UpArrow : DownArrow)}
            </th>
            <th></th>
          </tr>
        </thead>
      ) : (
        <p style={{ lineHeight: "1em", textAlign: "center" }}>
          No Records Found
        </p>
      )}
      <tbody>
        {emp_details.map((e, i) => (
          <tr key={i}>
            <td>{i + 1}</td>
            <td>{e.name}</td>
            <td>{e.city}</td>
            <td>{e.project}</td>
            <td>{e.phone}</td>
            <td>{e.managerId}</td>
            <td>
              <Button
                onClick={(a) => {
                  a.preventDefault();
                  modifyEmployee(e);
                }}
              >
                {"Modify"}
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
