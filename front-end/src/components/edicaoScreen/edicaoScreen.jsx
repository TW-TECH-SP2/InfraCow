import "./edicaoScreen.css";
import logoBranca from "../../assets/logo-branca.png";
import { useState, useEffect } from "react";
import axios from "axios";

function EdicaoScreen() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Usuário não autenticado");
          return;
        }

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/usuarios/me`,
          {
            headers: { autorizacao: `Bearer ${token}` },
          }
        );

        const data = response.data.usuario;
        setUserId(data.id);

        setFormData({
          nome: data.nome || "",
          email: data.email || "",
          senha: "",
          confirmarSenha: "",
        });
      } catch (error) {
        console.log("Erro ao buscar usuário: ", error);
        alert("Erro ao carregar dados ao usuário!");
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.senha && formData.senha !== formData.confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${import.meta.env.VITE_API_URL}/usuarios/${userId}`,
        {
          nome: formData.nome,
          email: formData.email,
          senha: formData.senha || undefined,
        },
        {
          headers: { autorizacao: `Bearer ${token}` },
        }
      );
      alert("Dados atualizados com sucesso!");
    } catch (error) {
      console.log("Erro ao atualizar o usuário: ", error);
      alert("Erro ao atualizar dados!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <img src={logoBranca} alt="InfraCow Logo" className="logo-login" />
          <h2>Edite seus dados</h2>

          <div className="input-group">
            <label>Nome Completo</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Senha</label>
            <input
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              placeholder="Deixe em branco se não quiser alterar"
            />
          </div>

          <div className="input-group">
            <label>Confirme sua senha</label>
            <input
              type="password"
              name="confirmarSenha"
              value={formData.confirmarSenha}
              onChange={handleChange}
              placeholder="Deixe em branco se não quiser alterar"
            />
          </div>

          <button type="submit" className="login-btn">
            Salvar Alterações
          </button>
        </form>
      </div>
    </div>
  );
}

export default EdicaoScreen;
