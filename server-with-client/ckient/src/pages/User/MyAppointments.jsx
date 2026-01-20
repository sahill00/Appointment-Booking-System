import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cancelStatus,
  getAllAppointments,
} from "../../redux/actions/authActions";
import { Link } from "react-router";
import toast from "react-hot-toast";

const MyAppointments = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const localData = localStorage.getItem("appData");
    const appData = JSON.parse(localData);
    if (appData) {
      const id = appData?.user?._id;
      dispatch(getAllAppointments(id));
    }
  }, [dispatch]);

  const { appointments, error, success } = useSelector((state) => state.auth);

  const handleCancel = (id) => {
    console.log(id);
    dispatch(cancelStatus(id));
    if (success) {
      toast.success("Cancel Successfully");
      window.location.reload();
    }
    if (error) {
      toast.error(error);
    }
  };

  return (
    <div className="container" style={{ minHeight: "55vh" }}>
      <h1 className=" m-5">My All Appointments</h1>
      <table className="table w-75 border">
        <thead>
          <tr>
            <th>SNO</th>
            <th>Booking Date</th>
            <th>FEES</th>
            <th>Status</th>
            <th>Details</th>
            <th>Update Booking</th>
          </tr>
        </thead>
        <tbody>
          {appointments?.length > 0 &&
            appointments?.map((a, i) => (
              <tr key={i + 1}>
                <td>{i + 1}</td>
                <td>{a?.slotDate}</td>
                <td>{a?.amount}</td>
                <td>{a?.status}</td>
                <td>
                  <Link to={`/user/appointments/${a?._id}`}>details</Link>
                </td>
                <td>
                  {a?.status == "pending" ? (
                    <button
                      className="btn btn-danger"
                      onClick={() => handleCancel(a?._id)}
                    >
                      Cancel
                    </button>
                  ) : (
                    "NA"
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyAppointments;
