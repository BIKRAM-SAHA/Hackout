const express = require("express");
const secret='MamaLearnz'
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const AccessToken=require('../../JWT/accesstoken')
const { PrismaClient }=require('@prisma/client')
const prisma = new PrismaClient()

module.exports=async (req,res)=>{
    const name=req.body.name
    const age=req.body.age
    const email=req.body.email
    const password=req.body.password
    const doctor_name=req.body.doctor_name || null
    var doctor_data=null

    try{
        if(name===undefined || age===undefined || email===undefined || password===undefined){
            res
            .status(200)
            .send({ success: false, message: "One Mandatory value entered is Null"});
            return;
        }
        const eml=await prisma.patient.findFirst({
            where:{
                email:email,
            }
        })

        if(eml!==null){
            res.status(200).send({success:false,message:"This email already exists"})
            return
        }
        // await Promise.all(
        if(doctor_name!==null){
            doctor_data=await prisma.doctor.findFirst({
                where:{
                    name:doctor_name
                }
            })
        }
        const doctor_id= doctor_data.pk_doctor_id
        // console.log(doctor_id)
        const salt=await bcrypt.genSalt(10)
        const hashed_pass=await bcrypt.hash(password,salt)
        var patient_data=await prisma.patient.create({
            data:{
                name:name,
                age:age,
                doctor_name:doctor_name || null,
                email:email,
                fk_doctor_id: doctor_id || null,
                password:hashed_pass
            }
        })
        // console.log(data)
        const type_provided="patient"
        const token=await AccessToken(patient_data,type_provided)
        patient_data=await prisma.patient.update({
            data:{
                token:token
            },
            where:{
                pk_patient_id:patient_data.pk_patient_id
            }
        })
        
        res.status(200).send({ success: true, message: "Patient Successfully Created", data: patient_data });
        return;
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