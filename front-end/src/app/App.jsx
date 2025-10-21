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
import Navbar from '../components/navbar/navbar';

function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [activeTab, setActiveTab] = useState('home');
  const [showCadFazenda, setShowCadFazenda] = useState(false);

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
    console.log('✅ Abrindo cadastro de fazenda...');
    setShowCadFazenda(true);
  };

  const handleVoltarHome = () => {
    setShowCadFazenda(false);
    setActiveTab('home');
  };

  const handleSalvarFazenda = () => {
    console.log('Fazenda salva!');
    setShowCadFazenda(false);
    setActiveTab('home');
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (showCadFazenda && tab !== 'home') {
      setShowCadFazenda(false);
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
          {/* ✅ Tela de cadastro de fazenda */}
          {showCadFazenda && (
            <CadFazendaScreen 
              onBack={handleVoltarHome}
              onSave={handleSalvarFazenda}
            />
          )}
          
          {/* ✅ Telas normais (só mostra se NÃO estiver no cadastro) */}
          {!showCadFazenda && (
            <>
              {activeTab === 'home' && (
                <HomeScreen 
                  onLogout={handleLogout}
                  onCadastrarFazenda={handleCadastrarFazenda}
                />
              )}
              {activeTab === 'tutoriais' && <TutoriaisScreen />}
              {activeTab === 'perfil' && <PerfilScreen onLogout={handleLogout} />}
              {activeTab === 'notificacoes' && <NotifScreen />} {/* ✅ AGORA USA NotifScreen */}
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