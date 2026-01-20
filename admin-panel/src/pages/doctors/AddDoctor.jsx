import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { addDoctor } from "../../redux/actions/doctorActions";
import InputForm from "../../components/Forms/InputForm";
import InputSelect from "../../components/Forms/InputSelect";

const AddDoctor = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [speciality, setSpeciality] = useState("");
  const [experience, setExperience] = useState("");
  const [degree, setDegree] = useState("");
  const [about, setAbout] = useState("");
  const [fees, setFees] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddDoctor = () => {
    if (
      !name ||
      !email ||
      !about ||
      !speciality ||
      !fees ||
      !experience ||
      !degree ||
      !address ||
      !phone ||
      !image
    ) {
      return toast.error("Please provide all fields");
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("about", about);
    formData.append("speciality", speciality);
    formData.append("fees", fees);
    formData.append("experience", experience);
    formData.append("degree", degree);
    formData.append("address", address);
    formData.append("phone", phone);
    formData.append("image", image);
    formData.append("gender", gender);

    dispatch(addDoctor(formData));
    if (success) {
      toast.success("Doctor Created!");
      navigate("/all-doctors");
    }
    if (error) {
      toast.error(error);
    }
  };
  const { success, error } = useSelector((state) => state.doctor);
  return (
    <Layout>
      <div className="d-flex p-3 justify-content-between bg-light">
        <button
          className="btn btn-primary"
          onClick={() => navigate("/all-doctors")}
        >
          GO Back
        </button>
      </div>
      <div className="w-75">
        <InputForm label={"Name"} value={name} setValue={setName} />
        <InputForm label={"Email"} value={email} setValue={setEmail} />
        <InputForm label={"Degree"} value={degree} setValue={setDegree} />
        <InputSelect
          label={"Spceciality"}
          value={speciality}
          setValue={setSpeciality}
          options={["Select Spceciality", "Genral", "dental", "Mental", "eye"]}
        />
        <InputSelect
          label={"GENDER"}
          value={gender}
          setValue={setGender}
          options={["Select Gender", "Male", "Female"]}
        />
        <InputForm
          label={"experience"}
          value={experience}
          setValue={setExperience}
        />
        <InputForm label={"Fees"} value={fees} setValue={setFees} />
        <InputForm label={"About"} value={about} setValue={setAbout} />
        <InputForm label={"Phone"} value={phone} setValue={setPhone} />
        <InputForm label={"Address"} value={address} setValue={setAddress} />
        <div className="mb-3">
          <label htmlFor="form-label">Select Image File : </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="form-control"
          />
        </div>
        <button className="btn btn-primary" onClick={handleAddDoctor}>
          ADD NEW DOCTOR
        </button>
      </div>
    </Layout>
  );
};

export default AddDoctor;
