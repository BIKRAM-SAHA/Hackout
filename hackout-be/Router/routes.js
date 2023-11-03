const express = require("express");
const router = express.Router();
const preg_breast=require('../Components/pregnancy_breast_feeding')
const medicineTracker = require("../Components/medicineTracker");
const nutrients = require('../Components/NutriTrack/nutrition');
const statisticalTracker = require("../Components/StatisticalTracker/statisticalTracker");
const recommendations = require('../Components/Recommendations/rec_automation')
router.post('/precautions',preg_breast);
router.post('/medicineTracker',medicineTracker);
router.post('/meal',nutrients);
router.post('/statisticalTracker',statisticalTracker);
router.post('./VideoRecommendations',recommendations);
router.post('/precautions',preg_breast);
router.post('/medicineTracker',medicineTracker);

module.exports=router