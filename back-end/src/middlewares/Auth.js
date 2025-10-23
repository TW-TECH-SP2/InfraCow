import jwt from 'jsonwebtoken'
import usuarioController from '../controllers/usuarioController.js'

const Autorizacao = (req, res, next) => {
    const autenticacaoToken = req.headers["autorizacao"];
    if (autenticacaoToken != undefined) {

        const bearer = autenticacaoToken.split(" ");
        const token = bearer[1];

        jwt.verify(token, usuarioController.JWTSecret, (error, data) => {
            if (error) {
                res.status(401).json({ error: "Token inválido. Autorização negada!" });
            } else {
                req.token = token;
                req.usuarioLogado = {
                    id: data.id,
                    email: data.email,
                };
                next();
            }
        })
    } else {
        res.status(401).json({ error: "Token inválido" })
    }
}

export default { Autorizacao };