import usuarioService from "../services/usuarioService.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const JWTSecret = "apiinfracow";

const criarUsuario = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        await usuarioService.Create(nome, email, senha);
        res.sendStatus(201);
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
}

const loginUsuario = async (req, res) => {
    try {
        const { email, senha} = req.body;
        if (email != undefined) {
            const usuario = await usuarioService.getOne(email);
            if (usuario != undefined) {
                if (usuario.senha == senha) {
                    jwt.sign(
                        { id: usuario._id, email: usuario.email },
                        JWTSecret,
                        { expiresIn: "24h" },
                        (error, token) => {
                            if (error) {
                                res.status(400).json({ error: "Erro ao gerar o token" })
                            } else {
                                res.status(200).json({ token: token });
                            }
                        }
                    )
                } else {
                    res.status(401).json({ error: "Credenciais Inválidas!" })
                }
            } else {
                res.status(404).json({ error: "Usuário não encontrado!" })
            }
        } else {
            res.status(400).json({ error: "O e-mail enviado é inválido!" })
        }
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
}

export default { criarUsuario, loginUsuario, JWTSecret };