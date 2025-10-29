import Usuario from "../models/Usuario.js";
import bcrypt from "bcrypt";

class usuarioService {
  async Create(nome, email, senha) {
    try {
      const hash = await bcrypt.hash(senha, 10);
      const novoUsuario = await Usuario.create({
        nome,
        email,
        senha: hash,
      });
      return novoUsuario;
    } catch (error) {
      console.log(error);
    }
  }

  async getOne(email) {
    try {
      const usuario = await Usuario.findOne({ where: { email } });
      return usuario;
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      const usuario = await Usuario.findByPk(id);
      return usuario;
    } catch (error) {
      console.log("Erro ao buscar usuário por ID:", error);
      throw error;
    }
  }

  async update(id, dadosAtualizados) {
    try {
      const usuario = await Usuario.findByPk(id);

      if (!usuario) {
        throw new Error("Usuário não encontrado");
      }

      await usuario.update(dadosAtualizados);
      return usuario;
    } catch (error) {
      console.log("Erro ao atualizar usuário:", error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        throw new Error("Usuário não encontrado");
      }
      await usuario.destroy();
      return true;
    } catch (error) {
      console.log("Erro ao deletar usuário:", error);
      throw error;
    }
  }
}

export default new usuarioService();