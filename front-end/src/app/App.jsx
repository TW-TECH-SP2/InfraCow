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
import EditFazendaScreen from '../components/editFazendaScreen/editFazendaScreen';
import EditAnimalScreen from '../components/editAnimalScreen/editAnimalScreen';
import CadAnimalScreen from '../components/cadAnimalScreen/cadAnimalScreen';
import AnimalScreen from '../components/animalScreen/animalScreen';
import Navbar from '../components/navbar/navbar';

function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [activeTab, setActiveTab] = useState('home');
  const [showCadFazenda, setShowCadFazenda] = useState(false);
  const [showEdicaoPerfil, setShowEdicaoPerfil] = useState(false);
  const [showFazendaDetalhes, setShowFazendaDetalhes] = useState(false);
  const [showRebanho, setShowRebanho] = useState(false);
  const [showEditFazenda, setShowEditFazenda] = useState(false);
  const [showEditAnimal, setShowEditAnimal] = useState(false);
  const [showCadAnimal, setShowCadAnimal] = useState(false);
  const [showAnimal, setShowAnimal] = useState(false); // ✅ NOVO ESTADO

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

  const handleAbrirFazenda = () => {
    setShowFazendaDetalhes(true);
  };

  const handleVoltarParaHome = () => {
    setShowFazendaDetalhes(false);
  };

  const handleAbrirRebanho = () => {
    console.log('🔵 Abrindo tela de Rebanho...');
    setShowRebanho(true);
  };

  const handleVoltarDoRebanho = () => {
    console.log('🔵 Voltando do Rebanho...');
    setShowRebanho(false);
  };

  // ✅ FUNÇÕES PARA EDIT FAZENDA
  const handleEditarFazenda = () => {
    console.log('🏠 Editando fazenda...');
    setShowEditFazenda(true);
  };

  const handleVoltarDaEdicaoFazenda = () => {
    console.log('🏠 Voltando da edição da fazenda...');
    setShowEditFazenda(false);
  };

  const handleSalvarEdicaoFazenda = () => {
    console.log('💾 Salvando edição da fazenda...');
    setShowEditFazenda(false);
  };

  // ✅ FUNÇÕES PARA EDIT ANIMAL
  const handleEditarAnimal = () => {
    console.log('🐄 Editando animal...');
    setShowEditAnimal(true);
  };

  const handleVoltarDaEdicaoAnimal = () => {
    console.log('🐄 Voltando da edição do animal...');
    setShowEditAnimal(false);
  };

  const handleSalvarEdicaoAnimal = () => {
    console.log('💾 Salvando edição do animal...');
    setShowEditAnimal(false);
  };

  // ✅ FUNÇÕES PARA CAD ANIMAL
  const handleCadastrarAnimal = () => {
    console.log('🐄➕ Cadastrando animal...');
    setShowCadAnimal(true);
  };

  const handleVoltarDoCadAnimal = () => {
    console.log('🐄 Voltando do cadastro de animal...');
    setShowCadAnimal(false);
  };

  const handleSalvarCadAnimal = () => {
    console.log('💾 Salvando cadastro do animal...');
    setShowCadAnimal(false);
  };

  // ✅ NOVAS FUNÇÕES PARA ANIMAL SCREEN
  const handleAbrirAnimal = () => {
    console.log('🐄 Abrindo tela do animal...');
    setShowAnimal(true);
  };

  const handleVoltarDoAnimal = () => {
    console.log('🐄 Voltando da tela do animal...');
    setShowAnimal(false);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Fecha telas modais ao mudar de tab
    if (showCadFazenda || showEdicaoPerfil || showFazendaDetalhes || showRebanho || showEditFazenda || showEditAnimal || showCadAnimal || showAnimal) {
      setShowCadFazenda(false);
      setShowEdicaoPerfil(false);
      setShowFazendaDetalhes(false);
      setShowRebanho(false);
      setShowEditFazenda(false);
      setShowEditAnimal(false);
      setShowCadAnimal(false);
      setShowAnimal(false); // ✅ ADICIONE AQUI
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
          {/* ✅ 1. TELA DE ANIMAL (COM NAVBAR) */}
          {showAnimal && (
            <>
              <AnimalScreen 
                onBack={handleVoltarDoAnimal}
              />
              <Navbar 
                activeTab={activeTab} 
                onTabChange={handleTabChange}
              />
            </>
          )}
          
          {/* ✅ 2. TELA DE CAD ANIMAL (se Animal NÃO estiver ativo) */}
          {!showAnimal && showCadAnimal && (
            <>
              <CadAnimalScreen 
                onBack={handleVoltarDoCadAnimal}
                onSave={handleSalvarCadAnimal}
              />
              <Navbar 
                activeTab={activeTab} 
                onTabChange={handleTabChange}
              />
            </>
          )}
          
          {/* ✅ 3. TELA DE EDIT ANIMAL (se Animal e CadAnimal NÃO estiverem ativos) */}
          {!showAnimal && !showCadAnimal && showEditAnimal && (
            <>
              <EditAnimalScreen 
                onBack={handleVoltarDaEdicaoAnimal}
                onSave={handleSalvarEdicaoAnimal}
              />
              <Navbar 
                activeTab={activeTab} 
                onTabChange={handleTabChange}
              />
            </>
          )}
          
          {/* ✅ 4. TELA DE REBANHO (se outras telas NÃO estiverem ativas) */}
          {!showAnimal && !showCadAnimal && !showEditAnimal && showRebanho && (
            <>
              <RebanhoScreen 
                onBack={handleVoltarDoRebanho}
                onEditarAnimal={handleEditarAnimal}
                onCadastrarAnimal={handleCadastrarAnimal}
                onAbrirAnimal={handleAbrirAnimal} // ✅ PASSE A PROP AQUI
              />
              <Navbar 
                activeTab={activeTab} 
                onTabChange={handleTabChange}
              />
            </>
          )}
          
          {/* ✅ 5. TELA DE EDIT FAZENDA (se outras telas NÃO estiverem ativas) */}
          {!showAnimal && !showCadAnimal && !showEditAnimal && !showRebanho && showEditFazenda && (
            <>
              <EditFazendaScreen 
                onBack={handleVoltarDaEdicaoFazenda}
                onSave={handleSalvarEdicaoFazenda}
              />
              <Navbar 
                activeTab={activeTab} 
                onTabChange={handleTabChange}
              />
            </>
          )}
          
          {/* ✅ 6. TELA DE FAZENDA (se outras telas NÃO estiverem ativas) */}
          {!showAnimal && !showCadAnimal && !showEditAnimal && !showRebanho && !showEditFazenda && showFazendaDetalhes && (
            <>
              <FazendaScreen 
                onBack={handleVoltarParaHome}
                onAbrirRebanho={handleAbrirRebanho}
                onEditarFazenda={handleEditarFazenda}
              />
              <Navbar 
                activeTab={activeTab} 
                onTabChange={handleTabChange}
              />
            </>
          )}
          
          {/* ✅ 7. OUTROS MODAIS (se outras telas NÃO estiverem ativas) */}
          {!showAnimal && !showCadAnimal && !showEditAnimal && !showRebanho && !showEditFazenda && !showFazendaDetalhes && showCadFazenda && (
            <CadFazendaScreen 
              onBack={handleVoltarHome}
              onSave={handleSalvarFazenda}
            />
          )}
          
          {!showAnimal && !showCadAnimal && !showEditAnimal && !showRebanho && !showEditFazenda && !showFazendaDetalhes && showEdicaoPerfil && (
            <EdicaoScreen 
              onBack={handleVoltarPerfil}
              onSave={handleSalvarPerfil}
            />
          )}
          
          {/* ✅ 8. TELAS PRINCIPAIS DA NAVBAR (apenas se NÃO estiver em outras telas) */}
          {!showAnimal && !showCadAnimal && !showEditAnimal && !showRebanho && !showEditFazenda && !showFazendaDetalhes && !showCadFazenda && !showEdicaoPerfil && (
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
              
              <Navbar 
                activeTab={activeTab} 
                onTabChange={handleTabChange}
              />
            </>
          )}
          
          {/* ✅ 9. NAVBAR PARA MODAIS (se estiver em CadFazenda ou EdicaoPerfil) */}
          {!showAnimal && !showCadAnimal && !showEditAnimal && !showRebanho && !showEditFazenda && !showFazendaDetalhes && (showCadFazenda || showEdicaoPerfil) && (
            <Navbar 
              activeTab={activeTab} 
              onTabChange={handleTabChange}
            />
          )}
        </>
      )}
    </>
  );
}

export default App;