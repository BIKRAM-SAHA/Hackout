const express = require("express");
const axios = require("axios");
const jwt = require('jsonwebtoken');
const secretKey = 'MamaLearnz';
const { PrismaClient } =require('@prisma/client')
const prisma = new PrismaClient()
module.exports = async (req, res) => {
  const disease = req.body.disease;
  const drug_name=req.body.drug_name;
  const side_effect = req.body.side_effect;
  const url1 = `https://api.fda.gov/drug/label.json?search=indications_and_usage:${disease}+AND+purpose:${disease}&limit=100`;
  const url2 = `https://api.fda.gov/drug/label.json?search=purpose:${disease}&limit=100`;
  try {
    const token = req.headers['authorization'];
    const value=jwt.verify(token,secretKey);
    // console.log(value)
    if(value.type==='patient'){
    var data_value;
    var response;
    var data_array=[];
    const token = req.headers['authorization'];
    const data=jwt.verify(token,secretKey);
    try{
    response = await axios.get(url1);
    data_value = await response.data.results; 
    }catch(error){console.log(error)}

    if(data_value===undefined || data_value===null)
    {

      //console.log(data)
      try{
      response = await axios.get(url2);
      data_value = await response.data.results;
      }
      catch(error){
        res
        .status(200)
        .send({ success: false, message: "No Entry exists with this disease and side effect", error:error});
        return;
      }
    }
    await Promise.all(
      data_value.map((each_disease) => {
        const adverse_effect=each_disease.adverse_reactions
        if(adverse_effect!==undefined)
        {
          const lowercasedParagraph = adverse_effect.toString().toLowerCase();
          const lowercasedSentence = side_effect.toString().toLowerCase();
          if (lowercasedParagraph.includes(lowercasedSentence)) {
            data_array.push(each_disease)
          }
          else{
          // Check if the sentence is indirectly present in the paragraph
          const words = lowercasedSentence.split(" ");
          for (let i = 0; i < words.length; i++) {
            const word = words[i];
            if (!lowercasedParagraph.includes(word)) {
              data_array.push(each_disease)
            }
          }
        }
      }
      })
    );
    // const disease_data=await prisma.disease.create({
    //   data:{
    //   fk_patient_id:value.id,
    //   disease_name:disease,
    //   drug_name:drug_name,
    //   side_effect:side_effect
    //   }
    // })

    if(data_array.length===0)
    {
      res
      .status(200)
      .send({ success: true, message: "Data fetched without adverse effect", data:data_value.slice(0,5)});
      return;
    }

    
    res
    .status(200)
    .send({ success: true, message: "Data fetched with adverse effect", data:data_array.slice(0,5)});
    return;
  }
  else{
    res
    .status(200)
    .send({ success: false, message: "Doctor can't access this route"});
    return;
  }
  } catch (error) {

    console.log(error)
    res
    .status(200)
    .send({ success: false, message: "Error fetching data", error:error});
    return;
  }
};
