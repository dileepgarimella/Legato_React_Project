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
export const Search_Data=(props)=>{
const {searchedData,modifyEmployee}=props;
    return(
        searchedData.length > 0 && (
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
          ) &&  
          searchedData.map((e, i) => (
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
                <Col xs={2} sm={2}>
                  <Button
                    onClick={(a) => {
                      a.preventDefault();
                      modifyEmployee(e);
                    }}
                  >
                    Modify
                  </Button>
                </Col>
              </Row>
            </Form>
          ))
    )

}