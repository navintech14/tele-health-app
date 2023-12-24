import { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { BASEURL } from './baseURL';
import { AppContext } from './App';

function LoginForm(){

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {isDoctor, setIsDoctor, id, setId, loggedIn, setLoggedIn} = useContext(AppContext);
  

  const navigate = useNavigate();


  async function  LoginUser(){
    axios.post(BASEURL + "/auth/jwt/create/",{
      username: username,
      password: password
    }).then(function (response) {
      localStorage.setItem("access",JSON.stringify(response.data["access"]));
      localStorage.setItem("refresh",JSON.stringify(response.data["refresh"]));
        axios.get(BASEURL + "/auth/users/me/",{
          headers: {
            authorization: "JWT "+ JSON.parse(localStorage.getItem("access"))
          }
        }).then(function (response) {
          console.log(response.data);
          setId((response.data["id"]));
          setLoggedIn(true);
          setIsDoctor(response.data["isDoctor"]);
          response.data["isDoctor"] ? navigate("/home_page_doctor") : navigate("/home_page_patient");
        }).catch(function (error) { 
          console.log(error);
        });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return(
    <div className="container d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
    <Form className ="p-5 bg-light border rounded mx-auto col-lg-6">
    <h2 className="mb-4 text-center">Login Form</h2>

    <Form.Group controlId="LoginForm.username">
      <Form.Label>Username</Form.Label>
      <Form.Control
          type= "text"
          placeholder="Username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
    </Form.Group>

    <Form.Group controlId="LoginForm.password">
      <Form.Label>Password</Form.Label>
      <Form.Control
          type= "password"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
      />
    </Form.Group>
    <div className="row">
     <div className="mt-3" ></div>
    <Button 
      variant="primary" 
      className="btn btn-primary btn-block" 
      type="submit"
      onClick={(e) => {
        e.preventDefault(); 
        LoginUser();
       }}>
        Login
    </Button>
    <Link className="col-12 col-md-6 text-md-right" to='/register'>
        Register
    </Link>
    </div>
    </Form>
    </div>
  );
}

export default LoginForm;