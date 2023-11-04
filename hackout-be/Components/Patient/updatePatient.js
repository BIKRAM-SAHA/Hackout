const express = require("express");
const secret='MamaLearnz'
const jwt = require('jsonwebtoken');
const AccessToken=require('../../JWT/accesstoken')
const { PrismaClient }=require('@prisma/client')
const prisma = new PrismaClient()
const helper = async(schema_name,minval,maxval,patient_id)=>{
    try{
    await prisma[schema_name].updateMany({
        where: {
          fk_patient_id: patient_id,
        },
        data: {
           min:minval,
           max:maxval
        },
      })
    }
    catch(error){
        return {success:false,data:error}
    }
}

module.exports=async (req,res)=>{
    try{
    const token = req.headers['authorization'];
    const data=jwt.verify(token,secret);
    const patient_id = data.id
    const age  = req.body.age || null 
    const maternal_weight = (req.body.maternal_weight) || null
    const maternal_height = (req.body.height) || null 
    const week_no = parseInt(req.body.week_no) || null
    const trimester = parseInt(req.body.trimester) || null
    const allergy = req.body.allergy || []
    const min_sys = parseFloat(req.body.min_sys) || null
    const max_sys = parseFloat(req.body.max_sys) || null
    const min_dias = parseFloat(req.body.min_dias) || null
    const max_dias = parseFloat(req.body.max_dias) || null
    const min_fhr = parseFloat(req.body.min_fhr) || null
    const max_fhr = parseFloat(req.body.max_fhr) || null
    const min_afi = parseFloat(req.body.min_afi) || null
    const max_afi = parseFloat(req.body.max_afi) || null
    const max_bs = parseFloat(req.body.max_bs) || null
    const min_bs = parseFloat(req.body.min_bs) || null
    const min_tsh = parseFloat(req.body.min_tsh )|| null
    const max_tsh = parseFloat(req.body.max_tsh) || null
    const min_haemo = parseFloat(req.body.min_haemo) || null
    const max_haemo = parseFloat(req.body.max_haemo) || null

    const patient = await prisma.patient.findFirst({
        where :{
            pk_patient_id: patient_id
        }
    })
    if(!patient){
        return res.status(200).send({success:false,message:"Patient Invalid",data:{patient_id}})
    }
    await prisma.patient.updateMany({
        where: {
            pk_patient_id: patient_id
        },
        data:{
            age: age || patient.age,
            maternal_weight : maternal_weight || patient.maternal_weight,
            maternal_height : maternal_height || patient.maternal_height,
            week_no : week_no || patient.week_no,
            trimester: trimester || patient.trimester,
        }

    })

    await prisma.standard_blood_pressure.updateMany({
        where: {
          fk_patient_id: patient_id,
        },
        data: {
          min_sys: min_sys,
          max_sys: max_sys,
          min_dias: min_dias,
          max_dias: max_dias,
        },
      });

      var result = await helper('fetal_heart_rate',min_fhr,max_fhr,patient_id)
      if(result.success==false) throw new Error(result.data)
      result = await helper('amniotic_fluid_index',min_afi,max_afi,patient_id)
      if(result.success==false) throw new Error(result.data)
    // console.log(doctor_values);
    

    await res
    .status(200)
    .send({ success: true, message: "Doctor Values", data: doctor_values });

}    
catch (err) { //if any error occurs in fectching the document
            
    // console.log(err);
res
    .status(200)
    .send({ success: false, message: "Error in fetching Documents", data: err });
}
finally {
//to disconnect from prisma
await prisma.$disconnect()
}
       
}