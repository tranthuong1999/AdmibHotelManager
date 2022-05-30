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
import axios from "axios";
import "./style.css";
import { storage } from "./firebase";

class AddHotel extends Component {
  constructor(props) {
    super(props);

    const currentItem = props.location?.state?.currentItem;
    console.log("current item :" , currentItem)
    const currentImage = currentItem?.image.split("ABC")
    this.state = {
      codeHotel: currentItem?.codeHotel || "",
      nameHotel: currentItem?.nameHotel || "",
      address: currentItem?.address || "",
      introduce: currentItem?.introduce || "",
      title: currentItem?.title || "",
      images:  [],
      codeHotelErr: "",
      nameHotelErr: "",
      addressErr: "",
      introduceErr: "",
      titleErr: "",
      urls: currentImage || [],
    };
  }

  isChangeCodeHotel = (event) => {
    this.setState({
      codeHotel: event.target.value,
    });
  };
  isChangeName = (event) => {
    this.setState({
      nameHotel: event.target.value,
    });
  };
  isChangeAddress = (event) => {
    this.setState({
      address: event.target.value,
    });
  };
  isChangeIntroduce = (event) => {
    this.setState({
      introduce: event.target.value,
    });
  };
  isChangeTitle = (event) => {
    this.setState({
      title: event.target.value,
    });
  };
  componentDidMount() {
    this.checkID()
  
    }
    
    checkID =() =>{
      const idParam = this.props.match.params.id
      console.log("idParams :" , idParam)
      if(idParam){
        fetch('http://localhost:3001/api/hotel/' +idParam)
        .then(response => response.json())
        .then(data => {
         console.log("data data res : :" , data)
        });
      }
    }
  
  handleChangeImage = (e) => {
    const { images } = this.state;
    const newArrImage = [];
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      newImage["id"] = Math.random();
      newArrImage.push(newImage);
      // console.log("imageeeeeeeeee" , newArrImage)
    }
    this.setState({
      images: images.concat(newArrImage),
    });
  };

  handleUpload = (e) => {
    // console.log("Handel click ");
    const promises = [];
    const { urls, images } = this.state;

    images.map((image) => {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      promises.push(uploadTask);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          this.setState({ progress });
        },
        (error) => {
          console.log(error);
        },
        async () => {

          const  result = await storage.ref("images").child(image.name).getDownloadURL()
          urls.push(result)
          this.setState({
           urls : urls
          });
        }
      );
    });
  };

  submitForm() {
    const {
      codeHotel,
      nameHotel,
      address,
      introduce,
      title,
      images,
      codeHotelErr,
      nameHotelErr,
      addressErr,
      introduceErr,
      titleErr,
      urls,
    } = this.state;
    const currentItem = this.props.location.state?.currentItem;

    if (codeHotel.toString().trim().length === 0) {
      this.setState({ codeHotelErr: "Please code hotel " });
      return;
    } else {
      this.setState({
        codeHotelErr: "",
      });
    }
    if (nameHotel.toString().trim().length === 0) {
      this.setState({ nameHotelErr: "Please enter name hotel" });
      return;
    } else {
      this.setState({
        nameHotelErr: "",
      });
    }
    if (address.toString().trim().length === 0) {
      this.setState({ addressErr: "Please enter address" });
      return;
    } else {
      this.setState({
        addressErr: "",
      });
    }
    if (introduce.toString().trim().length === 0) {
      this.setState({ introduceErr: "Please enter introduce" });
      return;
    } else {
      this.setState({
        introduceErr: "",
      });
    }
    if (title.toString().trim().length === 0) {
      this.setState({ titleErr: "Please enter title" });
      return;
    } else {
      this.setState({
        titleErr: "",
      });
    }
    console.log("urlsssssssss" ,urls)

    const method = currentItem ? "PUT" : "POST";
    const requestUrl = currentItem
      ? "http://localhost:3001/api/hotel/" + currentItem._id
      : "http://localhost:3001/api/hotel";
      const newUrl = urls.join("ABC")

    const requestOptions = {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        codeHotel: codeHotel,
        nameHotel: nameHotel,
        address: address,
        introduce: introduce,
        title: title,
        image: newUrl,
      }),
    };
    console.log("requestOptions" , requestOptions)
    console.log("requestUrl" , requestUrl)


     

    fetch(requestUrl, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        alert("Thêm thành công ");
        console.log("datassss :=" ,data)
        // this.props.history.push("/buttons/hotel");
      })
      .catch((error) => {
        // console.error("Error:", error);
      });
  }

  render() {
    const {  codeHotel, nameHotel, address, introduce, title, urls , images} = this.state
    console.log("imagesss :" ,urls)

    return (
      <div
        style={{
          // backgroundColor: "coral",
          marginLeft: "27%",
          padding: "20px",
          width: "800px",
        }}
      >
        <h5 style={{ color: "white", fontSize: "30px", marginBottom: "50px" }}>
          {" "}
          Thêm khách sạn{" "}
        </h5>
        <Row>
          <Col xs="12">
            <FormGroup style={{ display: "flex" }}>
              <Label htmlFor="name">CodeHotel</Label>
              <Input
                style={{ width: "50%", marginLeft: "38px" }}
                type="text"
                id="name"
                placeholder="Enter your address"
                required
                value={codeHotel}
                onChange={(event) => this.isChangeCodeHotel(event)}
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
              <Label htmlFor="name">Name</Label>
              <Input
                style={{ width: "50%", marginLeft: "66px" }}
                type="text"
                id="name"
                placeholder="Enter your cccd"
                required
                value={nameHotel}
                onChange={(event) => this.isChangeName(event)}
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
              <Label htmlFor="name">Address</Label>
              <Input
                style={{ width: "50%", marginLeft: "50px" }}
                type="text"
                id="name"
                placeholder="Enter your email"
                required
                value={address}
                onChange={(event) => this.isChangeAddress(event)}
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
        <Row>
          <Col xs="12">
            <FormGroup style={{ display: "flex" }}>
              <Label htmlFor="name">Introduce</Label>
              <Input
                style={{ width: "50%", marginLeft: "40px" }}
                type="text"
                id="name"
                placeholder="Enter your sdt"
                required
                value={introduce}
                onChange={(event) => this.isChangeIntroduce(event)}
              />
            </FormGroup>
            {/* <p
              className="help-block text-danger"
              style={{ color: "red", marginLeft: "90px", fontSize: "20px" }}
            >
              {sdtErr}
            </p> */}
          </Col>
        </Row>
        <Row>
          <Col xs="12">
            <FormGroup style={{ display: "flex" }}>
              <Label htmlFor="name">Title</Label>
              <Input
                style={{ width: "50%", marginLeft: "70px" }}
                type="text"
                id="name"
                placeholder="Enter your sdt"
                required
                value={title}
                onChange={(event) => this.isChangeTitle(event)}
              />
            </FormGroup>
            {/* <p
              className="help-block text-danger"
              style={{ color: "red", marginLeft: "90px", fontSize: "20px" }}
            >
              {sdtErr}
            </p> */}
          </Col>
        </Row>
        <Row style={{ marginLeft: "89px", marginBottom: "20px" }}>
          <div>
            <input
              style={{ marginBottom: "13px", marginLeft: "26px" }}
              type="file"
              multiple
              onChange={(e) => this.handleChangeImage(e)}
            />
            <div> {
           urls.map( (e , i) =>{
             return < img style={{ marginLeft:"10px"}} src ={e} height="100" width="100"  />
           })
           }
           </div>
            <div></div>
          </div>
          <button
            className="btn btn-success btn-xl"
            style={{
              marginLeft: "10px",
              width: "64px",
              height: "34px",
              marginTop: "4px",
            }}
            onClick={(e) => this.handleUpload(e)}
          >
            {" "}
            upload{" "}
          </button>
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
export default AddHotel;
