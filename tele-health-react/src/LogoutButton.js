import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { AppContext } from './App';



function LogoutButton() {
    const { loggedIn, setLoggedIn } =useContext(AppContext);   //
    const navigate = useNavigate();

    function removeCookie(){
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("id");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("isDoctor");
        localStorage.removeItem("doctor_id");
        localStorage.removeItem("patient_id");
        setLoggedIn(false);   // 
        navigate("/login")
    }


  return (
    <Button 
      variant="outline-primary"
      type="button"
      onClick={(e) => {
        e.preventDefault(); 
        removeCookie()}}>
        Log Out
    </Button>
  )
}

export default LogoutButton