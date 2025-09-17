import express from "express";
import medidasRouter from "./routes/medicoesRoutes.js";
const app = express();
app.use(express.urlencoded({ extend: false }));
app.use(express.json());
app.use("/", medidasRouter);

const port = 4000;
app.listen(port, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`API Rodando em http://localhost:${port}`);
  }
});
