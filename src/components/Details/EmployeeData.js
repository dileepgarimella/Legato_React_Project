import { useState, useEffect } from "react";
import {
  //   Container,
  Form,
  Row,
  Col,
  Button,
  //   Dropdown,
  Table,
  ListGroup,
  Tab,
} from "react-bootstrap";
import { Input } from "../FormFields/Input";
import { DropDown } from "../FormFields/Dropdown";
import { Modify } from "./Modify";
import { useHistory, withRouter } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import "./employee.css";
import {Employee_List} from "./Employee_List";
import { Search_Data } from "./Search_Data";
const choiceData = [
  { name: "Select Operation", value: "" },
  { name: "Profile", value: "Profile" },
  { name: "Employee List", value: "Employee List" },
  { name: "Modify", value: "Modify" },
];
function EmployeeData  (props)  {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [details, setDetails] = useState([]);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [project, setProject] = useState("");
  const [phone, setPhone] = useState("");
  const [currentpassword, setCurrentpassword] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [retypepassword, setRetypepassword] = useState("");
  const [choice, setChoice] = useState("");
  const [validation, setValidation] = useState(false);
  const [passwordError, setpasswordError] = useState("");
  const [emp_details, setEmp_details] = useState([]);
  const [editProfile, setEditprofile] = useState(false);
  const [manager, setManager] = useState("");
  const [managerList, setManagerList] = useState([]);
  const [tabKey, setTabkey] = useState("profile");
  const [keyword, setKeyword] = useState("");
  const [modifyDetails, setModifyDetails] = useState({});
  const [profileToModify, setProfileToModify] = useState(false);
  const [searchedData, setSearchedData] = useState([]);
  const [searchStatus, setSearchStatus] = useState(false);
  const [modifyMsg, setModifyMsg] = useState("");
  const [empolyeeModifyMsg, setEmployeeModifyMsg] = useState("");
  const [sortTypeName, setSortTypeName] = useState(false);
  const [sortTypeCity, setSortTypeCity] = useState(false);
  const [sortTypeProject, setSortTypeProject] = useState(false);
  const [sortTypePhone, setSortTypePhone] = useState(false);
  const [sortTypeManager, setSortTypeManager] = useState(false);
  const [sortType, setSortType] = useState("");
  useEffect(() => {
    setChoice("Profile");
    loadProfile();
    if (props.loggedInDetails.role === "Manager") {
      getManagerEmployeeDetails();
    } else if (props.loggedInDetails.role !== "Manager") {
      axios
        .get(`http://localhost:8080/EmployeeApi/getManagersList/`)
        .then((res) => {
          setManagerList(res.data);
        });
    }
  }, []); 
  const loadProfile = () => {
    const {
      name,
      role,
      city,
      phone,
      project,
      managerId,
    } = props.loggedInDetails;
    setName(name);
    setRole(role);
    setCity(city);
    setPhone(phone);
    setProject(project);
    setManager(managerId !== null ? managerId : "");
  };
  const handleChange = (e) => {
    e.preventDefault();
console.log(e);
    if (e.target.name === "choice") {
      setModifyMsg("");
      setEmployeeModifyMsg("");
      setProfileToModify(false);
      setEditprofile(false);
      setChoice(e.target.value);
      if (e.target.value === "Profile") {
        loadProfile();
      }
    } else if (e.target.name === "currentpassword") {
      // console.log("dileep");
      setCurrentpassword(e.target.value);
    } else if (e.target.name === "newpassword") {
      setNewpassword(e.target.value);
    } else if (e.target.name === "retypepassword") {
      setRetypepassword(e.target.value);
    } else if (e.target.name === "manager") {
      setManager(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    } else if (e.target.name === "role") {
      setRole(e.target.value);
    } else if (e.target.name === "name") {
      console.log(e);
      setName(e.target.value);
    } else if (e.target.name === "city") {
      setCity(e.target.value);
    } else if (e.target.name === "project") {
      setProject(e.target.value);
    } else if (e.target.name === "phone") {
      setPhone(e.target.value);
    }
  };
  const getManagerEmployeeDetails = () => {
    axios
      .get(
        `http://localhost:8080/EmployeeApi/getManagerEmployees/${props.loggedInDetails.username}`
      )
      .then((res) => {
        //   console.log(res.data);
        setEmp_details(res.data);
      });
  };
  const handleChangePassword = (e) => {
    e.preventDefault();
    if (currentpassword === "" || newpassword === "" || retypepassword === "") {
      setValidation(true);
    } else if (currentpassword !== props.loggedInDetails.password) {
      setpasswordError("Enter Correct password");
    } else if (newpassword !== retypepassword) {
      setpasswordError("password mismatch");
    } else {
      setCurrentpassword("");
      setNewpassword("");
      setRetypepassword("");
      setpasswordError("");
      setValidation(false);
      axios
        .post(
          `http://localhost:8080/EmployeeApi/updatePassword/${newpassword}`,
          props.loggedInDetails
        )
        .then((res) => {});
    }
  };
  const editProfiledata = (e) => {
    e.preventDefault();
    setEditprofile(true);
    setEmployeeModifyMsg("");
  };
  const updateProfile = async (e) => {
    e.preventDefault();
    setEditprofile(false);
    const data = props.loggedInDetails;
    await axios.post("http://localhost:8080/EmployeeApi/saveEmp/", {
      username: data.username,
      password: data.password,
      role: data.role,
      phone: phone,
      project: project,
      city: city,
      name: name,
      managerId:
        data.role === "Manager"
          ? data.managerId
          : manager === ""
          ? data.managerId
          : manager,
    });
    props.storeLoggedInCredentials({
      username: data.username,
      password: data.password,
      role: data.role,
      phone: phone,
      project: project,
      city: city,
      name: name,
      managerId:
        data.role === "Manager"
          ? data.managerId
          : manager === ""
          ? data.managerId
          : manager,
    });
    setEmployeeModifyMsg("updated Successfully");
    if (data.role === "Manager") {
      getManagerEmployeeDetails();
    }
  };
  const handleProfile = (e) => {
    e.preventDefault();
    if (props.loggedInDetails.role !== "Manager") {
      axios
        .get(`http://localhost:8080/EmployeeApi/getManagersList/`)
        .then((res) => {
          console.log(res.data);
          setManagerList(res.data);
        });
    }
  };
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchStatus(true);
    setModifyMsg("");
    setKeyword(e.target.value);

    if (e.target.value === "") {
      setSearchedData([]);
    } else {
      const filteredData = emp_details.filter((obj) =>
        Object.values(obj).some(
          (val) =>
            typeof val === "string" &&
            val.toLowerCase().match(e.target.value.toLowerCase())
        )
      );

      setSearchedData(filteredData);
    }
  };

  const modifyEmployee = (e) => {
    setChoice("Modify");
    console.log(e);
    setModifyDetails(e);
    setSearchStatus(false);
    const { name, role, city, phone, project, managerId } = e;
    setName(name);
    setRole(role);
    setCity(city);
    setPhone(phone);
    setProject(project);
    setManager(managerId !== null ? managerId : "");
    setEditprofile(true);
    setProfileToModify(true);
    axios
      .get(`http://localhost:8080/EmployeeApi/getManagersList/`)
      .then((res) => {
        // console.log(res.data);
        setManagerList(res.data);
      });
  };
  const handleModify = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/EmployeeApi/saveEmp/", {
      username: modifyDetails.username,
      password: modifyDetails.password,
      role: role,
      phone: phone,
      project: project,
      city: city,
      name: name,
      managerId: manager,
    });
    setModifyMsg("Updated Sucessfully");
    setName("");
    setRole("");
    setCity("");
    setPhone("");
    setProject("");
    setManager("");
    getManagerEmployeeDetails();
  };
  const Desc = (sorted, field) => {
    sorted.sort((a, b) => {
      console.log(a[field], b[field]);
      if (a[field] > b[field]) {
        return 1;
      }
      if (a[field] < b[field]) {
        return -1;
      }
      return 0;
    });
    setEmp_details(sorted);
  };
  const Asc = (sorted, field) => {
    sorted.sort((a, b) => {
      console.log(a[field], b[field]);
      if (a[field] < b[field]) {
        return 1;
      }
      if (a[field] > b[field]) {
        return -1;
      }
      return 0;
    });
    setEmp_details(sorted);
  };
  const sortTable = (field) => {
    const sorted = [...emp_details];
    setSortType(field);

    if (field === "name") {
      setSortTypeName(!sortTypeName);
      if (sortTypeName) {
        Desc(sorted, field);
      } else {
        Asc(sorted, field);
      }
    } else if (field === "city") {
      setSortTypeCity(!sortTypeCity);
      if (sortTypeCity) {
        Desc(sorted, field);
      } else {
        Asc(sorted, field);
      }
    } else if (field === "phone") {
      setSortTypePhone(!sortTypePhone);
      if (sortTypePhone) {
        Desc(sorted, field);
      } else {
        Asc(sorted, field);
      }
    } else if (field === "managerId") {
      setSortTypeManager(!sortTypeManager);
      if (sortTypeManager) {
        Desc(sorted, field);
      } else {
        Asc(sorted, field);
      }
    } else if (field === "project") {
      setSortTypeProject(!sortTypeProject);
      if (sortTypeProject) {
        Desc(sorted, field);
      } else {
        Asc(sorted, field);
      }
    }
  };
  return (
    <Row
      style={{
        justifyContent: "center",
        alignContent: "center",
      }}
    >
       {/* <Modify/> */}
      <Form className={"employee"}>
        <h3>Employee Portal</h3>
        <Row>
          <Col xs={3} sm={3}>
            <DropDown
              name={"choice"}
              value={choice}
              validation={validation}
              eventHandle={handleChange}
              marginBottom="1rem"
              width="20.5rem"
              choiceData={choiceData}
              condition={props.loggedInDetails.role}
            ></DropDown>
           <input
                        type="text"
                        // name="choice"
                        // value={choice}
                       
                        onChange={handleChange}
                      ></input>
          </Col>
        </Row>
        {choice === "Profile" && (
          <>
            <Tab.Container
              defaultActiveKey="profile"
              activeKey={tabKey}
              onSelect={(k) => {
                setEmployeeModifyMsg("");
                setTabkey(k);
              }}
            >
              <Row>
                <Col sm={4}>
                  <ListGroup style={{ cursor: "pointer", marginTop: "2rem" }}>
                    <ListGroup.Item eventKey="profile">
                      View Profile
                    </ListGroup.Item>
                    <ListGroup.Item eventKey="changepassword">
                      Change Password
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col sm={8}>
                  <Tab.Content size="sm">
                    <Tab.Pane eventKey="profile">
                      <Modify
                        role={role}
                        city={city}
                        name={name}
                        editProfile={editProfile}
                        project={project}
                        managerId={props.loggedInDetails.managerId}
                        mrole={props.loggedInDetails.role}
                        manager={manager}
                        validation={validation}
                        phone={phone}
                        managerList={managerList}
                        handleChange={handleChange}
                      ></Modify>
                      {empolyeeModifyMsg !== "" && (
                        <p style={{ color: "red" }}>{empolyeeModifyMsg}</p>
                      )}
                      <Button
                        onClick={!editProfile ? editProfiledata : updateProfile}
                      >
                        {editProfile ? "UPDATE" : "EDIT"}
                      </Button>
                    </Tab.Pane>

                    <Tab.Pane eventKey="changepassword">
                      <Input
                        label={"Password"}
                        type={"password"}
                        name="currentpassword"
                        value={currentpassword}
                        placeholder="Enter Password"
                        validation={validation}
                        eventHandle={handleChange}
                      ></Input>
                      <Input
                        type="password"
                        name="newpassword"
                        value={newpassword}
                        placeholder="Enter New Password"
                        validation={validation}
                        eventHandle={handleChange}
                      ></Input>
                      <Input
                        type="password"
                        name="retypepassword"
                        value={retypepassword}
                        placeholder="Re-Type Password"
                        validation={validation}
                        eventHandle={handleChange}
                      ></Input>
                      {passwordError !== "" && (
                        <p style={{ color: "red" }}>{passwordError}</p>
                      )}
                      <Button onClick={handleChangePassword}>
                        {"Change Password"}
                      </Button>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </>
        )}

        {props.loggedInDetails.role === "Manager" &&
          choice === "Employee List" && (
            <Employee_List emp_details={emp_details}
            sortTable={sortTable}
            sortTypeName={sortTypeName}
            sortTypeCity={sortTypeCity}
            sortType={sortType}
            sortTypeProject={sortTypeProject}
            sortTypePhone={sortTypePhone}
            sortTypeManager={sortTypeManager}
            modifyEmployee={modifyEmployee}></Employee_List>
            
          )}
        {choice === "Modify" && (
          <>
            <Form.Control
              type="text"
              value={keyword}
              onChange={handleSearch}
              placeholder="Search Employee"
              style={{ marginBottom: "1rem" }}
            />
            {!searchStatus && profileToModify && (
              <div
                style={{
                  marginBottom: "1rem",
                  marginLeft: "23rem",
                  alignContent: "center",
                  justifyContent: "center",
                  width: "30%",
                }}
              >
                {/* <Form.Group>
                  <Form.Label>Employee Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={name}
                    placeholder="Enter Name"
                    style={{
                      borderColor: name === "" && validation ? "red" : "",
                    }}
                    disabled
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Employee Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    Value={city}
                    placeholder="Enter Location"
                    style={{
                      borderColor: city === "" && validation ? "red" : "",
                    }}
                    onChange={handleChange}
                    disabled={!editProfile}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Employee Project</Form.Label>
                  <Form.Control
                    type="text"
                    name="project"
                    value={project}
                    placeholder="Enter Project"
                    style={{
                      borderColor: project === "" && validation ? "red" : "",
                    }}
                    onChange={handleChange}
                    disabled={!editProfile}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Employee Phone</Form.Label>
                  <Form.Control
                    type="number"
                    name="phone"
                    value={phone}
                    placeholder="Enter Phone Number"
                    style={{
                      borderColor: phone === "" && validation ? "red" : "",
                    }}
                    disabled={!editProfile}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Manager ID</Form.Label>
                  <Form.Control
                    as="select"
                    name="manager"
                    value={manager}
                    style={{
                      borderColor: manager === "" && validation ? "red" : "",
                    }}
                    onChange={handleChange}
                    disabled={
                      !editProfile || props.loggedInDetails.managerId !== null
                    }
                  >
                    <option value="">Select Manager</option>
                    {managerList.map((e) => (
                      <option>{e}</option>
                    ))}
                  </Form.Control>
                </Form.Group> */}
                <Modify
                        role={role}
                        city={city}
                        name={name}
                        editProfile={editProfile}
                        project={project}
                        // managerId={props.loggedInDetails.managerId}
                        // mrole={props.loggedInDetails.role}
                        manager={manager}
                        validation={validation}
                        phone={phone}
                        managerList={managerList}
                        handleChange={handleChange}
                      ></Modify>
                {modifyMsg && <p style={{ color: "red" }}>{modifyMsg}</p>}
                <Button onClick={handleModify}>Update</Button>
              </div>
            )}
          </>
        )}
        {searchStatus && (
          <Search_Data searchedData={searchedData} modifyEmployee={modifyEmployee}>
           
          </Search_Data>
        )}
      </Form>
    </Row>
  );
};
const mapStateToProps = (state) => {
  return { details: state.details, loggedInDetails: state.credentials };
};
const mapDispatchToProps = (dispatch) => {
  return {
    storeLoggedInCredentials: (data) => {
      console.log(data);
      dispatch({ type: "STORE_LOGGEDIN_CREDENTIALS", payload: data });
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EmployeeData));
