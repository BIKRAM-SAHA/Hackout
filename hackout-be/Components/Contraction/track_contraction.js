const express = require("express");
const puppeteer = require('puppeteer')
const { PrismaClient }=require('@prisma/client')
const prisma = new PrismaClient()

module.exports=async (req,res)=>{
    try {

      await res.status(200).send({ success: true, message: "Contraction data updated", data: contract });
      return;
    } 
    catch (err) {
        await res
            .status(200)
            .send({ success: false, message: "Error updating contraction data", data: err });
    }
    finally {

        //to disconnect from prisma
        await prisma.$disconnect()
    }
}