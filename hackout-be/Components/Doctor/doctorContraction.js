const express = require("express");
const secret='MamaLearnz'
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const AccessToken=require('../../JWT/accesstoken')
const { PrismaClient }=require('@prisma/client')
const prisma = new PrismaClient()

module.exports=async (req,res)=>{
    try{
    const token = req.headers['authorization'];
    const data=jwt.verify(token,secret);
    const doctor_values=await prisma.doctor.findMany({
        where:{
            pk_doctor_id:data.id
        },
        include:{
            patient:{
                include:{
                    map_contraction_patient:{
                        include:{
                            contraction:true
                        }
                    }
                }
            }
        }
    })
    // console.log(doctor_values);
    res
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