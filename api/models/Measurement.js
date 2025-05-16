import mongoose from "mongoose";

const measurementSchema = new mongoose.Schema({
  timeStamp: String,
  temp: [[Number]],
  id_bovino: {type: mongoose.Schema.Types.ObjectId, ref: "Bovino"}
});

const Measurement = mongoose.model("Measurement", measurementSchema);

export default Measurement;