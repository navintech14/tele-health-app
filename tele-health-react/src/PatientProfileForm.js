import { useState, useContext} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import { BASEURL } from './baseURL';
import { AppContext } from './App';


function PatientProfileForm() {
    const [name, setName] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [gender, setGender] = useState("");
    const [bloodGroup, setBloodGroup] = useState("");
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const navigate = useNavigate();

    const {id, setPatientId} = useContext(AppContext);


    function postPatientProfileData()
    {
        const myUser = id;
        console.log(name, birthdate, gender, bloodGroup, height, weight, myUser)
        axios.post(BASEURL + "/profile/patient_profile_list/",{
            headers: {
                authorization: "JWT "+ JSON.parse(localStorage.getItem("access"))
              },
              name: name,
              birthdate: birthdate,
              gender: gender,
              bloodGroup: bloodGroup,
              height: height,
              weight: weight,
              user: myUser
    }).then(function (response) {
        console.log(response);
        setPatientId(response.data.id);
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

        <Form.Group className="mb-3" controlId="birthdate">
            <Form.Label>Birth Date</Form.Label>
            <Form.Control
                type = "date"
                required
                onChange={(e) => setBirthdate(e.target.value)}
            />
        </Form.Group>

        <Form.Group className="mb-3" controlId="gender">
            <Form.Label>Gender</Form.Label>
            <Form.Select
                onChange={(e) => setGender(e.target.value)}
                required>
                <option>Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>     
            </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="bloodGroup">
            <Form.Label>Blood Group</Form.Label>
            <Form.Select
                onChange={(e) => setBloodGroup(e.target.value)}
                required>
                <option>Blood Group</option>
                <option value="A Positive">A Positive</option>
                <option value="A Negative">A Negative</option>     
                <option value="B Positive">B Positive</option>
                <option value="B Negative">B Negative</option>   
                <option value="O Positive">O Positive</option>
                <option value="O Negative">O Negative</option>   
                <option value="AB Positive">AB Positive</option>
                <option value="AB Negative">AB Negative</option>   
            </Form.Select>
        </Form.Group>


        <Form.Group className="mb-3" controlId="height">
            <Form.Label>Height</Form.Label>
            <Form.Control
                type = "number"
                placeholder="Height in cms"
                required
                onChange={(e) => setHeight(e.target.value)}
            />
        </Form.Group>

        <Form.Group className="mb-3" controlId="weight">
            <Form.Label>Height</Form.Label>
            <Form.Control
                type = "number"
                placeholder="Weight in kgs"
                required
                onChange={(e) => setWeight(e.target.value)}
            />
        </Form.Group>

        <Button 
          variant="primary" 
          className="mb-3" 
          type="submit"
          onClick={(e) => {
            e.preventDefault(); 
            postPatientProfileData();
            navigate("/home_page_patient")
            }}>
            Submit
        </Button>


        </Form>
    );
}

export default PatientProfileForm
