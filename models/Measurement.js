import mongoose from "mongoose";

const measurementSchema = new mongoose.Schema({
  captureDate: String,
  timeStamp: String,
  localCapture: String,
  temp: [[Number]],
});

const Measurement = mongoose.model("Measurement", measurementSchema);

export default Measurement;