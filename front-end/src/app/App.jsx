import { useState } from 'react';
import SplashScreen from '../components/splashScreen/splashScreen';
import AuthOptions from '../components/authOptions/authOptions';
import LoginScreen from '../components/loginScreen/loginScreen'; 
import CadastroScreen from '../components/cadastroScreen/cadastroScreen';
import HomeScreen from '../components/homeScreen/homeScreen'; 
import TutoriaisScreen from '../components/tutoriaisScreen/tutoriaisScreen';
import CadFazendaScreen from '../components/cadFazendaScreen/cadFazendaScreen'; 
import PerfilScreen from '../components/perfilScreen/perfilScreen';
import NotifScreen from '../components/notifScreen/notifScreen'; 
import EdicaoScreen from '../components/edicaoScreen/edicaoScreen';
import FazendaScreen from '../components/fazendaScreen/fazendaScreen';
import RebanhoScreen from '../components/rebanhoScreen/rebanhoScreen';
import Navbar from '../components/navbar/navbar';

function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [activeTab, setActiveTab] = useState('home');
  const [showCadFazenda, setShowCadFazenda] = useState(false);
  const [showEdicaoPerfil, setShowEdicaoPerfil] = useState(false);
  const [showFazendaDetalhes, setShowFazendaDetalhes] = useState(false);
  const [showRebanho, setShowRebanho] = useState(false); // ✅ ADICIONE ESTE ESTADO

  const handleSplashFinish = () => {
    setTimeout(() => {
      setCurrentScreen('auth');
    }, 1000);
  };

  const handleLogin = () => {
    setCurrentScreen('login'); 
  };

  const handleRegister = () => {
    setCurrentScreen('cadastro');
  };

  const handleBackToAuth = () => {
    setCurrentScreen('auth'); 
  };

  const handleLoginSuccess = () => {
    setCurrentScreen('home');
    setActiveTab('home');
  };

  const handleRegisterSuccess = () => {
    setCurrentScreen('home');
    setActiveTab('home');
  };

  const handleLogout = () => {
    setCurrentScreen('auth');
  };

  const handleCadastrarFazenda = () => {
    setShowCadFazenda(true);
  };

  const handleVoltarHome = () => {
    setShowCadFazenda(false);
    setActiveTab('home');
  };

  const handleSalvarFazenda = () => {
    setShowCadFazenda(false);
    setActiveTab('home');
  };

  const handleEditarPerfil = () => {
    setShowEdicaoPerfil(true);
  };

  const handleVoltarPerfil = () => {
    setShowEdicaoPerfil(false);
  };

  const handleSalvarPerfil = () => {
    setShowEdicaoPerfil(false);
  };

  // ✅ Função estática simples para abrir fazenda
  const handleAbrirFazenda = () => {
    setShowFazendaDetalhes(true);
  };

  const handleVoltarParaHome = () => {
    setShowFazendaDetalhes(false);
  };

  // ✅ ADICIONE ESTAS FUNÇÕES PARA CONTROLAR A TELA DE REBANHO
  const handleAbrirRebanho = () => {
    console.log('🔵 Abrindo tela de Rebanho...');
    setShowRebanho(true);
  };

  const handleVoltarDoRebanho = () => {
    console.log('🔵 Voltando do Rebanho...');
    setShowRebanho(false);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Fecha telas modais ao mudar de tab
    if (showCadFazenda || showEdicaoPerfil || showFazendaDetalhes || showRebanho) {
      setShowCadFazenda(false);
      setShowEdicaoPerfil(false);
      setShowFazendaDetalhes(false);
      setShowRebanho(false); // ✅ ADICIONE showRebanho AQUI
    }
  };

  return (
    <>
      {currentScreen === 'splash' && (
        <SplashScreen onFinish={handleSplashFinish} />
      )}
      
      {currentScreen === 'auth' && (
        <AuthOptions 
          onLogin={handleLogin} 
          onRegister={handleRegister}
        />
      )}
      
      {currentScreen === 'login' && (
        <LoginScreen 
          onBack={handleBackToAuth} 
          onLogin={handleLoginSuccess}
        />
      )}
      
      {currentScreen === 'cadastro' && (
        <CadastroScreen 
          onBack={handleBackToAuth} 
          onRegister={handleRegisterSuccess}
        />
      )}
      
      {/* ✅ TELAS COM NAVBAR (após login) */}
      {(currentScreen === 'home') && (
        <>
          {/* ✅ Telas modais/overlay */}
          {showCadFazenda && (
            <CadFazendaScreen 
              onBack={handleVoltarHome}
              onSave={handleSalvarFazenda}
            />
          )}
          
          {showEdicaoPerfil && (
            <EdicaoScreen 
              onBack={handleVoltarPerfil}
              onSave={handleSalvarPerfil}
            />
          )}
          
          {showFazendaDetalhes && (
            <FazendaScreen 
              onBack={handleVoltarParaHome}
              onAbrirRebanho={handleAbrirRebanho} // ✅ PASSE A PROP AQUI
            />
          )}
          
          {/* ✅ ADICIONE A TELA DE REBANHO AQUI */}
          {showRebanho && (
            <RebanhoScreen 
              onBack={handleVoltarDoRebanho}
            />
          )}
          
          {/* ✅ Telas principais da navbar */}
          {!showCadFazenda && !showEdicaoPerfil && !showFazendaDetalhes && !showRebanho && (
            <>
              {activeTab === 'home' && (
                <HomeScreen 
                  onLogout={handleLogout}
                  onCadastrarFazenda={handleCadastrarFazenda}
                  onAbrirFazenda={handleAbrirFazenda}
                />
              )}
              {activeTab === 'tutoriais' && <TutoriaisScreen />}
              {activeTab === 'perfil' && (
                <PerfilScreen 
                  onLogout={handleLogout}
                  onEditarPerfil={handleEditarPerfil}
                />
              )}
              {activeTab === 'notificacoes' && <NotifScreen />}
            </>
          )}
          
          {/* ✅ NAVBAR SEMPRE VISÍVEL */}
          <Navbar 
            activeTab={activeTab} 
            onTabChange={handleTabChange}
          />
        </>
      )}
    </>
  );
}

export default App;