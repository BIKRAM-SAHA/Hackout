const express = require("express");
const axios = require("axios");
const { PrismaClient } = require("@prisma/client");
const check = require('./Functions/checkAlert')
const fetalMovement = require('./Functions/fetalMovement')
const helper = require("./Functions/helper");
const prisma = new PrismaClient();

module.exports = async (req, res) => {
  const patient_id =req.body.patient_id;
  // const tracker_id =req.body.tracker_id;
  const o_date = req.body.date || null
  const parts = o_date.split('/');
  const date = `${parts[2]}-${parts[0]}-${parts[1]}`;

  const maternal_weight=req.body.maternal_weight || null;
  const blood_pressure=req.body.blood_pressure || null;
  const fetal_movement=req.body.fetal_movement || null;
  const fetal_heart_rate=req.body.fetal_heart_rate || null;
  const amniotic_fluid_index=req.body.amniotic_fluid_index || null;
  const blood_sugar_level=req.body.blood_sugar_level || null;
  const blood_sugar_type = req.body.blood_sugar_type || null;
  const thyroid_function=req.body.thyroid_function || null;
  const haemoglobin_level=req.body.haemoglobin_level || null;
  let details
    try {
        const patient = await prisma.patient.findFirst({
            where: {
              pk_patient_id: patient_id,
            },
            include: {
              standard_blood_pressure: true,
              standard_fetal_heart_rate: true,
              standard_amniotic_fluid_index: true,
              standard_blood_sugar_levels: true,
              standard_thyroid_function: true,
              standard_haemoglobin_level: true,
            },
          });
  
        if (!patient) { //if no such patient is found
            res
                .status(200)
                .send({ success: false, message: "No such patient details exists" });
            return;
        }
        const tracker_id=patient.fk_tracker_id;


        if(maternal_weight){
           let mw = await helper('maternal_weight','findFirst',tracker_id,'maternal_weight',maternal_weight,date)
           if(mw.success==false) throw new Error(mw.data)
           if(!mw){
              await helper('maternal_weight','create',tracker_id,'maternal_weight',maternal_weight,date);
           }else{
            await helper('maternal_weight','update',tracker_id,'maternal_weight',maternal_weight,date);
           }
           await prisma.patient.update({
            where:{
                pk_patient_id : patient_id,
            },
            data:{
                maternal_weight : maternal_weight,
            }
           })
        }


        if(blood_pressure){
            let thresh_bp_sys = 20
            let thresh_bp_dys = 10
            let dataArray
            let mw = await helper('blood_pressure','findFirst',tracker_id,'bloodpr',blood_pressure,date)
            if(mw.success==false) throw new Error(mw.data)
            if(!mw){
               await helper('blood_pressure','create',tracker_id,'bloodpr',blood_pressure,date);
            }else{
             await helper('blood_pressure','update',tracker_id,'bloodpr',blood_pressure,date);
            }  
            //window_size = 3, threshold, standard_min, standard_max, dataPoints, newData
            let result = check(3,thresh_bp,patient.standard_blood_pressure[0].min,patient.standard_blood_pressure[0].max,dataArray,blood_pressure)
            details = {
                ...details,
                blood_pressure:result
            }

         }


         if(fetal_movement){
            let mw = await helper('fetal_movement','findFirst',tracker_id,'movement',fetal_movement,date)
            if(mw.success==false) throw new Error(mw.data)
            if(!mw){
               await helper('fetal_movement','create',tracker_id,'movement',fetal_movement,date);
            }else{
             await helper('fetal_movement','update',tracker_id,'movement',fetal_movement,date);
            }  
         }


         if(fetal_heart_rate){
            let thresh_fhr=6
            let dataArray
            let mw = await helper('fetal_heart_rate','findFirst',tracker_id,'fetal_heart_rate',fetal_heart_rate,date)
            if(mw.success==false) throw new Error(mw.data)
            if(!mw){
               await helper('fetal_heart_rate','create',tracker_id,'fetal_heart_rate',fetal_heart_rate,date);
            }else{
             await helper('fetal_heart','update',tracker_id,'fetal_heart_rate',fetal_heart_rate,date);
            }  
            let result = check(3,thresh_fhr,patient.standard_fetal_heart_rate[0].min,patient.standard_fetal_heart_rate[0].max,dataArray,fetal_heart_rate)
            details = {
                ...details,
                fetal_heart_rate:result
            }
         }

         if(amniotic_fluid_index){
            let thresh_afi = 6
            let dataArray
            let mw = await helper('amniotic_fluid_index','findFirst',tracker_id,'amniotic_fluid_index',amniotic_fluid_index,date)
            if(mw.success==false) throw new Error(mw.data)
            if(!mw){
               await helper('amniotic_fluid_index','create',tracker_id,'amniotic_fluid_index',amniotic_fluid_index,date);
            }else{
             await helper('amniotic_fluid_index','update',tracker_id,'amniotic_fluid_index',amniotic_fluid_index,date);
            }  
            let result = check(3,thresh_afi,patient.standard_amniotic_fluid_index[0].min,patient.standard_amniotic_fluid_index[0].max,dataArray,amniotic_fluid_index)
            details = {
                ...details,
                amniotic_fluid_index:result
            }
         }

         if(blood_sugar_level){ // check for before and after meal
            let thresh_bs = 55
            let dataArray
            let mw = await helper('blood_sugar_level','findFirst',tracker_id,'blood_sugar',blood_sugar_level,date)
            if(mw.success==false) throw new Error(mw.data)
            if(!mw){
               await helper('blood_sugar_level','create',tracker_id,'blood_sugar',blood_sugar_level,date);
            }else{
             await helper('blood_sugar_level','update',tracker_id,'blood_sugar',blood_sugar_level,date);
            } 
            let result 
            result = check(3,thresh_afi,patient.standard_amniotic_fluid_index[0].min,patient.standard_amniotic_fluid_index[0].max,dataArray,amniotic_fluid_index)
            details = {
                ...details,
                amniotic_fluid_index:result
            } 
         }


         if(thyroid_function){
            let thresh_tf
            let mw = await helper('thyroid_function','findFirst',tracker_id,'thyroid',thyroid_function,date)
            if(mw.success==false) throw new Error(mw.data)
            if(!mw){
               await helper('thyroid_function','create',tracker_id,'thyroid',thyroid_function,date);
            }else{
             await helper('thyroid_function','update',tracker_id,'thyroid',thyroid_function,date);
            }  
            let result = check(3,thresh_tf,patient.standard_thyroid_function[0].min,patient.standard_thyroid_function[0].max,dataArray,thyroid_function)
            details = {
                ...details,
                thyroid_function:result,
            }
         }


         if(haemoglobin_level){
            let thresh_hl=6
            let dataArray
            let mw = await helper('haemoglobin_level','findFirst',tracker_id,'haemoglobin',haemoglobin_level,date)
            if(mw.success==false) throw new Error(mw.data)
            if(!mw){
               await helper('haemoglobin_level','create',tracker_id,'haemoglobin',haemoglobin_level,date);
            }else{
             await helper('haemoglobin_level','update',tracker_id,'haemoglobin',haemoglobin_level,date);
            }  
            let result = check(3,thresh_hl,patient.standard_haemoglobin_level[0].min,patient.standard_haemoglobin_level[0].max,dataArray,haemoglobin_level)
            details = {
                ...details,
                haemoglobin_level:result
            }
         }


        res //if found the returns all the details
            .status(200)
            .send({ success: true, message: "Details updated", data: req.body });
    } catch (err) { //if any error accours in the fetching of permit details
        res
            .status(200)
            .send({ success: false, message: "Error in updating stat details", data: err });
    } finally {
        await prisma.$disconnect()
    }
}