import React from 'react'
import Form from 'react-bootstrap/Form';
import { useContext, useState } from 'react';
import { AppContext } from './App';
import axios from 'axios';
import { BASEURL } from './baseURL';
import { Button } from 'react-bootstrap';
import encrypt from './encrypt';

function UploadImageButton( {imageList, setImageList} ) {

  const {patientId} = useContext(AppContext);
  const [image, setImage] = useState(null);

  function sendFile()
  {
      const res = encrypt(image, (result) =>{
      const [encryptedImage, key] = result;
      const formData = new FormData();
      formData.append("image", encryptedImage, image.name);
      formData.append("patientProfile", patientId);
      formData.append("key", key);
      axios.post(BASEURL+"/profile/image_list/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      }).then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
    });
    });
  }


  return (
    <Form.Group controlId="formFile" className="mb-3">
      <Form.Label>Upload Image</Form.Label>
      <Form.Control 
          type="file" 
          accept="image/*" 
          onChange={(e)=>{
            setImage(e.target.files[0]);
            }
          }/>
        <Button
          variant="primary" 
          className="mb-3"
          type="submit"
          onClick= {(e)=>sendFile(e)}>
          Upload
        </Button>
    </Form.Group>
  )
}

export default UploadImageButton







// encrypt input = File with name and type
// encrypt output = blob



// decrypt api output -> image url without server root, key