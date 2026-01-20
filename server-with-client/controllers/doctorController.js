import doctorModel from "../models/doctorModel.js";

//add doctor
export const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      degree,
      fees,
      about,
      gender,
      phone,
      address,
      image,
      speciality,
      experience,
    } = req.body;
    if (
      !name ||
      !email ||
      !degree ||
      !fees ||
      !about ||
      !gender ||
      !phone ||
      !address ||
      !speciality ||
      !experience
    ) {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }
    const photoBase64 = req.file && req.file.buffer.toString("base64");
    const doctorData = {
      name,
      email,
      degree,
      fees,
      about,
      gender,
      phone,
      address,
      image: photoBase64,
      speciality,
      experience,
    };
    const doctor = new doctorModel(doctorData);
    await doctor.save();

    res.status(201).send({
      success: true,
      message: "Doctor Created",
      doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In add DOctor API",
      error,
    });
  }
};

//Get All Doc
export const getAllDoctor = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    res.status(200).send({
      success: true,
      message: "All Doctors List",
      totalCount: doctors.length,
      doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In get all DOctor API",
      error,
    });
  }
};

//get doc details
export const getDoctorDetails = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "Pleae add doctor id",
      });
    }
    //find doc
    const doctor = await doctorModel.findById(id);
    if (!doctor) {
      return res.status(404).send({
        success: false,
        message: "No Doctor Found With This ID",
      });
    }
    res.status(200).send({
      success: true,
      message: "Details Fetched Successfully",
      doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In get  DOctor details api API",
      error,
    });
  }
};

//update doctor
export const updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "Pleae add doctor id",
      });
    }
    const data = req.body;
    const photoBase64 = req.file && req.file.buffer.toString("base64");
    const doctor = await doctorModel.findByIdAndUpdate(
      id,
      { $set: data },
      { returnOriginal: false }
    );

    res.status(200).send({
      success: true,
      message: "Doctor Details Updated",
      doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In update  DOctor  API",
      error,
    });
  }
};

//delete doctor
export const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "Pleae add doctor id",
      });
    }
    await doctorModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Doctor Has been Deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In delete  DOctor  API",
      error,
    });
  }
};

//update avaialble sattus
export const updateAvailableStatus = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "Pleae add doctor id",
      });
    }
    const { availabeStatus } = req.body;
    if (!availabeStatus) {
      return res.status(404).send({
        success: false,
        message: "please provide availabe status",
      });
    }
    const doctor = await doctorModel.findByIdAndUpdate(
      id,
      { $set: { available: availabeStatus } },
      { returnOriginal: false }
    );
    res.status(200).send({
      success: true,
      message: "Doctor Available Status Has been Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In update avaialble  DOctor  API",
      error,
    });
  }
};
