import { useState } from 'react';
import SplashScreen from '../components/splashScreen/splashScreen';
import AuthOptions from '../components/authOptions/authOptions';
import LoginScreen from '../components/loginScreen/loginScreen'; 
import CadastroScreen from '../components/cadastroScreen/cadastroScreen';
import HomeScreen from '../components/homeScreen/homeScreen'; 
import TutoriaisScreen from '../components/tutoriaisScreen/tutoriaisScreen';
import CadFazendaScreen from '../components/cadFazendaScreen/CadFazendaScreen'; // ✅ Importe
import Navbar from '../components/navbar/navbar';

function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [activeTab, setActiveTab] = useState('home');
  const [showCadFazenda, setShowCadFazenda] = useState(false); // ✅ Estado para cadastro de fazenda

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
  };

  const handleRegisterSuccess = () => {
    setCurrentScreen('home');
  };

  const handleLogout = () => {
    setCurrentScreen('auth');
  };

  // ✅ Funções para cadastro de fazenda
  const handleCadastrarFazenda = () => {
    setShowCadFazenda(true);
  };

  const handleVoltarHome = () => {
    setShowCadFazenda(false);
  };

  const handleSalvarFazenda = () => {
    console.log('Fazenda salva!');
    setShowCadFazenda(false);
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
          {/* ✅ Mostra cadastro de fazenda ou conteúdo normal */}
          {showCadFazenda ? (
            <CadFazendaScreen 
              onBack={handleVoltarHome}
              onSave={handleSalvarFazenda}
            />
          ) : (
            <>
              {/* Conteúdo baseado na tab ativa */}
              {activeTab === 'home' && (
                <HomeScreen 
                  onLogout={handleLogout}
                  onCadastrarFazenda={handleCadastrarFazenda} // ✅ Passa a função
                />
              )}
              {activeTab === 'tutoriais' && <TutoriaisScreen />}
              {activeTab === 'perfil' && <div>Tela de Perfil</div>}
              {activeTab === 'notificacoes' && <div>Tela de Notificações</div>}
            </>
          )}
          
          {/* ✅ NAVBAR (não mostra durante cadastro de fazenda) */}
          {!showCadFazenda && (
            <Navbar 
              activeTab={activeTab} 
              onTabChange={setActiveTab}
            />
          )}
        </>
      )}
    </>
  );
}

export default App;