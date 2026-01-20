import { createSlice } from "@reduxjs/toolkit";
import {
  bookAppointment,
  cancelStatus,
  getAllAppointments,
  getAppointmentDetails,
  getLoginUserDetails,
  getUserData,
  loadToken,
  login,
  register,
  resetPassword,
  sendWebMessage,
  updateUserData,
} from "../actions/authActions";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    success: false,
    user: null,
    appointments: null,
    token: null,
    error: null,
    appointment: null,
  },
  reducers: {
    reset: (state) => {
      state.error = null;
      state.success = false;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //login----------------------------
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //register--------------------------------------
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //get login user data-----------------------------------
      .addCase(getLoginUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLoginUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload.user;
      })
      .addCase(getLoginUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //update user---------------------------------------------------
      .addCase(updateUserData.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload.user;
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //reset password-----------------------------------------------
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // user appointments------------------------------------------
      .addCase(getAllAppointments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.appointments = action.payload.appoinmtent;
      })
      .addCase(getAllAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // user appointments details-----------------------------------------
      .addCase(getAppointmentDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAppointmentDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.appointment = action.payload.appointmentDetails;
      })
      .addCase(getAppointmentDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // book appointments--------------------------------------------------------
      .addCase(bookAppointment.pending, (state) => {
        state.loading = true;
      })
      .addCase(bookAppointment.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(bookAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // user appointments cancel-----------------------------------------------------------
      .addCase(cancelStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(cancelStatus.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(cancelStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // web message--------------------------------------------------------------
      .addCase(sendWebMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendWebMessage.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(sendWebMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //loadtoken--------------------------------------------------------------------------
      .addCase(loadToken.fulfilled, (state, action) => [
        (state.token = action.payload),
      ])
      //getuser data-----------------------------------------------------------------
      .addCase(getUserData.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { reset, logout } = authSlice.actions;
export default authSlice.reducer;
