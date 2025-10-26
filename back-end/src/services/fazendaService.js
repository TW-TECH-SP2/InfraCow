import Fazenda from "../models/Fazenda.js";

class fazendaService {
  async getAll(usuario_id) {
    try {
      return await Fazenda.findAll({ where: { usuario_id } });
    } catch (error) {
      console.log(error);
    }
  }

  async create({nome_fazenda, rua, bairro, cidade, CEP, numero, usuario_id, imagem}) {
    try {
       const novaFazenda = await Fazenda.create({
        nome_fazenda,
        rua,
        bairro,
        cidade,
        CEP,
        numero,
        usuario_id,
        imagem,
      });
      return novaFazenda;
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id, usuario_id) {
    try {
      const apagado = await Fazenda.destroy({ where: { id, usuario_id } });
    
      if (!apagado) {
        console.log(`Fazenda com a id ${id} não encontrada`)
      }
      console.log(`Fazenda com o id ${id} foi excluída`);
    } catch (error) {
      console.log(error);
    }
  }
  async update(id, {nome_fazenda, rua, bairro, cidade, CEP, numero, imagem}) {
    try {
      const [atualizado] = await Fazenda.update(
        {
          nome_fazenda,
          rua,
          bairro,
          cidade,
          CEP,
          numero,
          imagem
        },
        { where: { id } }
      );

      if (!atualizado) {
        console.log(`Fazenda com a id ${id} não encontrada`)
      }

      console.log(`Dados da fazenda com o id ${id} alterados com sucesso!`);
    } catch (error) {
      console.log(error);
    }
  }

  async getOne(id, usuario_id) {
    try {
      const fazenda = await Fazenda.findOne({ where: { id, usuario_id } });

      if(!fazenda) {
        console.log(`Fazenda com a id ${id} não encontrada`)
      }

      return fazenda;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new fazendaService();