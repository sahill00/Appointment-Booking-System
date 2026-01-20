import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import DoctorData from "./DoctorsData.json";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setHours, setMinutes } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { getDoctorDetails } from "../../redux/actions/doctorActions";
import { bookAppointment } from "../../redux/actions/authActions";
import toast from "react-hot-toast";
import { reset } from "../../redux/slice/authSlice";

const Appointments = () => {
  const { id } = useParams();
  const [docInfo, setDocInfo] = useState(null);
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getDoctorDetails(id));
  }, [dispatch, id]);

  const { doctor } = useSelector((state) => state.doctor);

  useEffect(() => {
    if (doctor) {
      setDocInfo(doctor);
    }
  }, [doctor]);

  //get date and time
  const extractDate = (dtaeObj) => {
    const day = String(dtaeObj.getDate()).padStart(2, "0");
    const month = String(dtaeObj.getMonth() + 1).padStart(2, "0");
    const year = dtaeObj.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const extractTime = (ObjectTime) => {
    let hours = ObjectTime.getHours();
    const minutes = ObjectTime.getMinutes();
    const second = ObjectTime.getSeconds();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${String(hours).padStart(2, "0")}: 
    ${String(minutes).padStart(2, "0")}:
    ${String(second).padStart(2, "0")} ${ampm}`;
  };

  const { success, error, user } = useSelector((state) => state.auth);

  const handleBooking = () => {
    const bookingData = {
      userId: user?._id,
      doctorId: id,
      amount: docInfo?.fees,
      slotDate: extractDate(selectedDateTime),
      slotTime: extractTime(selectedDateTime),
    };
    dispatch(bookAppointment(bookingData));
    dispatch(reset());
  };

  useEffect(() => {
    if (success) {
      toast.success("Booking Successfull");
      navigate("/user/appointments");
      dispatch(reset());
    }
    if (error) {
      toast.error(error);
      dispatch(reset());
    }
  }, [dispatch, error, success, navigate]);

  return (
    <>
      <div
        className="container docinfo-container"
        style={{ minHeight: "55vh" }}
      >
        <div className="row m-3">
          <div className="col-md-3 d-flex flex-column justify-content-center align-items-center">
            <img
              src={`data:image/jpeg;base64,${docInfo?.image}`}
              alt="docImage"
              height={200}
              width={200}
            />
            <h6>{docInfo?.name}</h6>
            <h6
              className={`${
                docInfo?.available ? "text-success" : "text-danger"
              }`}
            >
              {docInfo?.available ? "Available" : "Not Available"}
            </h6>
          </div>
          <div className="col-md-8 d-flex flex-column justify-content-center m=3">
            <h6>Experinece: {docInfo?.experience} Year's</h6>
            <h6>About Doctor :</h6>
            <p>{docInfo?.about}</p>
            <h5>Consultation Fee : {docInfo?.fees}</h5>
            {/* date time */}
            <div className="date-time mt-3">
              <h6 className="">Select Your Booking Date & Time : 👇 </h6>
              <DatePicker
                className="calender"
                minDate={new Date()}
                selected={selectedDateTime}
                onChange={(date) => setSelectedDateTime(date)}
                showTimeSelect
                timeFormat="h:mm aa"
                timeIntervals={30}
                dateFormat={"d-MMMM-yyyy h:mm aa"}
                timeCaption="Time"
                minTime={new Date()}
                maxTime={setHours(setMinutes(new Date(), 2), 22)}
              />
              <p>
                Your Selected Booking :
                {selectedDateTime
                  ? selectedDateTime.toLocaleString()
                  : "Please Selct a date & Time"}
              </p>
            </div>
            <button
              className="btn btn-primary w-50 "
              onClick={handleBooking}
              disabled={!docInfo?.available}
            >
              {docInfo?.available ? "Book Now" : "Doctor Not Available "}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Appointments;
