const express = require("express");
const router = express.Router();
const nutrients = require('../Components/NutriTrack/nutrition');
const statisticalTracker = require("../Components/StatisticalTracker/statisticalTracker");
const recommendations = require('../Components/Recommendations/rec_automation');
const EmailTest = require("../Components/EmailTest/EmailTest");

router.post('/nutrient',nutrients);
router.post('/statisticalTracker',statisticalTracker);
router.post('/videos',recommendations);
router.post('/email',EmailTest);

module.exports=router