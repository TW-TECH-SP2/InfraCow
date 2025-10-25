import jwt from "jsonwebtoken";
import JWTSecret from "../controllers/usuarioController.js";

const Autorizacao = (req, res, next) => {
  const autenticacaoToken = req.headers["autorizacao"];
  if (!autenticacaoToken) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  const [bearer, token] = autenticacaoToken.split(" ");

  if (bearer !== "Bearer" || !token) {
    return res.status(401).json({ error: "Formato do token inválido" });
  }

  jwt.verify(token, JWTSecret, (error, decoded) => {
    if (error) {
      return res.status(401).json({ error: "Token inválido ou expirado" });
    }

    req.usuarioLogado = {
      id: decoded.id,
      email: decoded.email,
    };
    next();
  });
};

export default Autorizacao ;
