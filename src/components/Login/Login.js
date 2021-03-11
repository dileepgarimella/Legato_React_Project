import { useEffect, useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import "./login.css";
// import {Input} from "../FormFields/index";
import { Input } from "../FormFields/Input";
import { DropDown } from "../FormFields/Dropdown";

const choiceData = [
  { name: "Select Role", value: "" },
  { name: "PA", value: "PA" },
  { name: "Manager", value: "Manager" },
  { name: "Associate", value: "Associate" }
];

const Login = (props) => {
  let history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [details, setDetails] = useState([]);
  const [name, setName] = useState("");
  // const [err, setErr] = useState("");
  const [city, setCity] = useState("");
  const [project, setProject] = useState("");
  const [phone, setPhone] = useState("");
  const [validation, setValidation] = useState(false);
  const [loggedInError, setLoggedInError] = useState(false);
  const [signUp, setSignUp] = useState(false);
  const [signUpMsg, setSignUpMsg] = useState("");
  const [credentials, setCredentials] = useState([]);
  const getData = () => {
    getCredentials();
  };

  useEffect(() => {
    getData();
  }, []);
  const getCredentials = async () => {
    await axios
      .get("http://localhost:8080/EmployeeApi/getCredentails/")
      .then((res) => {
        console.log(res.data);
        setCredentials(res.data);
      });
  };
  const handleChange = (e) => {
    setLoggedInError(false);
    setSignUpMsg("");
    if (e.target.name === "username") {
      setUsername(e.target.value);
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
  const handleLogin = (e) => {
    if (!signUp) {
      if (username === "" || password === "") {
        setValidation(true);
      } else {
        const data = credentials.find(
          (e) => e.username === username && e.password === password
        );
        console.log(data);
        setValidation(false);
        if (data !== undefined) {
          props.storeLoggedInCredentials(data);
          history.push("/employee");
          setLoggedInError(false);
        } else {
          setLoggedInError(true);
        }
      }
    } else {
      if (username === "" || password === "" || role == "") {
        setValidation(true);
      } else {
        setCredentials([
          ...credentials,
          { username: username, password: password },
        ]);
        axios
          .post("http://localhost:8080/EmployeeApi/saveEmp/", {
            username: username,
            password: password,
            role: role,
            phone: phone,
            project: project,
            city: city,
            name: name,
          })
          .then((res) => {
            console.log(res.data);
            setSignUpMsg("Account Created");
            getCredentials();
            setSignUp(!signUp);
            setValidation(false);
            setPassword("");
            setUsername("");
            setRole("");
            setProject("");
            setName("");
            setPhone("");
          });
      }
    }
  };
  const handleSignIn = (e) => {
    setUsername("");
    setPassword("");
    setSignUp(!signUp);
    setValidation(false);
    setLoggedInError(false);
    setSignUpMsg("");
  };
  return (
    <Container>
      <Row
        style={{
          justifyContent: "center",
          alignContent: "center",
          // marginTop: "9rem",
        }}
      >
        <Form className={"credentials"}>
          <h3 style={{ marginTop: "1rem" }}>
            {!signUp ? "Log In" : "Sign Up"}
          </h3>
          {/* <Input/> */}
          <Input
            label={"Username"}
            name="username"
            value={username}
            placeholder="username"
            validation={validation}
            eventHandle={handleChange}
          ></Input>
          <Input
            type="password"
            label={"Password"}
            name="password"
            value={password}
            placeholder="password"
            validation={validation}
            eventHandle={handleChange}
          ></Input>

          {signUp && (
            <>
              <DropDown
                label={"Role"}
                name="role"
                value={role}
                validation={validation}
                eventHandle={handleChange}
                choiceData={choiceData}
              ></DropDown>

              <Input
                label={"Employee Name"}
                name="name"
                value={name}
                placeholder="Enter Name"
                validation={validation}
                eventHandle={handleChange}
              ></Input>
              <Input
                label={"Employee Location"}
                name="city"
                value={city}
                placeholder="Enter City"
                validation={validation}
                eventHandle={handleChange}
              ></Input>

              <Input
                label={"Enter Project"}
                name="project"
                value={project}
                placeholder="Enter Project"
                validation={validation}
                eventHandle={handleChange}
              ></Input>

              <Input
                label={"Employee Phone"}
                name="phone"
                value={phone}
                placeholder="Enter Phone Number"
                validation={validation}
                eventHandle={handleChange}
              ></Input>
            </>
          )}
          {loggedInError && (
            <p style={{ color: "red", fontSize: "0.9rem" }}>
              Enter Valid credentials
            </p>
          )}
          {signUpMsg !== "" && (
            <p style={{ color: "red", fontSize: "0.9rem" }}>{signUpMsg}</p>
          )}
          <Button onClick={handleLogin}>{signUp ? "SignUp" : "Login"}</Button>
          <p className={"loginsignuplink"} style={{ marginBottom: "1rem" }}>
            {!signUp ? "New User" : "Already User"}
            <u style={{ cursor: "pointer" }} onClick={handleSignIn}>
              {!signUp ? " Sign Up?" : " Login?"}
            </u>
          </p>
        </Form>
      </Row>
    </Container>
  );
};
const mapStateToProps = (state) => {
  return { credentials: state.usernames, loggedInDetails: state.credentials };
};
const mapDisptachToProps = (dispatch) => {
  return {
    // setLoggedInCredentials: (data) =>
    //   dispatch({ type: "SET_LOGGEDINDETAILS", payload: data }),
    // getLoggedInCredentials: () => dispatch({ type: "GET_LOGGEDINCREDENTIALS" }),
    storeLoggedInCredentials: (data) =>
      dispatch({ type: "STORE_LOGGEDIN_CREDENTIALS", payload: data }),
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(Login);
// export default Login;
