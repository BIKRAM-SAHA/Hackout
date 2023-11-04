const express = require("express");
const axios = require("axios");
const { PrismaClient } = require("@prisma/client");
const check = require("./Functions/checkAlert");
const checkbp = require("./Functions/checkAlertBloodPressure");
const fetalMovement = require("./Functions/fetalMovement");
const arrayGenerator = require("./Functions/arrayGenerator");
const helper = require("./Functions/helper");
const maternlWeightCalc = require("./Functions/maternalWeightGain");
const prisma = new PrismaClient();

module.exports = async (req, res) => {
  const patient_id = req.body.patient_id;
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
  const date = `${parts[2]}-${parts[0]}-${parts[1]}`;

  const maternal_weight = req.body.maternal_weight || null;
  const blood_pressure_sys = req.body.blood_pressure_sys || null;
  const blood_pressure_dias = req.body.blood_pressure_dias || null;
  const fetal_movement = req.body.fetal_movement || null;
  const fetal_heart_rate = req.body.fetal_heart_rate || null;
  const amniotic_fluid_index = req.body.amniotic_fluid_index || null;
  const blood_sugar_level = req.body.blood_sugar_level || null;
  const thyroid_function = req.body.thyroid_function || null;
  const haemoglobin_level = req.body.haemoglobin_level || null;
  let details;
  try {
    const patient = await prisma.patient.findFirst({
      where: {
        pk_patient_id: patient_id,
      },
      include: {
        standard_blood_pressure: true,
        standard_fetal_heart_rate: true,
        standard_amniotic_fluid_index: true,
        standard_blood_sugar_levels: true,
        standard_thyroid_function: true,
        standard_haemoglobin_level: true,
      },
    });

    if (!patient) {
      //if no such patient is found
      res
        .status(200)
        .send({ success: false, message: "No such patient details exists" });
      return;
    }
    const tracker_id = patient.fk_tracker_id;

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
      dataArray = await arrayGenerator(maternal_weight_arr.maternal_weight,"weight");
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
      const blood_pressure_details = prisma.tracker.findFirst({
        where: {
          pk_tracker_id: tracker_id,
        },
        include: {
          blood_pressure: true,
        },
      });
      dataArray_sys = await arrayGenerator(
        blood_pressure_details.blood_pressure,
        "systolic"
      );
      dataArray_dias = await arrayGenerator(
        blood_pressure_details.blood_pressure,
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
      const fetal_movement_details = prisma.tracker.findFirst({
        where: {
          pk_tracker_id: tracker_id,
        },
        include: {
          fetal_movement: true,
        },
      });
      dataArray = await arrayGenerator(fetal_movement_details.fetal_movement);
      let result = await fetalMovement(dataArray, fetal_movement, "movement");
      details = {
        ...details,
        fetal_heart_rate: result,
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
      const fetal_heart_rate_details = prisma.tracker.findFirst({
        where: {
          pk_tracker_id: tracker_id,
        },
        include: {
          fetal_heart_rate: true,
        },
      });

      dataArray = await arrayGenerator(
        fetal_heart_rate_details.fetal_heart_rate,
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
      const amniotic_fluid_index_details = prisma.tracker.findFirst({
        where: {
          pk_tracker_id: tracker_id,
        },
        include: {
          amniotic_fluid_index: true,
        },
      });

      dataArray = await arrayGenerator(
        amniotic_fluid_index_details.amniotic_fluid_index,
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
      const blood_sugar_level_details = prisma.tracker.findFirst({
        where: {
          pk_tracker_id: tracker_id,
        },
        include: {
          blood_sugar_level: true,
        },
      });

      dataArray = await arrayGenerator(
        blood_sugar_level_details.blood_sugar_level,
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
        blood_sugar_levels: result,
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
      const thyroid_function_details = prisma.tracker.findFirst({
        where: {
          pk_tracker_id: tracker_id,
        },
        include: {
          thyroid_function: true,
        },
      });

      dataArray = await arrayGenerator(
        thyroid_function_details.thyroid_function,
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
      const haemoglobin_level_details = prisma.tracker.findFirst({
        where: {
          pk_tracker_id: tracker_id,
        },
        include: {
          haemoglobin_level: true,
        },
      });

      dataArray = await arrayGenerator(
        haemoglobin_level_details.haemoglobin_level,
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
