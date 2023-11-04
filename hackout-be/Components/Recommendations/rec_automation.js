const secret = 'MamaLearnz'
const jwt = require('jsonwebtoken');
const puppeteer = require('puppeteer')
const { PrismaClient } = require('@prisma/client')
require('dotenv').config();

const prisma = new PrismaClient()
module.exports = async (req, res) => {
  let browser;
  try {
    // const token = req.headers['authorization'];
    // const data=jwt.verify(token,secret);
    const patient_id = 3 || data.id
    let query = req.body.searchQuery;
    let type = req.body.type; // type = exercise, yoga , music , motivational-video, tips , etc etc depending upon what backend sends us
    const patient = await prisma.patient.findFirst({
      where: {
        pk_patient_id: patient_id,
      }
    })
    if (!query) {
      if (!type) {
        return res.status(200).send({ success: false, message: "Please provide type - exercise,yoga,music,motivatiional video,tips,etc", data: req.body })
      }
      // write the code to take necessary information from database and make a query string
      query = type + "for pregnant woman age " + patient.age + "," + patient.trimester + "trimester" + patient.weight + "kg weight"
    }
    browser = await puppeteer.launch({
      headless: true,
      args: ["--disable-setuid-sandbox", "--no-sandbox", "--single-process", "--no-zygote"],
      executablePath: process.env.NODE_ENV === "production" ? process.env.PUPPETEER_EXECUTABLE_PATH : '/usr/bin/chromium-browser'

    });
    // args: [`--remote-debugging-port=5000`] });
    const page = await browser.newPage();

    await page.goto('https://www.youtube.com');

    await page.type('input[name="search_query"]', query);
    await page.keyboard.press('Enter');

    await page.waitForSelector('ytd-video-renderer');

    const videoLinks = await page.$$eval('ytd-video-renderer', async (videoRenderers) => {
      return await Promise.all(videoRenderers.map(async (videoRenderer) => {
        const link = await videoRenderer.querySelector('a#thumbnail')?.href;
        // const videoId = link.split('v=')[1]; // Split the link and get the part after 'v='
        // return videoId;
        const videoId = link.split('watch?v=')[1]?.split('&pp=')[0]
        return videoId
      }));
    });

    // Close the browser
    await browser.close();
    await res.status(200).send({ success: true, message: "Video links are as follows", data: videoLinks });
    return;
  }
  catch (err) {
    console.log(err);
    await res
      .status(200)
      .send({ success: false, message: "Error in fetching links", data: err });
  }
  finally {

    //to disconnect from prisma
    await prisma.$disconnect()
  }
}