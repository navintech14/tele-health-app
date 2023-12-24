import React from 'react'
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import Figure from 'react-bootstrap/Figure';
import { BASEURL } from './baseURL';
import { AWSBASEIMAGES } from './baseURL';
import { AppContext } from './App';
import {decrypt} from './encrypt.js'

function PatientDetailCard() {

    const {selectedPatient} = useContext(AppContext);
    const [patienDetails, setPatientDetails] = useState(null);
    const [imageList, setImageList] = useState([]);

    useEffect(() =>{
        const getPatientDetails = async() =>{
            try{
                const response = await axios.get(BASEURL+ `/profile/patient_profile_details/${selectedPatient}`);
                console.log(response.data);
                setPatientDetails(response.data);
            }
            catch(error){
                console.error(error);
            }
        }
        getPatientDetails();

        axios
        .get(BASEURL+`/profile/my_image_list/${selectedPatient}`)
        .then(function (response) {
            const imageList = response.data;
            const decryptionPromises = imageList.map((image) =>{
                const str = image.image;
                const lastSlashIndex = str.lastIndexOf('/');
                const result = str.substring(lastSlashIndex);
                const url = AWSBASEIMAGES + result;
                return axios
                .get(url, { responseType: 'blob' })
                .then((response) => {
                    const blob = response.data;
                    const filename = image.image.split('/').pop(); 
                    const file = new File([blob], filename, { type: image.mime_type });
                    return decrypt(file, image.key);
                });
            });
            Promise.all(decryptionPromises)
            .then((decryptedFiles) => {
            const decryptedImages = decryptedFiles.map((file) =>
                URL.createObjectURL(file)
            );
            setImageList(decryptedImages);
            console.log(decryptedImages)
            })
            .catch((error) => {
            console.error(error);
            });
        })
        .catch((error) => {
        console.error(error);
        });

    }, [selectedPatient])



    function calculateAge(birthdate) {
        const birthYear = parseInt(birthdate.slice(0,4));
        const birthMonth = parseInt(birthdate.slice(5,7));
        const birthDay = parseInt(birthdate.slice(8,10));
        
        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth() + 1;
        const currentDay = today.getDate();
        
        let age = currentYear - birthYear;
        
        if (birthMonth > currentMonth ||
           (birthMonth === currentMonth && birthDay > currentDay)) {
          age--;
        }
        
        return age;
      }

      

  return (
    (patienDetails && imageList)&&
        <>
    <Card style={{ width: '18rem' }}>
        <Card.Title>{patienDetails.name}</Card.Title>
        <Card.Text>{calculateAge(patienDetails.birthdate) + " year old " + patienDetails.gender}</Card.Text>
        <Card.Text>{"Height: " + patienDetails.height + " cm"}</Card.Text>
        <Card.Text>{"Weight: " + patienDetails.weight + " kg"}</Card.Text>   
    </Card>
    <ListGroup className="list-unstyled">
            {imageList.map((imageUrl, index) => (
                <li key={index}>
                    <ListGroup.Item>
                        <Figure.Image
                        src={imageUrl}
                        />
                </ListGroup.Item>
                </li>
            ))}
        </ListGroup>
    </>
  )
}

export default PatientDetailCard