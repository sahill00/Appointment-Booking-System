import React, { useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../redux/actions/userAction";
import { useParams } from "react-router-dom";

const UserDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserDetails(id));
  }, [dispatch, id]);

  const { user, appoinmtents } = useSelector((state) => state.user);
  return (
    <Layout>
      <div className="row d-flex align-items-center bg-light mt-3 p-3">
        <h3 className="text-center">User Details</h3>
        <div className="col-md-4">
          <img
            src={`data:image/jpeg;base64,${user?.image}`}
            alt="userImage"
            height={200}
            width={200}
            className="rounded-1 bg-info"
          />
        </div>
        <div className="col-md-8">
          <h4>NAME : {user?.name}</h4>
          <h4>EMAIL : {user?.email}</h4>
          <h4>PHONE : {user?.phone || "NA"}</h4>
          <h4>ADDRESS : {user?.address || "NA"}</h4>
        </div>
      </div>
      <div>
        <h2>All Appointments</h2>
        <table className="table mt-2  ">
          <thead>
            <tr>
              <th>SN</th>
              <th>DATE</th>
              <th>DOCTOR ID</th>
              <th>FEES</th>
              <th>STATUS</th>
              <th>PAYMENT</th>
            </tr>
          </thead>
          <tbody>
            {appoinmtents?.map((a, i) => (
              <tr key={i + 1}>
                <td>{i + 1}</td>
                <td>{a?.slotDate}</td>
                <td>{a?.doctorId}</td>
                <td>{a?.amount}</td>
                <td>{a?.status}</td>
                <td>{a?.payment ? "ONLINE" : "CASH"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default UserDetails;
