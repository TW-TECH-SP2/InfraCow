import mongoose from "mongoose";

const bovinoSchema = new mongoose.Schema({
  name: String,
  weight: Number,
  birth: Number,
  id_RFID: String,
});

const Bovino = mongoose.model("Bovino", bovinoSchema);

export default Bovino;