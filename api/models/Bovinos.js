import mongoose from "mongoose";

const bovinoSchema = new mongoose.Schema({
  name: String,
  weight: Number,
  age: Number,
  id_RFID: String,
  type: String
});

const Bovino = mongoose.model("Bovino", bovinoSchema);

export default Bovino;