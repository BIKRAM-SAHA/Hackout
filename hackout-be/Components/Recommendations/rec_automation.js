const express = require("express");
const puppeteer = require('puppeteer')
const { PrismaClient }=require('@prisma/client')
const prisma = new PrismaClient()

module.exports=async (req,res)=>{
    let browser;
    try {
      let patient_id = req.body.patient_id;
      let query = req.body.searchQuery;
      let type = req.body.type; // type = exercise, yoga , music , motivational-video, tips , etc etc depending upon what backend sends us
      const patient = await prisma.patient.findFirst({
         where:{
          pk_patient_id : patient_id,
         }
      })
      console.log(patient)
      if(!query){
        if(!type){
            return res.status(200).send({success:false,message:"Please provide type - exercise,yoga,music,motivatiional video,tips,etc",data:req.body})
        }
        // write the code to take necessary information from database and make a query string
        query = type + "for pregnant woman age " + patient.age + "," + patient.trimester + "trimester" + patient.weight + "kg weight"
      }
      browser = await puppeteer.launch({ headless: true,
        args: [`--remote-debugging-port=5000`] });
      const page = await browser.newPage();
  
      await page.goto('https://www.youtube.com');
  
      await page.type('input[name="search_query"]', query);
      await page.keyboard.press('Enter');
  
      await page.waitForSelector('ytd-video-renderer');
  
      const videoLinks = await page.$$eval('ytd-video-renderer', (videoRenderers) => {
        return videoRenderers.map((videoRenderer) => {
          const link = videoRenderer.querySelector('a#thumbnail')?.href;
          return link;
        });
      });
  
      // Close the browser
      await browser.close();
      await res.status(200).send({ success: true, message: "Video links are as follows", data: videoLinks });
      return;
    } 
    catch (err) {
        await res
            .status(200)
            .send({ success: false, message: "Error in fetching links", data: err });
    }
    finally {

        //to disconnect from prisma
        await prisma.$disconnect()
    }
}