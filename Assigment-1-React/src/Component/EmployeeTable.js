import React from "react";
import "../styles.css";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

const EmployeeTable = ({ data, deleteEmployee, editEmployee }) => {
  return (
    <div>
      <table className="table">
        <thead className="thead">
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Department</th>
            <th>Blood group</th>
            <th>Address</th>
            <th>Contact number</th>
            <th>Edit/Delete</th>
          </tr>
        </thead>
        <tbody className="tbody">
          {data.map((value, id) => {
            return (
              <tr key={id}>
                <td className="table-row">{value.name}</td>
                <td className="table-row">{value.age}</td>
                <td className="table-row">{value.department}</td>
                <td className="table-row">{value.blood_group}</td>
                <td className="table-row">{value.address}</td>
                <td className="table-row"> {value.contact_number}</td>

                <td>
                  <button
                    className="edit_button"
                    onClick={() => editEmployee(value, id)}
                  >
                    <FiEdit />
                  </button>
                  <button
                    className="edit_button"
                    onClick={() => deleteEmployee(id)}
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default EmployeeTable;
