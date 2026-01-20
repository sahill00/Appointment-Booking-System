import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../Api/API";

//get all appointment
export const getAllAppointments = createAsyncThunk(
  "appointment/getAllAppointments",
  async (_, thunkApi) => {
    try {
      const res = await API.get("/appointment/get-all");
      return res.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "get all appointments  error";
      return thunkApi.rejectWithValue(message);
    }
  }
);

//get getAppointmentDetails
export const getAppointmentDetails = createAsyncThunk(
  "appointment/getDoctorDetails",
  async (id, thunkApi) => {
    try {
      const res = await API.get(`/appointment/get-details/${id}`);
      return res.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "getAppointmentDetails  error";
      return thunkApi.rejectWithValue(message);
    }
  }
);

//udpate status appointment statuys
export const updateAppointmentStatus = createAsyncThunk(
  "appointment/updateAppointmentStatus",
  async ({ id, appoinmtentStatus }, thunkApi) => {
    try {
      const res = await API.patch(`/appointment/update-status/${id}`, {
        appoinmtentStatus,
      });
      return res.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "update appointment/update-status status  doc  error";
      return thunkApi.rejectWithValue(message);
    }
  }
);
