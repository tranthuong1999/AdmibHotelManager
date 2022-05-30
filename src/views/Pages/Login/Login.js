import React, { Component } from "react";
import "./index.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      accountData:'',
      emailErr:"",
      passwordErr:""
    };
  }

  componentDidMount() {  
    const userLocal = localStorage.getItem("USER")
    console.log("userLocal ::" , userLocal)
    if(userLocal !== null){
    this.props.history.push("/dashboard")

    }
}

// getAccountData() {
//    fetch("http://localhost:3001/api/login", {
//      headers: {
//        "Content-Type": "application/json",
//        Accept: "application/json",
//      },
//    })
//      .then((response) => response.json())
//      .then((data) => {
//       //  console.log("List account data:", data);
//        this.setState({
//          accountData: data.account,
//        });
//      });
//  }

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

  handleSubmit(event) {
    const { email , password , emailErr , passwordErr } = this.state;
    event.preventDefault();
    console.log("submit click")
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.toString().trim().length === 0) {
      this.setState({ emailErr: "Please enter email " });
      return;
    } else if (reg.test(email) === false) {
      this.setState({
        emailErr: " Email is invalid",
      });
    } else {
      this.setState({
        emailErr: "",
      });
    }
    if (password.toString().trim().length === 0) {
      this.setState({ passwordErr: "Please enter password " });
      return;
    } else {
      this.setState({
        passwordErr: "",
      });
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({  
         email:email,
         password:password
         })
  };
  fetch('http://localhost:3001/auth/login', requestOptions)
      .then(response => response.json())
      .then(data => {
        const user = data ;
        console.log("user ::" , user)
        if( email == 'thuongtranmcbook@gmail.com' && password =="12345678"){
          localStorage.setItem('USER', JSON.stringify(user));
          this.props.history.push("/dashboard")
        }
        else{
          alert("Account is not correctly ")
        }
      });

  }

  render() {
    const { email, password , emailErr , passwordErr } = this.state;
    return (
      <div className="container">
        <h1 style={{ textAlign:"center"}}> Hotel Mannager </h1>
        <form onSubmit={(event) =>this.handleSubmit(event)}>
          <div className="child1">
            <label >
              Email:
              <input
                name="emailOrUsername"
                type="text"
                value={email}
                onChange={(event) => this.isChangeEmail(event)}
                style={{ marginLeft:"45px" , width:"333px" , marginBottom:"25px" , marginTop:"30px" }}
              />
            </label>
            <p style={{ color:'red', fontSize:"20px" , marginLeft:"81px"}}> { emailErr}</p>
          </div>
          <div className="child2">
            <label>
              Password:
              <input
                name="password"
                type="password"
                value={password}
                onChange={(event) => this.isChangePassword(event)}

                style={{ marginLeft:"22px" , width:"333px" }}
              />
            </label>
            <p style={{ color:'red', fontSize:"20px" , marginLeft:"81px"}} > {passwordErr}</p>
          </div>

          <button className="login" type="submit" >Log in</button>
        </form>
      </div>
    );
  }
}
export default Login;
