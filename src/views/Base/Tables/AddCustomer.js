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

import './index.css';

const optionMale = [
  { value: "Nam", label: "Nam" },
  { value: "Nữ", label: "Nữ" },
];



class AddCustomer extends Component {
  constructor(props) {
    super(props);

    const currentItem = props.location?.state?.currentItem
    const maleUpdate = optionMale.find(e => e.label == currentItem?.isMale );

    console.log("Table truyen sang la :", currentItem);

    this.state = {
      name: currentItem?.name||"",
      address: currentItem?.address ||"",
      cccd: currentItem?.cccd ||"",
      email: currentItem?.email||"",
      sdt: currentItem?.sdt || "",
      isMale: maleUpdate || "",
      nameErr: "",
      addressErr: "",
      cccdErr: "",
      emailErr: "",
      sdtErr: "",
      maleErr:"",
      selectedOptionMale:null,
    };
  }

  isChangeName = (event) => {
    this.setState({
      name: event.target.value,
    });
  };
  isChangeAddress = (event) => {
    this.setState({
      address: event.target.value,
    });
  };
  isChangeCccd = (event) => {
    this.setState({
      cccd: event.target.value,
    });
  };
  isChangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };
  isChangePhone = (event) => {
    this.setState({
      sdt: event.target.value,
    });
  };

  isChangeMale = selectedOptionMale => {
    this.setState({  selectedOptionMale },() => console.log(`Option selected:`, this.state.selectedOptionMale));
  };

  submitForm() {
    const {
      name,
      address,
      cccd,
      email,
      sdt,
      isMale,
      nameErr,
      addressErr,
      cccdErr,
      emailErr,
      sdtErr,
      maleErr,
      selectedOptionMale
    } = this.state;
    const currentItem = this.props.location.state?.currentItem;
    const maleUpdate = optionMale.find(e => e.label == currentItem?.isMale );


    if (name.toString().trim().length === 0) {
      this.setState({ nameErr: "Bạn phải nhập tên" });
      return;
    } else {
      this.setState({
        nameErr: "",
      });
    }
    if (address.toString().trim().length === 0) {
      this.setState({ addressErr: "Bạn phải nhập địa chỉ" });
      return;
    } else {
      this.setState({
        addressErr: "",
      });
    }
    if (cccd.toString().trim().length === 0) {
      this.setState({ cccdErr: "Bạn phải nhập số cccd" });
      return;
    } else {
      this.setState({
        cccdErr: "",
      });
    }
    if (email.toString().trim().length === 0) {
      this.setState({ emailErr: "Bạn phải nhập email" });
      return;
    } else {
      this.setState({
        emailErr: "",
      });
    }
    if (sdt.toString().trim().length === 0) {
      this.setState({ sdtErr: "Bạn phải nhập sdt" });
      return;
    } else {
      this.setState({
        sdtErr: "",
      });
    }
    if (selectedOptionMale == null ) {
      this.setState({ maleErr: 'Bạn phải chọn giới tính' });
      return;
  }else{
    this.setState({
      maleErr:""
    });
  }

    const method = currentItem ? 'PUT' : 'POST';
    const url = currentItem ? ("http://localhost:3001/api/customer/" + currentItem._id) : "http://localhost:3001/api/customer";
    const requestOptions = {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name : name,
          address:address,
          cccd:cccd,
          email:email,
          sdt:sdt,
          isMale:selectedOptionMale.label
        })
    };

    fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log("update success:", data);
            alert("Thêm thành công ")
            this.props.history.push("/base/tables")
        }).catch((error) => {
            console.error('Error:', error);
        });
  }

  render() {
    const {
      name,
      address,
      cccd,
      email,
      sdt,
      isMale,
      nameErr,
      addressErr,
      cccdErr,
      emailErr,
      sdtErr,
      selectedOptionMale,
      maleErr
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
        <h5 style={{ marginBottom:'32px', fontSize:'32px'}}> Thêm khách hàng</h5>
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
              <Label htmlFor="name">Address</Label>
              <Input
                style={{ width: "50%", marginLeft: "38px" }}
                type="text"
                id="name"
                placeholder="Enter your address"
                required
                value={address}
                onChange={(event) => this.isChangeAddress(event)}
              />
            </FormGroup>
            <p
              className="help-block text-danger"
              style={{ color: "red", marginLeft: "90px", fontSize: "20px" }}
            >
              {addressErr}
            </p>
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <FormGroup style={{ display: "flex" }}>
              <Label htmlFor="name">CCCD</Label>
              <Input
                style={{ width: "50%", marginLeft: "50px" }}
                type="text"
                id="name"
                placeholder="Enter your cccd"
                required
                value={cccd}
                onChange={(event) => this.isChangeCccd(event)}
              />
            </FormGroup>
            <p
              className="help-block text-danger"
              style={{ color: "red", marginLeft: "90px", fontSize: "20px" }}
            >
              {cccdErr}
            </p>
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <FormGroup style={{ display: "flex" }}>
              <Label htmlFor="name">Email</Label>
              <Input
                style={{ width: "50%", marginLeft: "50px" }}
                type="text"
                id="name"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(event) => this.isChangeEmail(event)}
              />
            </FormGroup>
            <p
              className="help-block text-danger"
              style={{ color: "red", marginLeft: "90px", fontSize: "20px" }}
            >
              {emailErr}
            </p>
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <FormGroup style={{ display: "flex" }}>
              <Label htmlFor="name">SDT</Label>
              <Input
                style={{ width: "50%", marginLeft: "58px" }}
                type="text"
                id="name"
                placeholder="Enter your sdt"
                required
                value={sdt}
                onChange={(event) => this.isChangePhone(event)}
              />
            </FormGroup>
            <p
              className="help-block text-danger"
              style={{ color: "red", marginLeft: "90px", fontSize: "20px" }}
            >
              {sdtErr}
            </p>
          </Col>
        </Row>
        <Row >
          <Col lg="3">
            <label>Male:</label>
          </Col>
          <Col lg="9" >
            <Select
              // value={male}
              value={selectedOptionMale}
              onChange={(event) => this.isChangeMale(event)}
              options={optionMale}
              placeholder="Male"
            />
            <p className="help-block text-danger">{maleErr}</p>
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
export default AddCustomer;
