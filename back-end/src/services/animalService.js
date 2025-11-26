import Animais from "../models/Animais.js";
import Fazenda from "../models/Fazenda.js";
import Medicao from "../models/Medicoes.js";

class animalService {
  async getAll(usuario_id) {
    try {
      return await Animais.findAll({
        include: { model: Fazenda, where: { usuario_id } },
      });
    } catch (error) {
      console.log("Erro ao buscar todos os animais:", error);
    }
  }

  async create({
    nome_animal,
    codigo,
    genero,
    tipo,
    raca,
    peso,
    idade,
    fazenda_id,
    imagem, 
  }) {
    try {
      console.log('🐄 Service: Criando animal no banco...');
      const novoAnimal = await Animais.create({
        nome_animal,
        codigo,
        genero,
        tipo,
        raca,
        peso,
        idade,
        fazenda_id,
        imagem,
      });
      console.log('✅ Service: Animal criado ID:', novoAnimal.id);
      return novoAnimal;
    } catch (error) {
      console.log("❌ Service: Erro ao criar animal:", error.message);
      throw error;
    }
  }
  async delete(id, usuario_id) {
    try {
      const animal = await Animais.findOne({
        where: { id },
        include: { model: Fazenda, where: { usuario_id } },
      });

      if (!animal) {
        console.log(
          `Animal com a id ${id} não encontrado ou não pertence ao usuário`
        );
        return false;
      }

      await animal.destroy();
      console.log(`Animal com a id ${id} foi excluído`);
      return true;
    } catch (error) {
      console.log("Erro ao excluir o animal:", error);
      return false;
    }
  }

  async update(
    id,
    usuario_id,
    { nome_animal, codigo, genero, tipo, raca, peso, idade, imagem }
  ) {
    try {
      const animal = await Animais.findOne({
        where: { id },
        include: { model: Fazenda, where: { usuario_id } },
      });

      if (!animal) {
        console.log(
          `Animal com a id ${id} não encontrado ou não pertence ao usuário`
        );
        return null;
      }

      await animal.update({
        nome_animal,
        codigo,
        genero,
        tipo,
        raca,
        peso,
        idade,
        imagem
      });
      console.log(`Dados do animal com o id ${id} alterados com sucesso!`);
      return animal;
    } catch (error) {
      console.log("Erro ao alterar os dados do animal", error);
    }
  }

  async getOne(id, usuario_id) {
    try {
      const animal = await Animais.findOne({
        where: { id },
        include: { model: Fazenda, where: { usuario_id } },
      });

      if (!animal) {
        console.log(
          `Animal com a id ${id} não encontrado ou não pertence ao usuário`
        );
        return null;
      }
      return animal;
    } catch (error) {
      console.log("Erro ao buscar o animal:", error);
    }
  }

  async getByFazendaId(fazenda_id, usuario_id) {
    try {
      console.log('🔍 Buscando animais da fazenda:', { fazenda_id, usuario_id });
      const animais = await Animais.findAll({
        where: { fazenda_id },
        include: [
          {
            model: Fazenda,
            where: { usuario_id },
            attributes: [],
          },
          {
            model: Medicao,
            attributes: ["temperatura", "data_medicao"],
            limit: 1,
            order: [["data_medicao", "DESC"]],
          },
        ],
      });

      console.log('📊 Animais encontrados:', animais.length);
      return animais.map(a => ({
        id: a.id,
        nome_animal: a.nome_animal,
        genero: a.genero || "-",
        temperatura: a.medicaos?.[0]?.temperatura ?? 0,
      }));
    } catch (error) {
      console.log("❌ Erro ao buscar animais por fazenda", error.message);
      return [];
    }
  }
}

export default new animalService();
