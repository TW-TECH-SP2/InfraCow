import Animais from "../models/Animais.js";

class animalService {
  async getAll() {
    try {
      const animais = await Animais.findAll();
      return animais;
    } catch (error) {
      console.log(error);
    }
  }

  async Create(nome_animal, codigo, genero, tipo, raca, peso, idade) {
    try {
      await Animais.create({
        nome_animal,
        codigo,
        genero,
        tipo,
        raca,
        peso,
        idade,
      });
    } catch (error) {
      console.log(error);
    }
  }
  async Delete(id) {
    try {
      await Animais.destroy({ where: { id } });
      console.log(`Animal com a id ${id} foi excluído`);
    } catch (error) {
      console.log(error);
    }
  }

  async Update(id, nome_animal, codigo, genero, tipo, raca, peso, idade) {
    try {
      await Animais.update(
        {
          nome_animal,
          codigo,
          genero,
          tipo,
          raca,
          peso,
          idade,
        },
        { where: { id } }
      );
      console.log(`Dados do animal com o id ${id} alterados com sucesso!`);
    } catch (error) {
      console.log(error);
    }
  }

  async getOne(id) {
    try {
      const animal = await Animais.findByPk(id);
      return animal;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new animalService();