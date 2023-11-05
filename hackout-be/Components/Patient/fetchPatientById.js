const express = require("express");
const secret='MamaLearnz'
const jwt = require('jsonwebtoken');
const { PrismaClient }=require('@prisma/client')
const prisma = new PrismaClient()

module.exports=async (req,res)=>{
    try{
    // const token = req.headers['authorization'];
    // const data=jwt.verify(token,secret);
    const patient_id = 3 || req.body.patient_id || data.id

    const patient = await prisma.patient.findFirst({
        where:{
            pk_patient_id: patient_id
        },
        include:{
            standard_amniotic_fluid_index:true,
            standard_blood_pressure:true,
            standard_blood_sugar_levels:true,
            standard_fetal_heart_rate:true,
            standard_haemoglobin_level:true,
            standard_thyroid_function:true,
        }
    })
    if(patient.allergy){
        const allergy_arr = await patient.allergy.split(', ');
        patient.allergy = allergy_arr
    }
    if(patient.health){
        const health_arr = await patient.health.split(', ');
        patient.health = health_arr
    }
    res
    .status(200)
    .send({ success: true, message: "The patient details are as follows", data: patient });

}    
catch (err) { 
res
    .status(200)
    .send({ success: false, message: "Error in fetching Patient", data: err });
}
finally {

//to disconnect from prisma
await prisma.$disconnect()
}
       
}