import React from 'react'
import { useEffect, useState, useContext, createContext } from 'react';
import axios from 'axios';
import { BASEURL } from './baseURL';
import DoctorList from './DoctorList';
import { AppContext } from './App';


export const PatientContext = createContext();

function PatientHomePage() {

    const {id, patientId, setPatientId, chosenDoctor, setChosenDoctor} = useContext(AppContext);

    

    useEffect(()=>{
        const profileDetails = async() =>{
            try {
                const response = await axios.get(BASEURL + `/profile/patient_profile_details/${id}`);
                console.log(response);
                setPatientId(response.data["id"]);
            } catch(error){
                console.error(error);
            }};
            profileDetails();
        }, [])
    

  return (
    <div>
    PatientHomePage
    <DoctorList />
    </div>
  );
}

export default PatientHomePage