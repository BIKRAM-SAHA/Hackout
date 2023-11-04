const express = require("express");
const axios = require("axios");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = async (req, res) => {
  const drug_name = req.body.drug_name;
  if (drug_name === undefined || drug_name===null) {
    res
      .status(200)
      .send({ success: false, message: "Parameter is empty", error: "drug_name length is 0 received" });
      
      return;
    }

  const dosage_name = await drug_name.toLowerCase();
  const generic_name = await drug_name.toUpperCase();
  const description =
    (await drug_name.charAt(0).toUpperCase()) + (await drug_name.slice(1));
  const url = `https://api.fda.gov/drug/label.json?search=description:${description}+AND+openfda.generic_name:${generic_name}+AND+dosage_and_administration:${dosage_name}&limit=1`;
  try {
    const response = await axios.get(url);
    if (response.length === 0) {
      res
        .status(200)
        .send({
          success: false,
          message: "No Data exists with this Drug Name",
          data: drug_name,
        });
        return;
    }
    res
      .status(200)
      .send({
        success: true,
        message: "Data successfully fetched for given drug name",
        data: response.data.results,
      });
  } catch (error) {
    res
      .status(200)
      .send({
        success: false,
        message: "Error occured in fetching data",
        error: error,
      });
  }
};
