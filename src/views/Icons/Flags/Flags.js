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
import './style.css'

class Employer extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      employerData: [],
      currentItem:null,
      currentName:null,
      modal:false,
      status:''
    };
    this.toggle = this.toggle.bind(this);
  }
  componentDidMount() {
    this.getEmployerData();
  }

  addAccount = (event) => {
    // event.preventDefault();
    console.log("Add employer click")
    this.props.history.push("/addemployer")
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
      pathname: '/addemployer',
      state: { currentItem: item }
    })
  }
  listRoom =() =>{
    console.log("ListRoom Clicked")

  }

  getEmployerData() {
    fetch("http://localhost:3001/users/get-list", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("List account :", data.data.user);
        this.setState({
          employerData: data.data.user
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
    
    fetch('http://localhost:3001/users/get-list' + currentItem, { method: 'DELETE' })
    .then( () => alert("Delete success "))
    //   .then(() => this.setState({ status: 'Delete successful' }));
  }




  render() {
    const { employerData , currentName } = this.state;
    console.log("Customer data", employerData);

    return (
       <div className="animated fadeIn">
        <Row>
          <Col xs="12" lg="12">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><h3 style={{ color : "white"}}> Danh sách nhân viên </h3> 
                <Button
                  onClick={() => this.addAccount()}
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
                      <th>Email</th>
                      <th>Password</th>
                      <th> Thao tác </th>
                    </tr>
                  </thead>
                  <tbody>
                    {employerData.map((item, index) => {
                      return (
                        <tr> 
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td>{item.password}</td>
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

export default Employer;
