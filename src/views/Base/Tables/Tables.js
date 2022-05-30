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


class Tables extends Component {
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
    this.getCustomerData();
  }

  addCustomer = (event) => {
    // event.preventDefault();
    console.log("Add custmer click")
    this.props.history.push("/addcustomer")
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
      pathname: '/addcustomer',
      state: { currentItem: item }
    })
  }
 

  getCustomerData() {
    fetch("http://localhost:3001/api/customer", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("List customer:", data);
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
    
    fetch('http://localhost:3001/api/customer/' + currentItem, { method: 'DELETE' })
      // .then(() => this.setState({ status: 'Delete successful' }));
      .then( () => alert("Xóa thành công "))
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
                <i className="fa fa-align-justify"></i><h3 style={{ color : "white"}}> Danh sách khách hàng </h3> 
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
                      <th>Name</th>
                      <th>Address</th>
                      <th>CCCD</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Male</th>
                      <th>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customerData.map((item, index) => {
                      return (
                        <tr> 
                          <td>{item.name}</td>
                          <td>{item.address}</td>
                          <td>{item.cccd}</td>
                          <td>{item.email}</td>
                          <td>{item.sdt}</td>
                          <td>{item.isMale}</td>
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

export default Tables;
