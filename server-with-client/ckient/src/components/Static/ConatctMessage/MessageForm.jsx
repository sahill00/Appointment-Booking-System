import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { sendWebMessage } from "../../../redux/actions/authActions";

const MessageForm = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [contact, setContact] = useState("");

  const dispatch = useDispatch();

  const { success, error } = useSelector((state) => state.auth);

  const handleMessage = () => {
    if (!name || !contact || !message) {
      return toast.error("Please Provide name or conctact or message");
    }
    const msgData = { name, contact, message };
    dispatch(sendWebMessage(msgData));
    if (success) {
      toast.success("message sent successfully");
      setName("");
      setMessage("");
      setContact("");
    }
    if (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <div className="mform">
        <h1>Send Us Message</h1>
        <input
          type="text"
          placeholder="enter your name"
          required={true}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="enter your email"
          required={true}
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        <textarea
          placeholder="enter your message"
          name="message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button className="btn" onClick={handleMessage}>
          Send Message
        </button>
      </div>
    </>
  );
};

export default MessageForm;
