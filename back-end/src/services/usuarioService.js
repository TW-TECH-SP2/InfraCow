import Usuario from "../models/Usuario.js";
import bcrypt from 'bcrypt'

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
            console.log(error)
        }
    } 

    async getOne(email) {
        try {
            const usuario = await Usuario.findOne({ where: { email } });
            return usuario;
        } catch (error) {
            console.log(error)
        }
    }
}

export default new usuarioService;