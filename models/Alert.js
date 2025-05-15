import mongoose from "mongoose";

const alertSchema = new mongoose.Schema({
  risk: { type: String, required: true },
  notes: { type: String, required: true },
  id_medicao: {type: mongoose.Schema.Types.ObjectId, ref: "Measurement" },
});

const Alert = mongoose.model("Alert", alertSchema);

export default Alert;