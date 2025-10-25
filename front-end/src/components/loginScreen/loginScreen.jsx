import "./loginScreen.css";
import logoBranca from "../../assets/logo-branca.png";
import { useState } from "react";

function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      if (!response.ok) {
        const erro = await response.json();
        throw new Error(erro.error || "Falha no login");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      onLogin();
    } catch (erro) {
      setError(erro.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <img src={logoBranca} alt="InfraCow Logo" className="logo-login" />
          <h2>
            Entre com<br />a sua conta</h2>
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="______" value={email} onChange={(e) => setEmail(e.target.value)} required/>
          </div>

          <div className="input-group">
            <label>Senha</label>
            <input type="password" placeholder="______" value={senha} onChange={(e) => setSenha(e.target.value)} required/>
          </div>

          <div className="remember">
            <label className="checkbox">
              <input type="checkbox" />
              <span className="checkmark"></span>
              Lembrar de mim
            </label>
          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          {/* quando for por backend, tirar o onclick do button e mudar o type pra submit @ricardo*/}
          <button type="submit" className="login-btn">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginScreen;