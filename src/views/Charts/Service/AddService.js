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
import Select from "react-select";

import './style.css';


class AddService extends Component {
  constructor(props) {
    super(props);

    const currentItem = props.location?.state?.currentItem

    console.log("Service pass  :", currentItem);

    this.state = {
      name: currentItem?.name||"",
      price:currentItem?.price || "",
      nameErr:"",
      priceErr:""
    };
  }

  isChangeName = (event) => {
    this.setState({
      name: event.target.value,
    });
  };
  isChangePrice = (event) => {
    this.setState({
      price: event.target.value,
    });
  };
 

  submitForm() {
      const { name , price , nameErr , priceErr } = this. state
 
    const currentItem = this.props.location.state?.currentItem;


    if (name.toString().trim().length === 0) {
      this.setState({ nameErr: "Bạn phải nhập tên" });
      return;
    } else {
      this.setState({
        nameErr: "",
      });
    }
    if (price.toString().trim().length === 0) {
      this.setState({ priceErr: "Bạn phải nhập giá" });
      return;
    } else {
      this.setState({
        priceErr: "",
      });
    }

    const method = currentItem ? 'PUT' : 'POST';
    const url = currentItem ? ("http://localhost:3001/api/service/" + currentItem._id) : "http://localhost:3001/api/service";
    const requestOptions = {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name : name,
          price:price
        })
    };

    fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log("update success:", data);
            alert("Thêm thành công ")
            this.props.history.push("/service")
        }).catch((error) => {
            console.error('Error:', error);
        });
  }

  render() {
    const {
      name,
      price,
      nameErr,
      priceErr
    } = this.state;
    return (
      <div
        style={{
          backgroundColor: "#73818f",
          marginLeft: "27%",
          padding: "20px",
          width: "800px",
          color:'white',
        }}
      >
        <h5 style={{ marginBottom:'32px', fontSize:'32px'}}> Thêm dịch vụ</h5>
        <Row>
          <Col xs="12">
            <FormGroup style={{ display: "flex" }}>
              <Label htmlFor="name">Name</Label>
              <Input
                style={{ width: "50%", marginLeft: "50px" }}
                type="text"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(event) => this.isChangeName(event)}
                required
              />
            </FormGroup>
            <p
              className="help-block text-danger"
              style={{ color: "red", marginLeft: "90px", fontSize: "20px" }}
            >
              {nameErr}
            </p>
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <FormGroup style={{ display: "flex" }}>
              <Label htmlFor="name">Price</Label>
              <Input
                style={{ width: "50%", marginLeft: "55px" }}
                type="text"
                id="name"
                placeholder="Enter your price"
                required
                value={price}
                onChange={(event) => this.isChangePrice(event)}
              />
             </FormGroup>
             <p
              className="help-block text-danger"
              style={{ color: "red", marginLeft: "90px", fontSize: "20px" }}
            >
              {priceErr}
            </p> 
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
export default AddService;
