const secret = 'MamaLearnz'
const jwt = require('jsonwebtoken');
const puppeteer = require('puppeteer')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const { google } = require('googleapis');
const API_KEY = "AIzaSyBb85gxNlaOJxNrVHfC_KQq4Dk59krCp4M";
const youtube = new google.youtube({
    version: 'v3',
    auth: API_KEY
});

module.exports = async (req, res) => {
    try {
        let response;
        //  // const token = req.headers['authorization'];
        //  // const data=jwt.verify(token,secret);
        const patient_id = 3 || data.id
        // let query = req.body.searchQuery;
        let type = req.body.type; // type = exercise, yoga , music , motivational-video, tips , etc etc depending upon what backend sends us
        // const patient = await prisma.patient.findFirst({
        //     where: {
        //         pk_patient_id: patient_id,
        //     }
        // })
        // if (!query) {
        //     if (!type) {
        //         return res.status(200).send({ success: false, message: "Please provide type - exercise,yoga,music,motivatiional video,tips,etc", data: req.body })
        //     }
        //     query = type + "for pregnant woman age " + patient.age + "," + patient.trimester + "trimester" + patient.weight + "kg weight"
        // }
        if (type === 'exercise') {
            response = await youtube.search.list({
                part: 'snippet',
                q: 'exercise videos for pregnant women',
                type: 'video',
                maxResults: 30
            });
        }
        else if (type === 'music') {
            response = await youtube.search.list({
                part: 'snippet',
                q: 'music videos for pregnant women',
                type: 'video',
                maxResults: 30
            });
        }
        else if (type === 'yoga') {
            response = await youtube.search.list({
                part: 'snippet',
                q: 'yoga videos for pregnant women',
                type: 'video',
                maxResults: 30
            });
        }
        const videoIds = response.data.items.map(item => item.id.videoId);
        await res.status(200).send({ success: true, message: "Video links are as follows", data: videoIds });
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

