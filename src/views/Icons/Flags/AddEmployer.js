import React, { Component } from "react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupText,
  Label,
  Row,
} from "reactstrap";

class AddEmployer extends Component {
  constructor(props) {
    super(props);
    const currentItem = props.location?.state?.currentItem;
    console.log("Table truyen sang la :", currentItem);

    this.state = {
      name: currentItem?.name || "",
      email: currentItem?.email || "",
      password: currentItem?.password || "",
      role: currentItem?.role || "",
    };
  }
  isChangeName = (event) => {
    this.setState({
      name: event.target.value,
    });
  };
  isChangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };
  isChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  isChangeRole = (event) => {
    this.setState({
      role: event.target.value,
    });
  };
  submitForm() {
    const { name, email, password, role } = this.state;
    console.log("submit clicked ");

    const currentItem = this.props.location.state?.currentItem;

    const method = currentItem ? "PUT" : "POST";
    const url = currentItem
      ? "http://localhost:3001/auth/register/" + currentItem._id
      : "http://localhost:3001/auth/register";

    const requestOptions = {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    };

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log("update success:", data);
        alert("Thêm thành công ");
        this.props.history.push("/base/tables");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  render() {
    const { name, email, password, role } = this.state;
    return (
      <div
        style={{
          backgroundColor: "coral",
          marginLeft: "27%",
          padding: "20px",
          width: "800px",
        }}
      >
        <h5 style={{ color: "white", fontSize: "30px", marginBottom: "50px" }}>
          {" "}
          Thêm nhân viên{" "}
        </h5>
        <Row>
          <Col xs="12">
            <FormGroup style={{ display: "flex" }}>
              <Label htmlFor="name">Name</Label>
              <Input
                style={{ width: "50%", marginLeft: "62px" }}
                type="text"
                id="name"
                placeholder="Enter your name"
                required
                value={name}
                onChange={(event) => this.isChangeName(event)}
              />
            </FormGroup>
            {/* <p
                  className="help-block text-danger"
                  style={{ color: "red", marginLeft: "90px", fontSize: "20px" }}
                >
                  {addressErr}
                </p> */}
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <FormGroup style={{ display: "flex" }}>
              <Label htmlFor="name">Email</Label>
              <Input
                style={{ width: "50%", marginLeft: "66px" }}
                type="text"
                id="name"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(event) => this.isChangeEmail(event)}
              />
            </FormGroup>
            {/* <p
                  className="help-block text-danger"
                  style={{ color: "red", marginLeft: "90px", fontSize: "20px" }}
                >
                  {cccdErr}
                </p> */}
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <FormGroup style={{ display: "flex" }}>
              <Label htmlFor="name">Password</Label>
              <Input
                secureTextEntry
                style={{ width: "50%", marginLeft: "43px" }}
                type="password"
                id="name"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(event) => this.isChangePassword(event)}
              />
            </FormGroup>
            {/* <p
                  className="help-block text-danger"
                  style={{ color: "red", marginLeft: "90px", fontSize: "20px" }}
                >
                  {emailErr}
                </p> */}
          </Col>
        </Row>
        <div className="form-group">
          <button
            className="btn btn-primary btn-xl"
            style={{ marginLeft: "25%" }}
            type="submit"
            onClick={(event) => this.submitForm(event)}
          >
            Send
          </button>
        </div>
      </div>
    );
  }
}
export default AddEmployer;
