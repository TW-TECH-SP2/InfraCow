import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import GradientInput from '../components/GradientInput';
import GradientButton from '../components/GradientButton';
import GradientBorder from '../components/GradientBorder';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <GradientBorder className="w-full max-w-lg">
        <div className="bg-gray-900 p-8 rounded-3xl flex flex-col items-center">

          
          <h1 className="text-white text-3xl font-bold mb-8 text-center">Login</h1>
          
          <form onSubmit={handleSubmit} className="w-full">
            <GradientInput
              label="Email"
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            
            <GradientInput
              label="Senha"
              type="password"
              placeholder="**********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            <div className="mt-8">
              <GradientButton type="submit">
                Entrar
              </GradientButton>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Cadastre-se <Link to="/register" className="text-white font-medium hover:underline">aqui!</Link>
              </p>
            </div>
          </form>
        </div>
      </GradientBorder>
    </div>
  );
};

export default Login;