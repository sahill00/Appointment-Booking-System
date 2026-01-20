import express from "express";
import { isAdmin, userAuth } from "../middlewares/authMiddlewares.js";
import {
  bookAppointment,
  cancelAppointment,
  getAllAppointments,
  getAppointmentDetails,
  getUserAppointmentDetails,
  getUserAppointments,
  updateAppointmentSattus,
} from "../controllers/appointmentsController.js";

const router = express.Router();

//CREATE || POSt
router.post("/create", userAuth, isAdmin, bookAppointment);

//GET ALL  || GET
router.get("/get-all", userAuth, isAdmin, getAllAppointments);

//GET DETAILS  || GET
router.get("/get-details/:id", userAuth, isAdmin, getAppointmentDetails);

//update status || Patch
router.patch("/update-status/:id", userAuth, isAdmin, updateAppointmentSattus);

//GET ALL USER APPOINTMENT  || GET
router.get("/get-user-appointments/:id", userAuth, getUserAppointments);

//GET USER APPOINTMENT DETAILS  || GET
router.get(
  "/get-user-appointment-details/:id",
  userAuth,
  getUserAppointmentDetails
);

//CANCEL USER APPOINTMENT || POST
router.post("/cancel/:id", userAuth, cancelAppointment);

export default router;
