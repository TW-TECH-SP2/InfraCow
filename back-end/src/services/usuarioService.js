import Usuario from "../models/Usuario.js";

class usuarioService {
    async Create(nome, email, senha) {
        try {
            const novoUsuario = new Usuario({
                nome, 
                email,
                senha,
            });
            await novoUsuario.save();
        } catch (error) {
            console.log(error)
        }
    } 

    async getOne(email) {
        try {
            const usuario = await Usuario.findOne({ email: email });
            return usuario;
        } catch (error) {
            console.log(error)
        }
    }
}

export default new usuarioService;