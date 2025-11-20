import './cadastroScreen.css';
import logoBranca from '../../assets/logo-branca.png';
import { useState } from 'react';

function CadastroScreen({ onRegister }) {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (senha !== confirmarSenha) {
      setError('As senhas não coincidem');
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/usuario`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha }),
      });

      if (!response.ok) {
        const erro = await response.json();
        throw new Error(erro.error || 'Erro ao criar conta');
      }

      const data = await response.json();
      setSuccess('Usuário cadastrado com sucesso!');

      if (onRegister) onRegister(data);

      setNome('');
      setEmail('');
      setSenha('');
      setConfirmarSenha('');
    } catch (error) {
      console.log(error)
    }
  }

  return (
        <div className="login-container">
      <div className="login-form">
        
        
        <form onSubmit={handleSubmit}>
        <img src={logoBranca} alt="InfraCow Logo" className="logo-login" />
          <h2>Crie a sua conta</h2>
          <div className="input-group">
            <label>Nome Completo</label>
            <input type="text" placeholder="______" value={nome} onChange={(e) => setNome(e.target.value)} required/>
          </div>
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="______" value={email} onChange={(e) => setEmail(e.target.value)} required/>
          </div>
          
          <div className="input-group">
            <label>Senha</label>
            <input type="password" placeholder="______" value={senha} onChange={(e) => setSenha(e.target.value)} required/>
          </div>
          <div className="input-group">
            <label>Confirme sua senha</label>
            <input type="password" placeholder="______" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} required/>
          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}

          <button type="submit" className="login-btn">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}

export default CadastroScreen;