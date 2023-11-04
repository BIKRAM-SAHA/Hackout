const express = require("express");
const secret='MamaLearnz'
const jwt = require('jsonwebtoken');
const { PrismaClient }=require('@prisma/client')
const prisma = new PrismaClient()
const helper = async(schema_name,clause1,minval,clause2,maxval,patient_id,func)=>{
    try{
    if(func=='create'){
    await prisma[schema_name].create({
        data: {
           fk_patient_id: patient_id,
           [clause1]:minval,
           [clause2]:maxval
        },
      })
    }
    else if(func=='update'){
            await prisma[schema_name].updateMany({
                where: {
                  fk_patient_id: patient_id,
                },
                data: {
                   [clause1]:minval,
                   [clause2]:maxval
                },
              })
    }
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
    const health = req.body.health || []
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
    if(!patient){
        return res.status(200).send({success:false,message:"Patient Invalid",data:{patient_id}})
    }
    //now for allergy
    const allergy_str = allergy.join(', ');
    //for health
    const health_str = health.join(', ');
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
            allergy: allergy_str || patient.allergy,
            health: health_str || patient.health
        }

    })
    if(standard_blood_pressure.length!=0){
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
      })
    }else{
        await prisma.standard_blood_pressure.create({
            data: {
              fk_patient_id: patient_id,
              min_sys: min_sys,
              max_sys: max_sys,
              min_dias: min_dias,
              max_dias: max_dias,
            },
          })       
    }
//update if already exists
      let result
      let func = (standard_fetal_heart_rate.length==0) ? 'create' : 'update' 
      result = await helper('standard_fetal_heart_rate','min',min_fhr,'max',max_fhr,patient_id,func)
      if(result.success==false) throw new Error(result.data)

      func = (standard_amniotic_fluid_index.length==0) ? 'create' : 'update'
      result = await helper('standard_amniotic_fluid_index','min',min_afi,'max',max_afi,patient_id,func)
      if(result.success==false) throw new Error(result.data)
      
      func = (standard_blood_sugar_levels.length==0) ? 'create' : 'update'
      result = await helper('standard_blood_sugar_levels','blood_sugar_min',min_bs,'blood_sugar_max',max_bs,patient_id,func)
      if(result.success==false) throw new Error(result.data)
      
      func = (standard_tyroid_function.length==0) ? 'create' : 'update'
      result = await helper('standard_tyroid_function','min',min_tsh,'max',max_tsh,patient_id,func)
      if(result.success==false) throw new Error(result.data)
      
      func = (standard_haemoglobin_level.length==0) ? 'create' : 'update'
      result = await helper('standard_haemoglobin_level','min',min_haemo,'max',max_haemo,patient_id,func)
      if(result.success==false) throw new Error(result.data)
    // console.log(doctor_values);
    await res
    .status(200)
    .send({ success: true, message: "Patient details updated", data: req.body });

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