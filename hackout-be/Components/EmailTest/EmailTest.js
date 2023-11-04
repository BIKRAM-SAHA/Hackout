const express = require("express");
const puppeteer = require('puppeteer')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const nodemailer = require("nodemailer");
require('dotenv').config();

module.exports = async (req, res) => {
    try {
        const email_id = req.body.email_id;
        const danger_level = req.body.danger_level;
        const message = req.body.message;
        const transporter = nodemailer.createTransport({
            service: 'outlook',
            auth: {
                user: `${process.env.EMAIL_ID}`,
                pass: `${process.env.PASSWORD}`
            }
        });

        transporter.sendMail({
            from: `"Gourav Chaki" ${process.env.EMAIL_ID}`,
            to: `${email_id}`,
            subject: `${danger_level}`,
            html: `<h1> URGENT ${danger_level}!!</h1>
                  <br/>
                  <p>Dear Customer it is to inform that Badhai has detected: </p>
                  <p>${message}.</p>
                  <p>So, Kindly Visit a Health Care Provider Urgently!.</p>`,
        }, (error, info) => {
            if (error) {
                res.status(200).send({ success: false, message: "Error sending email: ",error:error });
                return;
            } else {
                res.status(200).send({ success: true, message: "Mail Send", response:info.response });
                return;
            }
        });
    }
    catch (err) {
        console.log(err);
        await res
            .status(200)
            .send({ success: false, message: "Unable to send Mail", data: err });
    }
    finally {

        //to disconnect from prisma
        await prisma.$disconnect()
    }
}