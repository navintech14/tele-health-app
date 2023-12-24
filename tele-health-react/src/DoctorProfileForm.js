import { useState, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { BASEURL } from './baseURL';
import { AppContext } from './App';



function DoctorProfileForm() {

  const [name, setName] = useState("");
  const [experience, setExperience] = useState(0);
  const [cost, setCost] = useState(0);
  const [city, setCity] = useState("");
  const [about, setAbout] = useState("");
  const [degrees, setDegrees] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [address, setAddress] = useState("");
  const navigate = useNavigate();

  const { id, setDoctorId} = useContext(AppContext);

  function postDoctorProfileData()
  {
    const myUser = id;
    console.log("---------------" + myUser)
    axios.post(BASEURL + "/profile/doctor_profile_list/",{
        headers: {
            authorization: "JWT "+ JSON.parse(localStorage.getItem("access"))
          },
        name: name,
        experience: experience,
        city: city,
        cost: cost,
        about: about,
        degrees: degrees,
        specialization: specialization,
        address: address,
        city: city,
        user: myUser
    }).then(function (response) {
        setDoctorId(response.data.id);
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
        <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
                type = "text"
                placeholder="Your Full Name"
                required
                onChange={(e) => setName(e.target.value)}
            />
        </Form.Group>

        <Form.Group className="mb-3" controlId="experience">
            <Form.Label>Experience</Form.Label>
            <Form.Control
                type = "number"
                placeholder="Experience (In years)"
                required
                onChange={(e) => setExperience(e.target.value)}
            />
        </Form.Group>

        <Form.Group className="mb-3" controlId="degrees">
            <Form.Label>Degree</Form.Label>
            <Form.Control
                type = "text"
                placeholder="Enter degrees as comma seperated values"
                required
                onChange={(e) => setDegrees(e.target.value)}
            />
        </Form.Group>

        <Form.Group className="mb-3" controlId="specialization">
            <Form.Label>Specialization</Form.Label>
            <Form.Select 
                onChange={(e) => setSpecialization(e.target.value)}
                required>
                <option>Your Specilization</option>
                <option value="General Health">General Health</option>
                <option value="Pediatrician">Pediatrician</option>
                <option value="Dentist">Dentist</option>
                <option value="Orthopedist">Orthopedist</option>
                <option value="Dermatologist">Dermatologist</option>
            </Form.Select>
        </Form.Group>


        <Form.Group className="mb-3" controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
                type = "number"
                placeholder="Price per slot"
                required
                onChange={(e) => setCost(e.target.value)}
            />
        </Form.Group>

        <Form.Group className="mb-3" controlId="location">
            <Form.Label>Location</Form.Label>
            <Form.Select
                onChange={(e) => setCity(e.target.value)}
                required>
                <option>City</option>
                <option value="Chennai">Chennai</option>
                <option value="Delhi">Delhi</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Kolkata">Kolkata</option>
                <option value="Hydrabad">Hydrabad</option>
                <option value="Banglore">Banglore</option>         
            </Form.Select>
        </Form.Group>

    
        <Form.Group className="mb-3" controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
                as="textarea" 
                rows={2}
                type = "text"
                placeholder="Your clinic Address"
                required
                onChange={(e) => setAddress(e.target.value)}
            />
        </Form.Group>

        
        <Form.Group className="mb-3" controlId="about">
            <Form.Label>About</Form.Label>
            <Form.Control
                as="textarea" 
                rows={5}
                type = "text"
                placeholder="Tell us about Yourself"
                required
                onChange={(e) => setAbout(e.target.value)}
            />
        </Form.Group>

        <Button 
          variant="primary" 
          className="mb-3" 
          type="submit"
          onClick={(e) => {
            e.preventDefault(); 
            postDoctorProfileData();
            navigate("/home_page_doctor")}}>
            Submit
        </Button>
    </Form>
  )
}

export default DoctorProfileForm