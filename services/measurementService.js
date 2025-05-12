import Measurement from "../models/Measurement.js";

class measurementService {

  async getAll() {
    try {
      const measurements = await Measurement.find();
      return measurements;
    } catch (error) {
      console.log(error);
    }
  }

  async Create(
    captureDate,
    timeStamp,
    localCapture,
    temp
  ) {
    try {
      const newMeasurement = new Measurement({
        captureDate,
        timeStamp,
        localCapture,
        temp,
      });
      await newMeasurement.save();
    } catch (error) {
      console.log(error);
    }
  }

  async Delete(id) {
    try {
      await Measurement.findByIdAndDelete(id);
      console.log(`O sensor com a id: ${id} foi deletado`);
    } catch (error) {
      console.log(error);
    }
  }

  async Update(
    id,
    captureDate,
    timeStamp,
    localCapture,
    temp,
  ) {
    try {
      const updatedMeasurement = await Measurement.findByIdAndUpdate(
        id,
        {
          captureDate,
          timeStamp,
          localCapture,
          temp,
        },
        { new: true }
      );
      console.log(`Dados do Sensor com a id: ${id} alterados com sucesso`);
      return updatedMeasurement;
    } catch (error) {
      console.log(error);
    }
  }
  
  async getOne(id) {
    try {
      const measurement = await Measurement.findOne({ _id: id });
      return measurement;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new measurementService();