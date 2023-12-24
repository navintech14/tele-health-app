import React from 'react'
import { useState, useEffect, useContext } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Figure from 'react-bootstrap/Figure';
import axios from 'axios';
import { AppContext } from './App';
import { BASEURL } from './baseURL';
import { AWSBASEIMAGES } from './baseURL';
import UploadImageButton from './UploadImageButton'
import {decrypt} from './encrypt.js'



function PatientImagesPage() {

    const {patientId} = useContext(AppContext);
    const [imageList, setImageList] = useState([]);



    useEffect(() =>{
        axios
        .get(BASEURL+`/profile/my_image_list/${patientId}`)
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
    }, []);




  return (
    <div>
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
        <UploadImageButton 
        imageList = {imageList}
        setImageList = {setImageList}/>
    </div>
  )
}

export default PatientImagesPage