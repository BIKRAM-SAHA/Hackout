const secret='MamaLearnz'
const jwt = require('jsonwebtoken');
const { PrismaClient } = require("@prisma/client");
const check = require("./Functions/checkAlert");
const checkbp = require("./Functions/checkAlertBloodPressure");
const fetalMovement = require("./Functions/fetalMovement");
const arrayGenerator = require("./Functions/arrayGenerator");
const helper = require("./Functions/helper");
const maternlWeightCalc = require("./Functions/maternalWeightGain");
const prisma = new PrismaClient();

module.exports = async (req, res) => {
  // const token = req.headers['authorization'];
  // const data=jwt.verify(token,secret);
  const patient_id = 3
  // const tracker_id =req.body.tracker_id;
  if (!req.body.date) {
    return res.status(200).send({
      success: false,
      message: "Please send the date and in correct format",
      data: req.body,
    });
  }
  const o_date = req.body.date || null;
  const parts = o_date.split("/");
  const date = `${parts[2]}-${parts[1]}-${parts[0]}`;

  const maternal_weight = parseInt(req.body.maternal_weight) || null;
  const blood_pressure_sys = parseFloat(req.body.blood_pressure_sys) || null;
  const blood_pressure_dias = parseFloat(req.body.blood_pressure_dias) || null;
  const fetal_movement = parseFloat(req.body.fetal_movement) || null;
  const fetal_heart_rate = parseFloat(req.body.fetal_heart_rate) || null;
  const amniotic_fluid_index = parseFloat(req.body.amniotic_fluid_index) || null;
  const blood_sugar_level = parseFloat(req.body.blood_sugar_level)|| null;
  const thyroid_function = parseFloat(req.body.thyroid_function) || null;
  const haemoglobin_level = parseFloat(req.body.haemoglobin_level) || null;
  let details;
  try {
    const patient = await prisma.patient.findFirst({
      where: {
        pk_patient_id: 3 || patient_id,
      },
      include:{
        standard_amniotic_fluid_index:true,
        standard_blood_pressure:true,
        standard_blood_sugar_levels:true,
        standard_fetal_heart_rate:true,
        standard_haemoglobin_level:true,
        standard_thyroid_function:true,
      }
    });

    if (!patient) {
      //if no such patient is found
      res
        .status(200)
        .send({ success: false, message: "No such patient details exists" });
      return;
    }
    const tracker_id = patient.fk_tracker_id;
    const track = await prisma.tracker.findFirst({
      where:{
        pk_tracker_id : tracker_id,
      },
      include : {
        maternal_weight:{
          orderBy:{
            date: 'asc',
          }
        },
        blood_pressure:{
          orderBy:{
            date: 'asc',
          }
        },
        fetal_movement:{
          orderBy:{
            date: 'asc',
          }
        },
        fetal_heart_rate:{
          orderBy:{
            date: 'asc',
          }
        },
        amniotic_fluid_index:{
          orderBy:{
            date: 'asc',
          }
        },
        blood_sugar_level:{
          orderBy:{
            date: 'asc',
          }
        },
        thyroid_function:{
          orderBy:{
            date: 'asc',
          }
        },
        haemoglobin_level:{
          orderBy:{
            date: 'asc',
          }
        }
      }
    })
    if (maternal_weight) {
      let dataArray;
      let mw = await helper(
        "maternal_weight",
        "findFirst",
        tracker_id,
        "weight",
        maternal_weight,
        date
      );
      if (mw.success == false) throw new Error(mw.data);
      if (!mw.data) {
        await helper(
          "maternal_weight",
          "create",
          tracker_id,
          "weight",
          maternal_weight,
          date
        );
      } else {
        await helper(
          "maternal_weight",
          "update",
          tracker_id,
          "weight",
          maternal_weight,
          date
        );
      }
      await prisma.patient.updateMany({
        where: {
          pk_patient_id: patient_id,
        },
        data: {
          maternal_weight: maternal_weight,
        },
      });
      const maternal_weight_arr = await prisma.tracker.findFirst({
        where: {
          pk_tracker_id: tracker_id,
        },
        include: {
          maternal_weight: true,
        },
      });
      dataArray = await arrayGenerator(track.maternal_weight,"weight");
      let result = await maternlWeightCalc(dataArray, maternal_weight);
      details = {
        ...details,
        maternal_weight: result,
      };
    }

    if (blood_pressure_sys && blood_pressure_dias) {
      let thresh_bp_sys = 0.25 * blood_pressure_sys;
      let thresh_bp_dias = 0.25 * blood_pressure_dias;
      let dataArray_sys, dataArray_dias;
      let mw = await prisma.blood_pressure.findFirst({
        where: {
          tracker_id: tracker_id,
          date: new Date(date),
        },
      });
      if (!mw) {
        await prisma.blood_pressure.create({
          data: {
            tracker_id: tracker_id,
            systolic: blood_pressure_sys,
            diastolic: blood_pressure_dias,
            date: new Date(date),
          },
        });
      } else {
        await prisma.blood_pressure.updateMany({
          where: {
            tracker_id: tracker_id,
            date: new Date(date),
          },
          data: {
            systolic: blood_pressure_sys,
            diastolic: blood_pressure_dias,
          },
        });
      }
      dataArray_sys = await arrayGenerator(
        track.blood_pressure,
        "systolic"
      );
      dataArray_dias = await arrayGenerator(
        track.blood_pressure,
        "diastolic"
      );
      let pr = patient.standard_blood_pressure[0];
      let result = await checkbp(
        3,
        thresh_bp_sys,
        thresh_bp_dias,
        pr.min_sys,
        pr.max_sys,
        pr.min_dias,
        pr.max_dias,
        dataArray_sys,
        dataArray_dias,
        blood_pressure_sys,
        blood_pressure_dias
      );
      details = {
        ...details,
        blood_pressure: result,
      };
    }

    if (fetal_movement) {
      let mw = await helper(
        "fetal_movement",
        "findFirst",
        tracker_id,
        "movement",
        fetal_movement,
        date
      );
      if (mw.success == false) throw new Error(mw.data);
      if (!mw.data) {
        await helper(
          "fetal_movement",
          "create",
          tracker_id,
          "movement",
          fetal_movement,
          date
        );
      } else {
        await helper(
          "fetal_movement",
          "update",
          tracker_id,
          "movement",
          fetal_movement,
          date
        );
      }
      dataArray = await arrayGenerator(track.fetal_movement,"movement");
      let result = await fetalMovement(10,dataArray, fetal_movement);
      details = {
        ...details,
        fetal_movement: result,
      };
    }

    if (fetal_heart_rate) {
      let thresh_fhr = 0.25 * fetal_heart_rate;
      let dataArray;
      let mw = await helper(
        "fetal_heart_rate",
        "findFirst",
        tracker_id,
        "fetal_heart_rate",
        fetal_heart_rate,
        date
      );
      if (mw.success == false) throw new Error(mw.data);
      if (!mw.data) {
        await helper(
          "fetal_heart_rate",
          "create",
          tracker_id,
          "fetal_heart_rate",
          fetal_heart_rate,
          date
        );
      } else {
        await helper(
          "fetal_heart",
          "update",
          tracker_id,
          "fetal_heart_rate",
          fetal_heart_rate,
          date
        );
      }

      dataArray = await arrayGenerator(
        track.fetal_heart_rate,
        "fetal_heart_rate"
      );
      let result = await check(
        3,
        thresh_fhr,
        patient.standard_fetal_heart_rate[0].min,
        patient.standard_fetal_heart_rate[0].max,
        dataArray,
        fetal_heart_rate
      );
      details = {
        ...details,
        fetal_heart_rate: result,
      };
    }

    if (amniotic_fluid_index) {
      let thresh_afi = 0.25 * amniotic_fluid_index;
      let dataArray;
      let mw = await helper(
        "amniotic_fluid_index",
        "findFirst",
        tracker_id,
        "amniotic_fluid_index",
        amniotic_fluid_index,
        date
      );
      if (mw.success == false) throw new Error(mw.data);
      if (!mw.data) {
        await helper(
          "amniotic_fluid_index",
          "create",
          tracker_id,
          "amniotic_fluid_index",
          amniotic_fluid_index,
          date
        );
      } else {
        await helper(
          "amniotic_fluid_index",
          "update",
          tracker_id,
          "amniotic_fluid_index",
          amniotic_fluid_index,
          date
        );
      }

      dataArray = await arrayGenerator(
        track.amniotic_fluid_index,
        "amniotic_fluid_index"
      );
      let result = await check(
        3,
        thresh_afi,
        patient.standard_amniotic_fluid_index[0].min,
        patient.standard_amniotic_fluid_index[0].max,
        dataArray,
        amniotic_fluid_index
      );
      details = {
        ...details,
        amniotic_fluid_index: result,
      };
    }

    if (blood_sugar_level) {
      // check for before and after meal
      let thresh_bs = 0.25 * blood_sugar_level;
      let dataArray;
      let mw = await helper(
        "blood_sugar_level",
        "findFirst",
        tracker_id,
        "blood_sugar",
        blood_sugar_level,
        date
      );
      if (mw.success == false) throw new Error(mw.data);
      if (!mw.data) {
        await helper(
          "blood_sugar_level",
          "create",
          tracker_id,
          "blood_sugar",
          blood_sugar_level,
          date
        );
      } else {
        await helper(
          "blood_sugar_level",
          "update",
          tracker_id,
          "blood_sugar",
          blood_sugar_level,
          date
        );
      }

      dataArray = await arrayGenerator(
        track.blood_sugar_level,
        "blood_sugar"
      );
      let result;
      result = await check(
        3,
        thresh_bs,
        patient.standard_blood_sugar_levels[0].min,
        patient.standard_blood_sugar_levels[0].max,
        dataArray,
        blood_sugar_level
      );
      details = {
        ...details,
        blood_sugar_level: result,
      };
    }

    if (thyroid_function) {
      let thresh_tf = 0.25 * thyroid_function;
      let mw = await helper(
        "thyroid_function",
        "findFirst",
        tracker_id,
        "thyroid",
        thyroid_function,
        date
      );
      if (mw.success == false) throw new Error(mw.data);
      if (!mw.data) {
        await helper(
          "thyroid_function",
          "create",
          tracker_id,
          "thyroid",
          thyroid_function,
          date
        );
      } else {
        await helper(
          "thyroid_function",
          "update",
          tracker_id,
          "thyroid",
          thyroid_function,
          date
        );
      }

      dataArray = await arrayGenerator(
        track.thyroid_function,
        "thyroid"
      );
      let result = await check(
        3,
        thresh_tf,
        patient.standard_thyroid_function[0].min,
        patient.standard_thyroid_function[0].max,
        dataArray,
        thyroid_function
      );
      details = {
        ...details,
        thyroid_function: result,
      };
    }

    if (haemoglobin_level) {
      let thresh_hl = 0.25 * haemoglobin_level;
      let dataArray;
      let mw = await helper(
        "haemoglobin_level",
        "findFirst",
        tracker_id,
        "haemoglobin",
        haemoglobin_level,
        date
      );
      if (mw.success == false) throw new Error(mw.data);
      if (!mw.data) {
        await helper(
          "haemoglobin_level",
          "create",
          tracker_id,
          "haemoglobin",
          haemoglobin_level,
          date
        );
      } else {
        await helper(
          "haemoglobin_level",
          "update",
          tracker_id,
          "haemoglobin",
          haemoglobin_level,
          date
        );
      }

      dataArray = await arrayGenerator(
        track.haemoglobin_level,
        "haemoglobin"
      );
      let result = await check(
        3,
        thresh_hl,
        patient.standard_haemoglobin_level[0].min,
        patient.standard_haemoglobin_level[0].max,
        dataArray,
        haemoglobin_level
      );
      details = {
        ...details,
        haemoglobin_level: result,
      };
    }

    res //if found the returns all the details
      .status(200)
      .send({ success: true, message: "Details updated", data: details });
  } catch (err) {
    //if any error accours in the fetching of permit details
    console.log(err)
    res.status(200).send({
      success: false,
      message: "Error in updating stat details",
      data: err,
    });
  } finally {
    await prisma.$disconnect();
  }
};
