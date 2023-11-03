const express = require("express");
const secret='MamaLearnz'
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const AccessToken=require('../../JWT/accesstoken')
const { PrismaClient }=require('@prisma/client')
const prisma = new PrismaClient()

module.exports=async (req,res)=>{
    const email=req.body.email
    const password=req.body.password
    try{
        if(email===undefined || password===undefined){
            res
            .status(200)
            .send({ success: false, message: "One Mandatory value entered is Null"});
            return;
        }
        var patient=await prisma.patient.findFirst({
            where:{
                email:email
            }
        })
        if(patient===null)
        {
            res
            .status(200)
            .send({ success: false, message: "Email doesn't exists"});
            return;
        }
        const comp_pass=await bcrypt.compare(password,patient.password)
        if(!comp_pass){
            res.status(200).send({ success: false, message: "Password doesn't match", data: req.body});
            return;
        }
        const type_provided="patient"
        const token=await AccessToken(patient,type_provided)
        patient=await prisma.patient.update({
            data:{
                token:token
            },
            where:{
                pk_patient_id:patient.pk_patient_id
            }
        })
        res.status(200).send({ success: true, message: "Patient Successfully Logged In", data: patient });
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