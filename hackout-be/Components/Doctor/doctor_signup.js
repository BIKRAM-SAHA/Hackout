const express = require("express");
const secret='MamaLearnz'
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const AccessToken=require('../../JWT/accesstoken')
const { PrismaClient }=require('@prisma/client')
const prisma = new PrismaClient()

module.exports=async (req,res)=>{
    // console.log(req.body)
    const name=req.body.name
    const age=req.body.age
    const email=req.body.email
    const password=req.body.password
    var doctor
    try{
        if(name===undefined || age===undefined || email===undefined || password===undefined){
            res
            .status(200)
            .send({ success: false, message: "One Mandatory value entered is Null"});
            return;
        }
        const eml=await prisma.doctor.findFirst({
            where :{
                email:email,
            }
        })
        // console.log(eml)
        if(eml!==null){
            res.status(200).send({success:false,message:"This email already exists"})
            return;
        }
        const salt=await bcrypt.genSalt(10)
        // console.log(password)
        const hashed_pass=await bcrypt.hash(password,salt)
        // console.log(hashed_pass)
        var doctor_data=await prisma.doctor.create({
            data:{
                name:name,
                age:age,
                email:email,
                password:hashed_pass
            }
        })
        const type_provided="doctor"
        const token=await AccessToken(doctor_data,type_provided)
        //console.log(data)
        doctor_data=await prisma.doctor.update({
            data:{
                token:token
            },
            where:{
                pk_doctor_id:doctor_data.pk_doctor_id
            },
            include:{
                patient: true
            }
        })
        
        res.status(200).send({ success: true, message: "Doctor Successfully Created", data: doctor_data });
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