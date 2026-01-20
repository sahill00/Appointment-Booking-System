import mongoose from "mongoose";

const webMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "name is required"] },
    contact: {
      type: String,
      require: [true, "contact no or email is required"],
    },
    message: { type: String, require: [true, "message is require"] },
  },
  { timestamps: true }
);

const webmessageModel = mongoose.model("webmessage", webMessageSchema);

export default webmessageModel;
