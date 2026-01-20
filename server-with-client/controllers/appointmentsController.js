import appointmentModel from "../models/appointmentsModel.js";
import doctorModel from "../models/doctorModel.js";
import userModel from "../models/userModel.js";

//create
export const bookAppointment = async (req, res) => {
  try {
    const { userId, doctorId, amount, slotDate, slotTime } = req.body;
    if (!userId || !doctorId || !amount || !slotTime || !slotDate) {
      return res.status(400).send({
        success: false,
        message: "Please provide all fileds",
      });
    }
    const appointment = new appointmentModel({
      userId,
      doctorId,
      slotDate,
      slotTime,
      amount,
    });

    await appointment.save();
    res.status(201).send({
      success: true,
      message: "Appointment Book Successfully",
      appointment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In create appointment API",
      error,
    });
  }
};

//get all appointments
export const getAllAppointments = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});
    res.status(200).send({
      success: true,
      message: "All Appointments",
      totalCount: appointments.length,
      appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In get all appointment API",
      error,
    });
  }
};

//get details
export const getAppointmentDetails = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "Please Prvide Appointment ID",
      });
    }
    const appointment = await appointmentModel.findById(id);
    if (!appointment) {
      return res.status(404).send({
        success: false,
        message: "no Appointment foud with this ID",
      });
    }
    //find user & doctor
    const user = await userModel.findOne({ _id: appointment?.userId });
    const doctor = await doctorModel.findOne({ _id: appointment?.doctorId });
    res.status(200).send({
      success: true,
      message: "Appointment Details Fetched Successfully",
      appointmentDetails: {
        clientName: user?.name,
        clientPhone: user?.phone,
        clientEmail: user?.email,
        doctorName: doctor?.name,
        doctorPhone: doctor?.phone,
        doctorEmail: doctor?.email,
        bookingDate: appointment?.slotDate,
        bookingTime: appointment?.slotTime,
        amount: appointment?.amount,
        bookingStatus: appointment?.status,
        paymentMode: appointment?.payment,
        createdAt: appointment?.createdAt,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In get  appointment details API",
      error,
    });
  }
};

//change status
export const updateAppointmentSattus = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "Please Prvide Appointment ID",
      });
    }
    const { appoinmtentStatus } = req.body;
    if (!appoinmtentStatus) {
      return res.status(404).send({
        success: false,
        message: "Please Prvide appoinmtent Status",
      });
    }
    const appointment = await appointmentModel.findByIdAndUpdate(
      id,
      { $set: { status: appoinmtentStatus } },
      { returnOriginal: false }
    );
    res.status(200).send({
      success: true,
      message: "Appointment Status Has Been Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In update status  appointment  API",
      error,
    });
  }
};

//user appointments
export const getUserAppointments = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "Please Prvide Appointment ID",
      });
    }
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }

    const appoinmtent = await appointmentModel.find({ userId: user?._id });
    res.status(200).send({
      success: true,
      message: "Your Appointments",
      totalCount: appoinmtent.length,
      appoinmtent,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In get User appointment  API",
      error,
    });
  }
};

//get user appontment details
export const getUserAppointmentDetails = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "Please Prvide Appointment ID",
      });
    }

    const appointment = await appointmentModel.findById(id);
    const doctor = await doctorModel.findOne({ _id: appointment?.doctorId });

    res.status(200).send({
      success: true,
      message: "Appointment Details Fetched Successfully",
      appointmentDetails: {
        doctorName: doctor?.name,
        doctorPhone: doctor?.phone,
        doctorEmail: doctor?.email,
        bookingDate: appointment?.slotDate,
        bookingTime: appointment?.slotTime,
        amount: appointment?.amount,
        bookingStatus: appointment?.status,
        paymentMode: appointment?.payment,
        createdAt: appointment?.createdAt,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In get  appointment details API",
      error,
    });
  }
};

//update user booking sattaus
export const cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "Please Prvide Appointment ID",
      });
    }
    const appoinmtent = await appointmentModel.findById(id);
    if (!appoinmtent) {
      return res.status(404).send({
        success: false,
        message: "No Appointment found wiuth this ID",
      });
    }
    await appoinmtent.updateOne({ $set: { status: "cancel" } });
    res.status(200).send({
      success: true,
      message: "Appoinmtent Canceled Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In cancel  appointment  API",
      error,
    });
  }
};
