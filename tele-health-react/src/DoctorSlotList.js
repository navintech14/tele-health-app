import { useEffect, useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { BASEURL } from './baseURL';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { AppContext } from './App';
import { useNavigate, Link } from 'react-router-dom';



function DoctorSlotList( {slotList, setSlotList} ) {

  const {isDoctor, setIsDoctor, doctorId, setSelectedPatient} = useContext(AppContext);
  const navigate = useNavigate();
  
  useEffect(()=>{
    const callSlotList = async() =>{
      try{
        const response = await axios.get(BASEURL + `/profile/book_slots_list/${doctorId}`);
        console.log("from doctor slot list use effect")
        console.log(response.data);
        setSlotList(response.data);
      }
      catch(error){
        console.error(error);
      }}
      callSlotList();
  }, [doctorId]);

  return (
    <Container className="m-1">
    <Row>
    <ul className="list-unstyled">
    
      {slotList.map((slot) =>(
        <li key={slot.id}>
          <Card className="mb-4" style={{ maxWidth: '350px' }}>
          <Card.Title tag="h5">{slot.patientProfile? slot.patientProfile.name : "Not Booked"}</Card.Title>
          <Card.Text>Date: {slot.booking_date}</Card.Text>
          <Card.Text>Start Time: {slot.start_time}</Card.Text>
          <Card.Text>End Time: {slot.end_time}</Card.Text>
          {slot.patientProfile &&
            <Button
            variant="primary"
            className="custom-btn" 
            style={{ width: "50%" }}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              console.log(slot.patientProfile)
              setSelectedPatient(slot.patientProfile.id);
              navigate("/patient_detail");
              }}>
              See Details
              </Button>
            }
            {slot.patientProfile &&
              <Button
              variant="primary"
              className="custom-btn mt-2" 
              style={{ width: "50%" }}
              type="button"
              onClick={(e) => {
                e.preventDefault();
              }}>
                Call
            </Button>
            }
            
          </Card>
        </li>
      ))}
    
    </ul>
    </Row>
    </Container>
  )
}

export default DoctorSlotList