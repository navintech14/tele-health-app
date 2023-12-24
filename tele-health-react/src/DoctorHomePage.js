import React from 'react'
import { useEffect, useState, useContext } from 'react';
import DoctorSlotAdd from './DoctorSlotAdd'
import DoctorSlotList from './DoctorSlotList';
import axios from 'axios';
import { BASEURL } from './baseURL';
import { AppContext } from './App';


function DoctorHomePage() {

    const [dateTime, setDateTime] = useState("");
    const [slotList, setSlotList] = useState([]);
    const {id, setDoctorId, doctorId} = useContext(AppContext);

    useEffect(()=>{
    const profileDetails = async() =>{
        try {
            const response = await axios.get(BASEURL + `/profile/doctor_profile_details/${id}`);
            console.log("from doctor home page use effect")
            console.log(response);
            localStorage.setItem("doctor_id",JSON.stringify(response.data["id"]));
            setDoctorId(response.data["id"]);
        } catch(error){
            console.error(error);
        }};
        profileDetails();
    }, [doctorId])


  return (
    <div className="container">
      <div className="row">

        <div className="col-md-8">
                <DoctorSlotList 
                        slotList = {slotList}
                        setSlotList = {setSlotList}/>
        </div>

        <div className="col-md-4">
                <DoctorSlotAdd 
                    dateTime = {dateTime}
                    setDateTime = {setDateTime}
                    slotList = {slotList}
                    setSlotList = {setSlotList}/>
        </div>

      </div>
    </div>  
    
  );
};

export default DoctorHomePage