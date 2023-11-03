const express = require("express");
const axios = require("axios");
const { PrismaClient } = require("@prisma/client");
const helper = require("./Components/helper");
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
  const waist_circumference=req.body.waist_circumference || null;
  const amniotic_fluid_index=req.body.amniotic_fluid_index || null;
  const blood_sugar_level=req.body.blood_sugar_level || null;
  const thyroid_function=req.body.thyroid_function || null;
  const haemoglobin_level=req.body.haemoglobin_level || null;
  
    try {
        const patient = await prisma.patient.findFirst({
            where: {
                patient_id: patient_id
            }
            }
        );
  
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
        }
        if(blood_pressure){
            let mw = await helper('blood_pressure','findFirst',tracker_id,'bloodpr',maternal_weight,date)
            if(mw.success==false) throw new Error(mw.data)
            if(!mw){
               await helper('blood_pressure','create',tracker_id,'bloodpr',maternal_weight,date);
            }else{
             await helper('blood_pressure','update',tracker_id,'bloodpr',maternal_weight,date);
            }  
         }
         if(fetal_movement){
            let mw = await helper('fetal_movement','findFirst',tracker_id,'movement',maternal_weight,date)
            if(mw.success==false) throw new Error(mw.data)
            if(!mw){
               await helper('fetal_movement','create',tracker_id,'movement',maternal_weight,date);
            }else{
             await helper('fetal_movement','update',tracker_id,'movement',maternal_weight,date);
            }  
         }
         if(fetal_heart_rate){
            let mw = await helper('fetal_heart_rate','findFirst',tracker_id,'fetal_heart_rate',maternal_weight,date)
            if(mw.success==false) throw new Error(mw.data)
            if(!mw){
               await helper('fetal_heart_rate','create',tracker_id,'fetal_heart_rate',maternal_weight,date);
            }else{
             await helper('blood_pressure','update',tracker_id,'bloodpr',maternal_weight,date);
            }  
         }
        res //if found the returns all the details
            .status(200)
            .send({ success: true, message: "Permit details are ", data: details });
    } catch (err) { //if any error accours in the fetching of permit details
        res
            .status(200)
            .send({ success: false, message: "Error in fetching permit details", data: err });
    } finally {
        await prisma.$disconnect()
    }
}