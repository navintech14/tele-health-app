import { useEffect, useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASEURL } from './baseURL';
import { AppContext } from './App';


function DoctorList() {

  const [doctorList, setDoctorList] = useState([]);
  const {chosenDoctor, setChosenDoctor} = useContext(AppContext);
  const navigate = useNavigate();

    
    useEffect(()=>{
        axios.get(BASEURL + "/profile/doctor_profile_list/",{
        }).then(function (response) {
            setDoctorList(response.data);
          })
          .catch(function (error) {
            console.log(error);
        });
    }, [])
  return (
    <ul className="list-unstyled">
        {doctorList.map((doctor) =>(
            <li key={doctor.id}>
              <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>{doctor.name}</Card.Title>
                  <Badge bg="secondary">{doctor.specialization}</Badge>
                  <Card.Text>{`${doctor.experience} years of experience`}</Card.Text>
                  <Card.Text>{doctor.city}</Card.Text>
                  <Card.Text>{`₹${doctor.cost} consultation fee`}</Card.Text>
                </Card.Body>
                <Button 
                  variant="success" 
                  className="mb-3" 
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setChosenDoctor(doctor.user);
                    navigate("/doctor_detail")}}>
                    Video Consult
                </Button>
              </Card>
            </li>
        ))}
    </ul>
  )
}

export default DoctorList