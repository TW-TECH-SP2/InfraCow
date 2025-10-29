import Medicao from "../models/Medicoes.js";

class MedicaoService {
  async getAll() {
    try {
      return await Medicao.findAll();
    } catch (error) {
      console.log(error);
    }
  }

  async create({ temp, datahora, animais_id }) {
    try {
      const novaMedicao = await Medicao.create({
        temp,
        datahora,
        animais_id,
      });
      return novaMedicao;
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id) {
    try {
      const apagado = await Medicao.destroy({ where: { id } });

      if (!apagado) {
        console.log(`Medição com a id ${id} não encontrada`);
      } else {
        console.log(`Medição com a id ${id} foi excluída`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async update(id, { temp, datahora, animais_id }) {
    try {
      const [atualizado] = await Medicao.update(
        { temp, datahora, animais_id },
        { where: { id } }
      );

      if (!atualizado) {
        console.log(`Medição com a id ${id} não encontrada`);
      } else {
        console.log(`Medição com a id ${id} atualizada com sucesso`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getOne(id) {
    try {
      console.log("Buscando medição ID:", id);

      const medicao = await Medicao.findOne({ where: { id } });

      if (!medicao) {
        console.log(`Medição com a id ${id} não encontrada`);
      }

      return medicao;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new MedicaoService();
