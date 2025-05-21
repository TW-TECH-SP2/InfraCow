import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import GradientInput from '../components/GradientInput';
import GradientButton from '../components/GradientButton';
import GradientBorder from '../components/GradientBorder';

const Register: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register(email, password);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <GradientBorder className="w-full max-w-lg">
        <div className="bg-gray-900 p-8 rounded-3xl flex flex-col items-center">
          
          <h1 className="text-white text-3xl font-bold mb-8 text-center">Cadastro</h1>
          
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
                Cadastrar
              </GradientButton>
            </div>
          </form>
        </div>
      </GradientBorder>
    </div>
  );
};

export default Register;