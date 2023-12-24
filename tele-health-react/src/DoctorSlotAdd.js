import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import axios from 'axios';
import { BASEURL } from './baseURL';


function DoctorSlotAdd( {dateTime, setDateTime, slotList, setSlotList} ) {

  function addEntry()
  {
    const myDateTime = new Date(dateTime).getTime() + 30*60*1000;
    const myNewSlot = {
      doctorProfile: JSON.parse(localStorage.getItem("doctor_id")),
      booking_date: dateTime.slice(0, 10),
      start_time: dateTime.slice(12, 16),
      end_time: new Date(myDateTime).toTimeString().slice(0, 5)
    }
    setSlotList([...slotList , myNewSlot]);
    console.log(myNewSlot);
    axios.post(BASEURL + "/profile/book_slots_list/",{
      headers: {
          authorization: "JWT "+ JSON.parse(localStorage.getItem("access"))
        },
        doctorProfile: myNewSlot.doctorProfile,
        booking_date: myNewSlot.booking_date,
        start_time: myNewSlot.start_time,
        end_time: myNewSlot.end_time
      }).then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
    });
  }

  return (
    <OverlayTrigger 
      trigger = "click"
      key = "right"
      placement="right"
      overlay={
        <Form style={
          {margin: 10 , backgroundColor: "grey"}
        }>
          <Form.Group className="mb-3" controlId="book_date" >
            </Form.Group>
            <Form.Group className="mb-3" controlId="book_time">
              <Form.Label>Date and Time</Form.Label>
              <Form.Control
                  type = "datetime-local"
                  placeholder="date_time"
                  required
                  onChange={(e) => setDateTime(e.target.value)}
              />
              <Button 
                variant="primary" 
                className="mb-3" 
                type="submit"
                onClick={(e) => {
                  e.preventDefault(); 
                  addEntry();
                  }}>
                  Confirm
              </Button>
            </Form.Group>
          </Form>
      }
      >
      <Button variant="secondary">Add Slots</Button>
      </OverlayTrigger>
  )
}

export default DoctorSlotAdd