import Alert from "../models/Alert.js";
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

  async Create(timeStamp, temp) {
    try {
      const newMeasurement = new Measurement({ timeStamp, temp });
      const savedMeasurement = await newMeasurement.save();

      if (temp > 40) {
        const risk = "Febre";
        const notes = `Temperatura elevada detectada: ${temp}°C`;

        const newAlert = new Alert({
          risk,
          notes,
          id_medicao: savedMeasurement._id,
        });

        await newAlert.save();
      }

      return savedMeasurement;
    } catch (error) {
      console.log(error);
    }
  }

  async Delete(id) {
    try {
      await Measurement.findByIdAndDelete(id);
      await Alert.findOneAndDelete({ id_medicao: id });
      console.log(`O sensor com a id: ${id} foi deletado`);
    } catch (error) {
      console.log(error);
    }
  }

  async Update(id, timeStamp, temp) {
    try {
      const updatedMeasurement = await Measurement.findByIdAndUpdate(
        id,
        { timeStamp, temp },
        { new: true, runValidators: true }
      );

      if (temp > 40) {
        const existingAlert = await Alert.findOne({ id_medicao: id });
        const risk = "Febre";
        const notes = `Temperatura elevada detectada: ${temp}°C`;

        if (existingAlert) {
          existingAlert.risk = risk;
          existingAlert.notes = notes;
          await existingAlert.save();
        } else {
          await Alert.create({ risk, notes, id_medicao: id });
        }
      } else {
        await Alert.findOneAndDelete({ id_medicao: id });
      }

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
