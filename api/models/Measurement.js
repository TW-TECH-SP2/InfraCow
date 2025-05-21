import mongoose from "mongoose";

const measurementSchema = new mongoose.Schema({
  timeStamp: String,
  temp: Number,
});

const Measurement = mongoose.model("Measurement", measurementSchema);

export default Measurement;
