import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  Table,
  Button,
  Modal,
  ModalBody, ModalFooter, ModalHeader
} from "reactstrap";

import './style.css';


class Hotel extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      hotelData: [],
      currentItem:null,
      currentName:null,
      modal:false,
      status:''
    };
    this.toggle = this.toggle.bind(this);

  }

  
  componentDidMount() {
    this.getHotelData();
  }
 

  addCustomer = (event) => {
    // event.preventDefault();
    console.log("Add custmer click")
    this.props.history.push("/addhotel/null")
  }

  imageDeleteClick = (item) => {
    this.setState({
      currentItem: item._id,
      currentName:item.nameHotel
    });
    this.toggle();
  }
  
  imageEditClick =(item) =>{
    console.log("edit clicked")
    console.log("item" , item)
    this.props.history.push({
      pathname: '/addhotel/' +  item._id,
      state: { currentItem: item }
    })
  }
  listRoom =() =>{
    console.log("ListRoom Clicked")
  }
 

  getHotelData() {
    fetch("http://localhost:3001/api/hotel", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("List hotel:", data.hotel);
        this.setState({
          hotelData: data.hotel,
        });
      });
  }
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  delete =() =>{
    const { currentItem } = this.state;
    this.toggle();
    console.log("Item clicked" , currentItem)
    
    fetch('http://localhost:3001/api/hotel/' + currentItem, { method: 'DELETE' })
    .then( () => alert("Delete success "))
    //   .then(() => this.setState({ status: 'Delete successful' }));
  }

  render() {
    const { hotelData , currentName } = this.state;
    // console.log("Hotel data", hotelData);
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><h3 style={{ color : "white"}}> Danh sách khách sạn </h3> 
                <Button
                  onClick={() => this.addCustomer()}
                  block
                  color="success"
                  style={{ width: "10%", marginTop: "12px" }}
                >
                  {" "}
                  Thêm mới
                </Button>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Code Hotel</th>
                      <th>Name Hotel</th>
                      <th>Address</th>
                      <th>Introduce</th>
                      <th>Title</th>
                      <th>Image Hotel</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hotelData.map((item, index) => { 
                      // console.log("item image " , item)
                      const imageItems = item.image.split("ABC")
                      console.log("item image " , imageItems)

                      return (
                        <tr> 
                          <td>{item.codeHotel}</td>
                          <td>{item.nameHotel}</td>
                          <td>{item.address}</td>
                          <td>{item.introduce}</td>
                          <td>{item.title}</td>
                          <td style={{display:"flex"}}> { imageItems.map( (e) =>{
                            return <img  style={{ width:'13%' , marginRight:'10px'}} src= {e} />

                          })} </td>
                          <td>
                        <Button
                          onClick={() => this.imageEditClick(item)}
                          block
                          color="primary"
                        >
                          {" "}
                          Sửa
                        </Button>
                      </td>
                      <td>
                      <Button
                          onClick={() => this.imageDeleteClick(item)}
                          block
                          color="warning"
                        >
                          {" "}
                          Xóa
                        </Button>
                      </td>
                      <td>
                        <Button
                          block
                          color="success"
                          onClick={() => this.listRoom(item)}
                        >
                          Danh sách phòng
                        </Button>
                      </td>
                      <td>
                        <Button
                          block
                          color="danger"
                        >
                          {" "}
                          Quản lý thuê phòng
                        </Button>
                      </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
                <Pagination>
                  <PaginationItem>
                    <PaginationLink previous tag="button"></PaginationLink>
                  </PaginationItem>
                  <PaginationItem active>
                    <PaginationLink tag="button">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink tag="button">4</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink next tag="button"></PaginationLink>
                  </PaginationItem>
                </Pagination>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody style={{ fontSize:'30px'}}>
            Bạn có chắc chắn muốn xóa khách sạn  : {currentName} 
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() =>this.delete()}>Delete</Button>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
      
    );
  }
}

export default Hotel;
