import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAppointmentDetails,
  updateAppointmentStatus,
} from "../../redux/actions/appointmentAction";
import InputSelect from "../../components/Forms/InputSelect";
import toast from "react-hot-toast";

const AppontementDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [appoinmtentStatus, setAppoinmtentStatus] = useState("");

  useEffect(() => {
    dispatch(getAppointmentDetails(id));
  }, [dispatch, id]);

  const { appointment, error, success } = useSelector(
    (state) => state.appointments
  );

  useEffect(() => {
    if (appointment) {
      setAppoinmtentStatus(appointment?.bookingStatus);
    }
  }, [appointment]);

  const handleUpdateStatus = () => {
    dispatch(updateAppointmentStatus({ id, appoinmtentStatus }));
    if (success) {
      toast.success("Status Updated ");
      navigate("/all-appointments");
    }
    if (error) {
      toast.error(error);
    }
  };

  return (
    <Layout>
      <h1>AppontementDetails</h1>
      <table className="table">
        <tbody>
          <tr>
            <th>Client name</th>
            <td>{appointment?.clientName}</td>
          </tr>
          <tr>
            <th>Client Phone </th>
            <td>{appointment?.clientPhone}</td>
          </tr>
          <tr>
            <th>Client Email</th>
            <td>{appointment?.clientEmail}</td>
          </tr>
          <tr>
            <th>Doctor name</th>
            <td>{appointment?.doctorName}</td>
          </tr>
          <tr>
            <th>Doctor Phone</th>
            <td>{appointment?.doctorPhone}</td>
          </tr>
          <tr>
            <th>Doctor Email</th>
            <td>{appointment?.doctorEmail}</td>
          </tr>
          <tr>
            <th>Booking Date</th>
            <td>{appointment?.bookingDate}</td>
          </tr>
          <tr>
            <th>Booking Time</th>
            <td>{appointment?.bookingTime}</td>
          </tr>
          <tr>
            <th>Booking Amount</th>
            <td>{appointment?.amount}</td>
          </tr>
          <tr>
            <th>Booking Status</th>
            <td>{appointment?.bookingStatus}</td>
          </tr>
        </tbody>
      </table>
      <div className="mt-4 w-50">
        <h4>Update Booking Status</h4>
        <InputSelect
          value={appoinmtentStatus}
          setValue={setAppoinmtentStatus}
          options={["pending", "completed", "cancel"]}
        />
        <button className="btn btn-primary" onClick={handleUpdateStatus}>
          UPDATE STATUS
        </button>
      </div>
    </Layout>
  );
};

export default AppontementDetails;
