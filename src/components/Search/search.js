import react, { useState, useEffect } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useLocation, Link, useHistory, withRouter } from "react-router-dom";
import { connect } from "react-redux";

const Search = (props) => {
  let location = useLocation();
  let history = useHistory();
  const [details, setDetails] = useState([]);
  const [searchedData, setSearchedData] = useState([]);
  const [keyword, setKeyword] = useState("");
  console.log(history);
  useEffect(() => {
    // console.log(location);

    if (history.location.state.details) {
      setDetails(history.location.state.details);
    }
  }, [props.details]);

  const handleSearch = (e) => {
    e.preventDefault();
    setKeyword(e.target.value);
    if (e.target.value === "") {
      setSearchedData([]);
    } else {
      const filteredData = details.filter((obj) =>
        Object.values(obj).some(
          (val) =>
            typeof val === "string" &&
            val.toLowerCase().match(e.target.value.toLowerCase())
        )
      );

      setSearchedData(filteredData);
    }
  };
  return (
    <Form
      style={{
        justifyContent: "center",
        marginLeft: "8em",
        marginTop: "2rem",
      }}
    >
      <Form.Label>
        {/* <h5>Search Details</h5> */}
        <h5>Employee Details</h5>
      </Form.Label>
      {/* <Form.Control
        type="text"
        value={keyword}
        onChange={handleSearch}
        placeholder="Enter Keyword"
        style={{ width: "38rem", marginBottom: "1rem" }}
      /> */}
      {/* {searchedData.length > 0 && ( */}
      {details.length > 0 && (
        <Row>
          <Col xs={2} sm={2}>
            <h5>Name</h5>
          </Col>
          <Col xs={2} sm={2}>
            <h5>Location</h5>
          </Col>
          <Col xs={2} sm={2}>
            <h5>Project</h5>
          </Col>
          <Col xs={2} sm={2}>
            <h5>Phone</h5>
          </Col>
        </Row>
      )}
      {details.map((e, i) => (
        <Form key={i}>
          <Row>
            <Col xs={2} sm={2}>
              <p>{e.name}</p>
            </Col>
            <Col xs={2} sm={2}>
              <p>{e.city}</p>
            </Col>
            <Col xs={2} sm={2}>
              <p>{e.project}</p>
            </Col>
            <Col xs={2} sm={2}>
              <p>{e.phone}</p>
            </Col>
            {/* <Col xs={2} sm={2}>
              <Button
                onClick={(a) => {
                  a.preventDefault();
                  location.deleteData(e.id);
                }}
              >
                Delete
              </Button>
            </Col> */}
            {/* <Col xs={1} sm={1}> */}
            {/* <Link to="/Login"> */}
            {/* <Button
                onClick={(a) => {
                  a.preventDefault();
                  // location.updateData(e.id);
                  history.push("/Login");
                }}
              >
                Update
              </Button> */}
            {/* </Col> */}
          </Row>
        </Form>
      ))}
    </Form>
  );
};

const mapStateToProps = (state) => {
  // return {details:state.details}
};
// const mapDispatchToProps=dispatch=>{
//   return {
//     onSubmitDetails:(data)=> dispatch({type:"ADD_DETAILS",payload:data}),
//     deleteDetails:(data)=>dispatch({type:"DELETE_DETAILS",payload:data}),
//     updateDetails:(data)=>dispatch({type:"UPDATE_DETAILS",payload:data})
//   };
// }
export default connect(mapStateToProps)(withRouter(Search));
