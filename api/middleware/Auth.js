import jwt from "jsonwebtoken";
import userController from "../controllers/userController.js";

const Authorization = (req, res, next) => {
  const authToken = req.headers["authorization"];
  if (authToken != undefined) {
    const bearer = authToken.split(" ");
    var token = bearer[1];
    jwt.verify(token, userController.JWTSecret, (err, data) => {
      if (err) {
        res.status(401).json({ err: "Token Inválido!" });
      } else {
        req.token = token;
        req.loggedUser = {
          id: data.id,
          email: data.email,
        };
        next();
      }
    });
  } else {
    res.status(401).json({ err: "Token Inválido!" });
  }
};

export default { Authorization };
