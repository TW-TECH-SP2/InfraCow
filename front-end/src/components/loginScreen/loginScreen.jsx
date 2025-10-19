import './loginScreen.css';
import logoBranca from '../../assets/logo-branca.png';

function LoginScreen({ onLogin, onRegister }) {
  return (
        <div className="login-container">
      <div className="login-form">
        
        
        <form>
          <img src={logoBranca} alt="InfraCow Logo" className="logo-login" />
          <h2>Entre com<br />a sua conta</h2>
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="______" />
          </div>
          
          <div className="input-group">
            <label>Senha</label>
            <input type="password" placeholder="______" />
          </div>
          
          <div className="remember">
            <label className="checkbox">
              <input type="checkbox" />
              <span className="checkmark"></span>
              Lembrar de mim
            </label>
          </div>
          {/* quando for por backend, tirar o onclick do button e mudar o type pra submit @ricardo*/}
          <button type="button" onClick={onLogin}  className="login-btn">Entrar</button>
        </form>
      </div>
    </div>
  );
}

export default LoginScreen;