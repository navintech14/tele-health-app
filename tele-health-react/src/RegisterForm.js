import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { BASEURL } from './baseURL';


function RegisterForm() {

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isDoctor, setIsDoctor] = useState(false);
  const navigate = useNavigate();


    function postUserData(){
      axios.post(BASEURL + "/auth/users/",{
        email: email,
        username: username,
        password: password,
        isDoctor: isDoctor
      }).then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    return (
      <Form style={
        {margin: 10}
      }>
        <Form.Group className="mb-3" controlId="RegisterFrom.email">
        <Form.Label>Email</Form.Label>
        <Form.Control
            type = "text"
            placeholder="Email ID"
            required
            onChange={(e) => setEmail(e.target.value)}
        />
        </Form.Group>

        <Form.Group className="mb-3" controlId="RegisterFrom.username">
        <Form.Label>Username</Form.Label>
        <Form.Control
            type= "text"
            placeholder="Username"
            required
            onChange={(e) => setUsername(e.target.value)}
        />
        </Form.Group>

        <Form.Group className="mb-3" controlId="RegisterFrom.password">
        <Form.Label>Password</Form.Label>
        <Form.Control
            type= "password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
        />
        <Form.Text id="passwordHelpBlock" muted>
        Your password must be 8-20 characters long.
        </Form.Text>
        </Form.Group>

        <Form.Check 
          className="mb-3" 
          id="RegisterFrom.isDoctor"
          type = "checkbox"
          label = "I am a Doctor"
          onChange={() => setIsDoctor(true)}
        />
        

        <Button 
          variant="primary" 
          className="mb-3" 
          type="submit"
          onClick={(e) => {
            e.preventDefault(); 
            postUserData();
            navigate("/login")}}>
            Register
        </Button>
        <Link className="mb-3" to='/login'>
          Login
        </Link>
      </Form>
    );
}

export default RegisterForm;