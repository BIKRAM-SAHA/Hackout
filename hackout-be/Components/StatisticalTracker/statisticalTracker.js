const express = require("express");
const axios = require("axios");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async (req, res) => {
  const patient_id =req.body.patient_id;
  // const tracker_id =req.body.tracker_id;
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
        const tracker_id=patient.tracker_id;
    //     if(details.link_permit_to_purchase){
    //     details.link_permit_to_purchase = await Promise.all(details.link_permit_to_purchase.map(async (link) => {
    //         try {
    //           const a = await prisma.purchase_orders.findUnique({
    //             where: {
    //               pk_purchase_order_id: link.fk_purchase_order_id,
    //             },
    //           });
    //           return !a.is_deleted ? link : null;
    //         } catch (error) {
    //           throw error;
    //         }
    //       }))
    //       details.link_permit_to_purchase = details.link_permit_to_purchase.filter(link => link !== null);
    // }
    const tracker_details=await prisma.tracker.update({
      where:{
        pk_tracker_id: tracker_id
      },


      
    })
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