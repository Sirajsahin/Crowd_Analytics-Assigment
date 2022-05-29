import React, { useState, useCallback, useEffect } from "react";
import "../styles.css";
import EmployeeTable from "./EmployeeTable";

const getlocalStorage = () => {
  const data = localStorage.getItem("data");
  const d = data !== null ? JSON.parse(data) : [];
  return d;
};

const Employee = (props) => {
  const [data, setData] = useState(getlocalStorage());
  const [inputField, setInputField] = useState({});
  const [edit, setEdit] = useState(0);
  const [flage, setFlage] = useState(false);

  const inputsHandler = (e) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault();

    //if edit is enabel then it will work
    if (flage) {
      let items = [...data];
      let item = items[edit];
      item.name = inputField.name;
      item.age = inputField.age;
      item.department = inputField.department;
      item.blood_group = inputField.blood_group;
      item.address = inputField.address;
      item.contact_number = inputField.contact_number;
      items[edit] = item;
      setData(items);
      setEdit(0);
      setInputField({
        name: "",
        age: "",
        department: "",
        blood_group: "",
        address: "",
        contact_number: ""
      });
      setFlage(false);
    } else {
      setData((val) => [...val, inputField]);
      setInputField({
        name: "",
        age: "",
        department: "",
        blood_group: "",
        address: "",
        contact_number: ""
      });
    }
  };

  //usecallback used for data receive from child component, this is delete function
  const deleteFeild = useCallback((id) => {
    const deleteField = data.filter((value, ind) => ind !== id);
    setData(deleteField);
  });

  //usecallback used for data receive from child component, this is edit function
  const editItem = useCallback((value, id) => {
    setInputField({
      name: value.name,
      age: value.age,
      department: value.department,
      blood_group: value.blood_group,
      address: value.address,
      contact_number: value.contact_number
    });
    setEdit(id);
    setFlage(true);
  });
  //  to store user data into local storage
  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  return (
    <div className="main-section">
      <div className="left-section">
        <div className="feild-box">
          <label>
            Name :
            <input
              type="text"
              name="name"
              onChange={inputsHandler}
              placeholder="Name"
              value={inputField.name}
              required
            />
          </label>

          <label>
            Age :
            <input
              type="text"
              name="age"
              onChange={inputsHandler}
              placeholder="Age"
              value={inputField.age}
            />
          </label>
          <label>
            Department :
            <input
              type="text"
              name="department"
              onChange={inputsHandler}
              placeholder="Department"
              value={inputField.department}
            />
          </label>
        </div>
        <div className="feild-box">
          <label>
            Blood group :
            <input
              type="text"
              name="blood_group"
              onChange={inputsHandler}
              placeholder="Blood Group"
              value={inputField.blood_group}
            />
          </label>
          <label>
            Address :
            <input
              type="text"
              name="address"
              onChange={inputsHandler}
              placeholder="Address"
              value={inputField.address}
            />
          </label>
          <label>
            Contact number :
            <input
              type="text"
              name="contact_number"
              onChange={inputsHandler}
              placeholder="Contact"
              value={inputField.contact_number}
            />
          </label>
        </div>
        <button className="submit-button" type="submit" onClick={submitForm}>
          Submit
        </button>
      </div>

      <div className="right-section">
        <EmployeeTable
          data={data}
          deleteEmployee={deleteFeild}
          editEmployee={editItem}
        />
      </div>
    </div>
  );
};
export default Employee;
