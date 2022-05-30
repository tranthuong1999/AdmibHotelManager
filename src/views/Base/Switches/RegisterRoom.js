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

import './index.css';


class RegisterRoom extends Component {
  constructor() {
    super();
    this.state = {
      customerData: [],
      currentItem:null,
      currentName:null,
      modal:false,
      status:''
    };
    this.toggle = this.toggle.bind(this);

  }
  componentDidMount() {
    this.getRegisterRoomData();
  }

  addRegisterRoom = (event) => {
    // event.preventDefault();
    console.log("Add custmer click")
    this.props.history.push("/addregisterrroom")
  }

  imageDeleteClick = (item) => {
    this.setState({
      currentItem: item._id,
      currentName:item.name
    });
    this.toggle();
  }
  
  imageEditClick =(item) =>{
    console.log("edit clicked")
    console.log("item" , item)
    this.props.history.push({
      pathname: '/addregisterroom',
      state: { currentItem: item }
    })
  }
 

  getRegisterRoomData() {
    fetch("http://localhost:3001/api/registerroom", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("List register room:", data);
        this.setState({
          customerData: data.customer,
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
    
    fetch('http://localhost:3001/customer/' + currentItem, { method: 'DELETE' })
      .then(() => this.setState({ status: 'Delete successful' }));
  }

  render() {
    const { customerData , currentName } = this.state;
    // console.log("Customer data", customerData);
    return (
      <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><h3 style={{ color : "white"}}> Danh sách đặt phòng </h3> 
                <Button
                  onClick={() => this.addRegisterRoom()}
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
                      <th>IDCustomer</th>
                      <th>IDRoom</th>
                      <th>IDAccount</th>
                      <th>StartDay</th>
                      <th>EndDay</th>
                      <th>Total</th>
                      <th>Pay</th>
                      <th> Status </th>
                    </tr>
                  </thead>
                  <tbody>
                    {customerData.map((item, index) => {
                      return (
                        <tr> 
                          <td>{item.idClient}</td>
                          <td>{item.idRoom}</td>
                          <td>{item.idAccount}</td>
                          <td>{item.start}</td>
                          <td>{item.end}</td>
                          <td>{item.total}</td>
                          <td>{item.pay}</td>
                          <td> {item.status}</td>

                          <td>
                        <Button
                          onClick={() => this.imageEditClick(item)}
                          block
                          color="primary"
                          style={{ marginLeft: '-115px' , heigth:'90px' ,width:"90px"}}
                        >
                          {" "}
                          Pendding
                        </Button>
                      </td>
                      <td>
                      <Button
                          onClick={() => this.imageDeleteClick(item)}
                          block
                          color="warning"
                          style={{ marginLeft: '-40px' , heigth:'90px' ,width:"90px"}}

                        >
                          {" "}
                          Confirm
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
            Bạn có chắc chắn muốn xóa khách hàng : {currentName} 
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

export default RegisterRoom;
