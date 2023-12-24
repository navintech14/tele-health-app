import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { createContext, useState } from 'react';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import HomePage from './HomePage';
import ErrorPage from './ErrorPage';
import DoctorProfileForm from './DoctorProfileForm';
import DoctorList from './DoctorList';
import DoctorDetailsCard from './DoctorDetailsCard';
import PatientProfileForm from './PatientProfileForm';
import DoctorHomePage from './DoctorHomePage';
import PatientHomePage from './PatientHomePage';
import UploadImageButton from './UploadImageButton';
import PatientImagesPage from './PatientImagesPage';
import PatientDetailCard from './PatientDetailCard';
import NavBar from './NavBar';

export const AppContext = createContext();


function App() {
  const [loggedIn, setLoggedIn]  = useState(false);
  const [isDoctor, setIsDoctor] = useState(false);
  const [id, setId] = useState(0);
  const [doctorId, setDoctorId] = useState(0);
  const [patientId, setPatientId] = useState(0);
  const [chosenDoctor, setChosenDoctor] = useState(0);
  const [selectedPatient, setSelectedPatient] = useState(0);

  return (
    <AppContext.Provider value = {{loggedIn, setLoggedIn, isDoctor, setIsDoctor, id, setId, doctorId, setDoctorId, patientId, setPatientId, chosenDoctor, setChosenDoctor, selectedPatient, setSelectedPatient}}>
      <Router>
        <NavBar />
        <Routes>
          <Route path='/' element= {<HomePage />} />
          <Route path='/home_page_doctor' element = {<DoctorHomePage />} />
          {/* <Route path='/home_page_patient'>
            <Route index element = {<PatientHomePage />} />
            <Route path='doctor_detail' element = {<DoctorDetailsCard />} />
          </Route> */}
          {/* <Route path='/home_page_patient' element= {<PatientHomePage/>}>
            <Route index element = {<PatientHomePage />} />
            <Route path='doctor_detail' element = {<DoctorDetailsCard />} />
          </Route> */}
          <Route path='/patient_detail' element= {<PatientDetailCard/>}/>
          <Route path='/home_page_patient' element= {<PatientHomePage/>}/>
          <Route path='/doctor_detail' element = {<DoctorDetailsCard />}/>
          <Route path='/register' element= {<RegisterForm />} />
          <Route path='/login' element= {<LoginForm />} />
          <Route path='/doctor_profile' element = {<DoctorProfileForm />} />
          <Route path='/doctor_list' element = {<DoctorList />} />
          <Route path='/my_data' element = {<UploadImageButton />} />
          <Route path='/patient_profile' element = {<PatientProfileForm />} />
          <Route path='/my_images' element = {<PatientImagesPage />} />
          <Route path='*' element= {<ErrorPage />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
