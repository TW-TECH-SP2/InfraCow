import Alert from "../models/Alert.js";

class alertService {
  async getAll() {
    try {
      const alerts = await Alert.find().populate("id_medicao");
      return alerts;
    } catch (error) {
      console.log(error);
    }
  }

  async getOne(id) {
    try {
      const alert = await Alert.findById(id).populate("id_medicao");
      return alert;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new alertService();