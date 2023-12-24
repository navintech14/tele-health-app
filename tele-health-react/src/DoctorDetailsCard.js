import { useEffect, useState, useContext } from 'react';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { BASEURL } from './baseURL'; 
import { AppContext } from './App';
import { Button } from 'react-bootstrap';


function DoctorDetailsCard() {

    const [doctorDetail, setDoctorDetail] = useState([]);
    const [slotList, setSlotList] = useState([]);
    const {chosenDoctor, patientId} = useContext(AppContext);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    function bookSlot(key)
    {
      axios.patch(BASEURL+`/profile/book_slot_details/${key}`,{
        patientProfile:  {id: patientId},
      }).then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }


    useEffect(()=>{
        axios.get(BASEURL + `/profile/doctor_profile_details/${chosenDoctor}`,{
        }).then(function (response) {
            setDoctorDetail(response.data);
            axios.get(BASEURL +`/profile/book_slots_list/${response.data["id"]}`,{
            }).then(function (response) {
              setSlotList(response.data);
            }).catch(function (error){
              console.log(error);
            })
          })
          .catch(function (error) {
            console.log(error);
        });
    }, [chosenDoctor])


  return (
    <>
    <Card style={{ width: '18rem' }}>
        <Card.Body>
            <Card.Title>{doctorDetail.name}</Card.Title>
            <Badge bg="secondary">{doctorDetail.specialization}</Badge>
            <Card.Text>{doctorDetail.degrees}</Card.Text>
            <Card.Text>{`${doctorDetail.experience} years of experience`}</Card.Text>
            <Card.Text>{doctorDetail.city}</Card.Text>
            <Card.Text>{doctorDetail.address}</Card.Text>
            <Card.Text>{doctorDetail.about}</Card.Text>
            <Card.Text>{`₹${doctorDetail.cost} consultation fee`}</Card.Text>
        </Card.Body>
    </Card>

    <ul className="list-unstyled">
        {slotList.map((slot) => (
          <li key={slot.id}>
            <Button
              variant="primary"
              className="mb-3" 
              type="button"
              onClick={(e) => {
                e.preventDefault();
                bookSlot(slot.id);
                handleShow();
              }}>
              {
                `${slot.booking_date}
                 ${slot.start_time}`
              }
            </Button>
          </li>
        ))}
    </ul>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Yor Booking has been confirmed</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default DoctorDetailsCard