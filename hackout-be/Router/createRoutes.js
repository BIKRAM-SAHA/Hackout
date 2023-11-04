const express = require("express");
const router = express.Router();
const patient_signup=require('../Components/Patient/patient_signup')
const doctor_signup=require('../Components/Doctor/doctor_signup')
const patient_login=require('../Components/Patient/patient_login')
const doctor_login=require('../Components/Doctor/doctor_login')
const doctor_patient=require('../Components/Doctor/doctorgetData')
const authenticate=require('../JWT/authenticate');
const doctorStats = require("../Components/Doctor/doctorStats");
const patientStats = require("../Components/Patient/patientStats");
const patientContraction = require("../Components/Patient/patientContraction");
const doctorContraction = require("../Components/Doctor/doctorContraction");
const updatePatient = require("../Components/Patient/updatePatient")
const fetchPatient = require("../Components/Patient/fetchPatientById")
router.post('/patientSignUp',patient_signup);
router.post('/patientLogin',patient_login);
router.post('/fetchPatient',fetchPatient);
router.post('/updatePatient',updatePatient);
// router.post('/doctorSignUp',doctor_signup);
// router.post('/doctorLogin',doctor_login);
// router.post('/doctorPatient',doctor_patient);
// router.post('/doctorStats',doctorStats);
// router.post('/doctorContraction',doctorContraction);
// router.post('/patientStats',patientStats);
router.post('/patientContraction',patientContraction);



module.exports=router