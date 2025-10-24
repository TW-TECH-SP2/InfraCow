import Fazenda from "../models/Fazenda.js";

class fazendaService {
  async getAll() {
    try {
      const fazendas = await Fazenda.findAll();
      return fazendas;
    } catch (error) {
      console.log(error);
    }
  }

  async Create(nome_fazenda, rua, bairro, cidade, CEP, numero) {
    try {
      await Fazenda.create({
        nome_fazenda,
        rua,
        bairro,
        cidade,
        CEP,
        numero,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async Delete(id) {
    try {
      await Fazenda.destroy({ where: {id} });
      console.log(`Fazenda com o id ${id} foi excluída`);
    } catch (error) {
      console.log(error);
    }
  }
  async Update(id, nome_fazenda, rua, bairro, cidade, CEP, numero) {
    try {
      await Fazenda.update({
        nome_fazenda,
        rua,
        bairro,
        cidade,
        CEP,
        numero,
      },
      { where: { id } }
    );
      console.log(`Dados da fazenda com o id ${id} alterados com sucesso!`);
    } catch (error) {
      console.log(error);
    }
  }

  async getOne(id) {
    try {
      const fazenda = await Fazenda.findByPk(id);
      return fazenda;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new fazendaService();