import React, { useEffect } from "react";
import { Link, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getAppointmentDetails } from "../../redux/actions/authActions";

const AppointmentDetails = () => {
  const { id } = useParams();

  const dispatch = useDispatch();
  const { appointment } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getAppointmentDetails(id));
  }, [dispatch, id]);

  return (
    <div>
      <div className="card m-4" style={{ width: "50rem" }}>
        <div className="card-header d-flex">
          <h4>Your Appointment Details</h4>
          <Link className="btn btn-dark ms-auto" to={"/user/appointments"}>
            GO BACK
          </Link>
        </div>
        <div className="card-body">
          <p>Doctor Name : {appointment?.doctorName}</p>
          <p>Doctor Phone : {appointment?.doctorPhone}</p>
          <p>Doctor Email : {appointment?.doctorEmail}</p>
          <p>Booking Date : {appointment?.bookingDate}</p>
          <p>Booking Time : {appointment?.bookingTime}</p>
          <p>Doctor Amount : {appointment?.amount}/- RS</p>
          <h4 className="bg-info w-50 text-light p-3">
            Booking Status : {appointment?.bookingStatus}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetails;
