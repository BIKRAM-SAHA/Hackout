const express = require("express");
const secret = "MamaLearnz";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const AccessToken = require("../../JWT/accesstoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async (req, res) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;
  const password = req.body.password;
  console.log(req.body);

  try {
    if (
      name === undefined ||
      phone === undefined ||
      email === undefined ||
      password === undefined
    ) {
      res.status(200).send({
        success: false,
        message: "One Mandatory value entered is Null",
      });
      return;
    }
    var eml = await prisma.patient.findFirst({
      where: {
        email: email,
      },
    });
    eml = await prisma.patient.findFirst({
      where: {
        phone: phone,
      },
    });

    if (eml !== null) {
      res
        .status(200)
        .send({ success: false, message: "Credentials already exist" });
      return;
    }

    // console.log(doctor_id)
    const salt = await bcrypt.genSalt(10);
    const hashed_pass = await bcrypt.hash(password, salt);
    const track = await prisma.tracker.create();
    var patient_data = await prisma.patient.create({
      data: {
        name: name,
        email: email,
        password: hashed_pass,
        phone: phone,
        age: "23",
        fk_tracker_id: track.pk_tracker_id,
      },
    });
    console.log("first");
    // console.log(data)
    const type_provided = "patient";
    const token = await AccessToken(patient_data, type_provided);
    patient_data = await prisma.patient.update({
      data: {
        token: token,
      },
      where: {
        pk_patient_id: patient_data.pk_patient_id,
      },
    });

    res.status(200).send({
      success: true,
      message: "Patient Successfully Created",
      data: patient_data,
    });
    return;
  } catch (err) {
    //if any error occurs in fectching the document

    console.log(err);
    res.status(200).send({
      success: false,
      message: "Error in fetching Documents",
      data: err,
    });
  } finally {
    //to disconnect from prisma
    await prisma.$disconnect();
  }
};
