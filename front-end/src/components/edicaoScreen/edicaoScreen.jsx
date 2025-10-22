import './edicaoScreen.css';
import logoBranca from '../../assets/logo-branca.png';

function EdicaoScreen() {
  return (
        <div className="login-container">
      <div className="login-form">
        
        
        <form>
        <img src={logoBranca} alt="InfraCow Logo" className="logo-login" />
          <h2>Edite seus dados</h2>
          <div className="input-group">
            <label>Nome Completo</label>
            <input type="text" placeholder="______" />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="______" />
          </div>
          
          <div className="input-group">
            <label>Senha</label>
            <input type="password" placeholder="______" />
          </div>
          <div className="input-group">
            <label>Confirme sua senha</label>
            <input type="password" placeholder="______" />
          </div>
          <button type="submit" className="login-btn">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}

export default EdicaoScreen;