import mongoose from "mongoose";

const bovinoSchema = new mongoose.Schema({
  name: String,
  weight: Number,
  age: Number,
  id_RFID: String,
  id_user: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
});

const Bovino = mongoose.model("Bovino", bovinoSchema);

export default Bovino;