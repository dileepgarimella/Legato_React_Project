import { useState, useEffect } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useHistory, withRouter } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
function App(props) {
  let history = useHistory();
  const url = "http://localhost:8080/detailsApi/";
  const [details, setDetails] = useState([]);
  const [name, setName] = useState("");
  const [err, setErr] = useState("");
  const [city, setCity] = useState("");
  const [project, setProject] = useState("");
  const [phone, setPhone] = useState("");
  const [update, setUpdate] = useState(false);
  const [index, setIndex] = useState("");
  const [validation, setValidation] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [searchedData, setSearchedData] = useState([]);
  const [msg, setMsg] = useState("");
  const [data, setData] = useState({ name: "" });
  const getData = () => {
    axios.get("http://localhost:8080/detailsApi/details").then((res) => {
      console.log(res.data);
      setDetails(res.data);
      props.onSubmitDetails(res.data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const submitDetails = async (e) => {
    e.preventDefault();
    if (name !== "" && city !== "" && project !== "" && phone !== "") {
      // setDetails([
      //   ...details,
      //   { id: details.length + 1, name: name, city: city },
      // ]);
      await axios
        .post("http://localhost:8080/detailsApi/postDetails/", {
          name: name,
          city: city,
          project: project,
          phone: phone,
          credentials: props.loggedInDetails,
          // {  username: props.loggedInDetails.username,
          //   password: props.loggedInDetails.password,
          //   role:props.loggedInDetails.role}
        })
        .then((res) => {
          console.log(res);
          if (!res.data) {
            setMsg("Details Exists!!");
          } else {
            setMsg("Added Successfully!!");
          }
        });
      setName("");
      setCity("");
      setPhone("");
      setProject("");
      setValidation(false);
    } else {
      setValidation(true);
    }

    // props.onSubmitDetails({ name: name, city: city });
    // if(props)

    // console.log(details);
    // getData();
  };
  const updateDetails = async (e) => {
    // e.preventDefault();
    // console.log(e, name, city, index);
    let arr = [];
    if (name !== "" && city !== "") {
      props.updateDetails({ index: index, name: name, city: city });
      // setDetails(arr);
      await axios
        .put(url + "putDetails/", { _id: index, name: name, city: city })
        .then((res) => {});
      setName("");
      setCity("");
      setUpdate(false);
      setValidation(false);
    } else {
      setValidation(true);
    }
    if (keyword) {
      const filteredData = arr.filter((obj) =>
        Object.values(obj).some(
          (val) =>
            typeof val === "string" &&
            val.toLowerCase().match(keyword.toLowerCase())
        )
      );

      setSearchedData(filteredData);
    }
    getData();
  };
  const handleChange = (e) => {
    setMsg("");
    if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "city") {
      setCity(e.target.value);
    } else if (e.target.name === "project") {
      setProject(e.target.value);
    } else if (e.target.name === "phone") {
      setPhone(e.target.value);
    }
  };
  const updateData = (e) => {
    // console.log(details);
    console.log(e);
    details.map((a, id) => {
      if (a._id === e) {
        console.log(a);
        setName(a.name);
        setCity(a.city);
        setUpdate(true);
        setIndex(a._id);
      }
    });
  };
  const employeeDetails = async (e) => {
    e.preventDefault();
    await axios
      .get(
        `http://localhost:8080/detailsApi/getManager_employess/${props.loggedInDetails.username}/${props.loggedInDetails.role}`
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.length > 0) {
          history.push({
            pathname: "/Search",
            state: { details: res.data },
          });
          setErr("");
        }
        else {
          setErr("NO Data");
        }
      });
  };
  const deleteData = async (e) => {
    setData(...data, { name: "d" });
    console.log(e);
    await axios.delete(url + `deleteDetails/${e}`);
    let arr = [];
    details.map((k, i) => {
      if (k.id !== e) {
        arr.push(k);
      }
    });
    setDetails(arr);
    props.deleteDetails(e);
    if (keyword !== "") {
      const filteredData = arr.filter((obj) =>
        Object.values(obj).some(
          (val) =>
            typeof val === "string" &&
            val.toLowerCase().match(keyword.toLowerCase())
        )
      );
      setSearchedData(filteredData);
    }
    await getData();
  };
  const postManagerDetails=(e)=>{
e.preventDefault();

axios.post(`http://localhost:8080/EmployeeApi/setManager/${"dileep"}`,props.loggedInDetails).then((res)=>{

})
  }
  // console.log(props);
  return (
    <Container>
      <Row >
        <Col xs={3} sm={3}></Col>
        <Col xs={3} sm={3}>
          <Form>
            <Form.Label>
              <h5>{update ? "Update Details" : "Add Employee Details"} </h5>
            </Form.Label>
            {/* <Form.Group>
              <Form.Label>Employee Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={name}
                placeholder="Enter Name"
                style={{ borderColor: name === "" && validation ? "red" : "" }}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Employee Location</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={city}
                placeholder="Enter Location"
                style={{ borderColor: city === "" && validation ? "red" : "" }}
                onChange={handleChange}
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
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Employee Phone</Form.Label>
              <Form.Control
                type="number"
                name="phone"
                value={phone}
                placeholder="Enter Phone Number"
                style={{ borderColor: phone === "" && validation ? "red" : "" }}
                onChange={handleChange}
              />
            </Form.Group> */}
            {/* {msg !== "" && <p>{msg}</p>}
            <Button onClick={update === true ? updateDetails : submitDetails}>
              {update === true ? "Update" : "Submit"}
            </Button> */}
            <Button onClick={postManagerDetails}>
              {"post"}
            </Button> 
            <u
              style={{ cursor: "pointer" }}
              onClick={
                // history.push({
                //   pathname: "/Search",
                //   state: { details: details },
                //   deleteData: deleteData,
                //   updateData: updateData,
                // })
                employeeDetails
              }
            >
              <p style={{ marginTop: "1rem" }}> get details</p>
            </u>
            {
              err!==""&&
              <p>{err}</p>
            }
          </Form>
        </Col>
        {/* <Col xs={1} sm={1}></Col>
        <Col xs={7} sm={7}>
          {details.length !== 0 && (
            <>
              <Form.Label>
                <h5>View Details</h5>
              </Form.Label>
              <Row>
                <Col xs={2} sm={2}>
                  <h5>Name</h5>
                </Col>
                <Col xs={2} sm={2}>
                  <h5>City</h5>
                </Col>
              </Row>
            </>
          )} */}
        {/* {details.map((e, i) => (
            <Form key={i}>
              <Row>
                <Col xs={2} sm={2}>
                  <p>{e.name}</p>
                </Col>
                <Col xs={2} sm={2}>
                  <p>{e.city}</p>
                </Col>
                <Col xs={2} sm={2}>
                  <Button
                    onClick={(a) => {
                      a.preventDefault();
                      deleteData(e._id);
                    }}
                  >
                    Delete
                  </Button>
                </Col>
                <Col xs={1} sm={1}>
                  <Button
                    onClick={(a) => {
                      a.preventDefault();
                      updateData(e._id);
                    }}
                  >
                    Update
                  </Button>
                </Col>
              </Row>
            </Form>
          ))} */}
        {/* </Col> */}
      </Row>
    </Container>
  );
}
const mapStateToProps = (state) => {
  return { details: state.details, loggedInDetails: state.credentials };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onSubmitDetails: (data) => dispatch({ type: "ADD_DETAILS", payload: data }),
    deleteDetails: (data) =>
      dispatch({ type: "DELETE_DETAILS", payload: data }),
    updateDetails: (data) =>
      dispatch({ type: "UPDATE_DETAILS", payload: data }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
