const express = require("express");
const router = express.Router();
const preg_breast=require('../Components/pregnancy_breast_feeding')
const authenticate=require('../JWT/authenticate');
const medicineTracker = require("../Components/medicineTracker");
const nutrients = require('../Components/NutriTrack/nutrition');
const recommendations = require('../Components/Recommendations/rec_automation')
router.post('/precautions',preg_breast);
router.post('/medicineTracker',medicineTracker);
router.post('/meal',nutrients);
router.post('./VideoRecommendations',recommendations);
module.exports=router