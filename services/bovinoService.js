import Bovino from "../models/Bovinos.js";

class bovinoService {
  async getAll() {
    try {
      const bovinos = await Bovino.find();
      return bovinos;
    } catch (error) {
      console.log(error);
    }
  }

  async Create(name, weight, birth, idSensor, id_RFID) {
    try {
      const newBovino = new Bovino({
        name,
        weight,
        birth,
        idSensor,
        id_RFID,
      });
      await newBovino.save();
    } catch (error) {
      console.log(error);
    }
  }

  async Delete(id) {
    try {
      await Bovino.findByIdAndDelete(id);
      console.log(`Bovino com a id: ${id} foi deletado`);
    } catch (error) {
      console.log(error);
    }
  }

  async Update(id, name, weight, birth, idSensor, id_RFID) {
    try {
      const updateBovino = await Bovino.findByIdAndUpdate(
        id,
        {
          name,
          weight,
          birth,
          idSensor,
          id_RFID,
        },
        { new: true }
      );
      console.log(`Dados do Bovino com a id: ${id} alterados com sucesso`);
      return updateBovino;
    } catch (error) {
      console.log(error);
    }
  }
  
  async getOne(id) {
    try {
      const bovino = await Bovino.findOne({ _id: id });
      return bovino;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new bovinoService();