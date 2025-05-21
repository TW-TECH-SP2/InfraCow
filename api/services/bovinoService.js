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

  async Create(name, weight, age, id_RFID, type) {
    try {
      const newBovino = new Bovino({
        name,
        weight,
        age,
        id_RFID,
        type
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

  async Update(id, name, weight, age, id_RFID, type) {
    try {
      const updateBovino = await Bovino.findByIdAndUpdate(
        id,
        {
          name,
          weight,
          age,
          id_RFID,
          type
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