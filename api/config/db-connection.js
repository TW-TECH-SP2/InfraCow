import mongoose from "mongoose";

const dbUser = "ricardofatec290";
const dbPassword = "gfNFm4OPTLtaa588";

const connect = () => {
  mongoose.connect(
    `mongodb+srv://${dbUser}:${dbPassword}@infracow.exklr9b.mongodb.net/infracow?retryWrites=true&w=majority&appName=infracow`
  );
  const connection = mongoose.connection;
  connection.on("error", () => {
    console.log("Erro ao conectar com o MongoDB");
  });
  connection.on("open", () => {
    console.log("Conectado ao MongoDB com sucesso!");
  });
};
connect();

export default mongoose;