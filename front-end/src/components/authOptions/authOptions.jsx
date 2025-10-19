import './authOptions.css';
import logoBranca from '../../assets/logo-branca.png';

function AuthOptions({ onLogin, onRegister }) {
  return (
    <div className="auth">
      <img src={logoBranca} alt="InfraCow Logo" className="logo-auth" />

      <div className="login">
        <button onClick={onLogin}>Entrar</button>
      </div>
      
      <div className="cadastro">
        <a href="#" onClick={onRegister}>
          Não possui uma conta? <u>Cadastre-se</u>
        </a>
      </div>
    </div>
  );
}

export default AuthOptions;