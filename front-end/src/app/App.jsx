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
import RelFazendaScreen from '../components/relFazendaScreen/relFazendaScreen';
import RelAnimalScreen from '../components/relAnimalScreen/relAnimalScreen';
import AnimalScreen from '../components/animalScreen/animalScreen';
import Navbar from '../components/navbar/navbar';

function App() {
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem("token"));
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [activeTab, setActiveTab] = useState('home');
  const [showCadFazenda, setShowCadFazenda] = useState(false);
  const [showEdicaoPerfil, setShowEdicaoPerfil] = useState(false);
  const [showFazendaDetalhes, setShowFazendaDetalhes] = useState(false);
  const [showRebanho, setShowRebanho] = useState(false);
  const [showEditFazenda, setShowEditFazenda] = useState(false);
  const [showEditAnimal, setShowEditAnimal] = useState(false);
  const [showCadAnimal, setShowCadAnimal] = useState(false);
  const [showAnimal, setShowAnimal] = useState(false);
  const [showRelFazenda, setShowRelFazenda] = useState(false);
  const [showRelAnimal, setShowRelAnimal] = useState(false); // ✅ NOVO ESTADO
  const [fazendaIdSelecionada, setFazendaIdSelecionada] = useState(null)
  const [animalIdSelecionado, setAnimalIdSelecionado] = useState(null);

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
    setIsLogged(true);
    setCurrentScreen('home');
    setActiveTab('home');
  };

  const handleRegisterSuccess = () => {
    setCurrentScreen('home');
    setActiveTab('home');
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLogged(false);
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

  const handleAbrirFazenda = (id) => {
    setFazendaIdSelecionada(id);
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

  // ✅ FUNÇÕES PARA REL FAZENDA
  const handleAbrirRelFazenda = () => {
    console.log('📊 Abrindo relatórios da fazenda...');
    setShowRelFazenda(true);
  };

  const handleVoltarDoRelFazenda = () => {
    console.log('📊 Voltando dos relatórios...');
    setShowRelFazenda(false);
  };

  // ✅ NOVAS FUNÇÕES PARA REL ANIMAL
  const handleAbrirRelAnimal = () => {
    console.log('🐄📊 Abrindo relatórios do animal...');
    setShowRelAnimal(true);
  };

  const handleVoltarDoRelAnimal = () => {
    console.log('🐄📊 Voltando dos relatórios do animal...');
    setShowRelAnimal(false);
  };

  // ✅ FUNÇÕES PARA EDIT FAZENDA
  const handleEditarFazenda = (id) => {
    setFazendaIdSelecionada(id);
    setShowEditFazenda(true);
  };

  const handleVoltarDaEdicaoFazenda = () => {
    console.log('🏠 Voltando da edição da fazenda...');
    setShowEditFazenda(false);
    setShowFazendaDetalhes(true);
  };

  const handleSalvarEdicaoFazenda = () => {
    console.log('💾 Salvando edição da fazenda...');
    setShowEditFazenda(false);
    setShowFazendaDetalhes(true);
  };

  // ✅ FUNÇÕES PARA EDIT ANIMAL
  const handleEditarAnimal = (id) => {
    setAnimalIdSelecionado(id)
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

  // ✅ FUNÇÕES PARA ANIMAL SCREEN
  const handleAbrirAnimal = (id) => {
    console.log('🐄 Abrindo tela do animal...');
    setAnimalIdSelecionado(id);
    setShowAnimal(true);
  };

  const handleVoltarDoAnimal = () => {
    console.log('🐄 Voltando da tela do animal...');
    setShowAnimal(false);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Fecha telas modais ao mudar de tab
    if (showCadFazenda || showEdicaoPerfil || showFazendaDetalhes || showRebanho || showEditFazenda || showEditAnimal || showCadAnimal || showAnimal || showRelFazenda || showRelAnimal) {
      setShowCadFazenda(false);
      setShowEdicaoPerfil(false);
      setShowFazendaDetalhes(false);
      setShowRebanho(false);
      setShowEditFazenda(false);
      setShowEditAnimal(false);
      setShowCadAnimal(false);
      setShowAnimal(false);
      setShowRelFazenda(false);
      setShowRelAnimal(false); // ✅ ADICIONE AQUI
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
          {/* ✅ 1. TELA DE REL ANIMAL (SEM NAVBAR) - MAIS ALTA PRIORIDADE */}
          {showRelAnimal && (
            <RelAnimalScreen 
              onBack={handleVoltarDoRelAnimal}
              onVoltarAnimal={handleVoltarDoRelAnimal}
            />
          )}
          
          {/* ✅ 2. TELA DE REL FAZENDA (SEM NAVBAR) */}
          {!showRelAnimal && showRelFazenda && (
            <RelFazendaScreen 
              onBack={handleVoltarDoRelFazenda}
              onVoltarFazenda={handleVoltarDoRelFazenda}
            />
          )}
          
          {/* ✅ 3. TELA DE ANIMAL (COM NAVBAR) - apenas se RelAnimal e RelFazenda NÃO estiverem ativas */}
          {!showRelAnimal && !showRelFazenda && showAnimal && (
            <>
              <AnimalScreen 
                animalId={animalIdSelecionado}
                onBack={handleVoltarDoAnimal}
                onAbrirRelAnimal={handleAbrirRelAnimal} // ✅ PASSE A PROP AQUI
              />
              <Navbar 
                activeTab={activeTab} 
                onTabChange={handleTabChange}
              />
            </>
          )}
          
          {/* ✅ 4. TELA DE CAD ANIMAL (COM NAVBAR) */}
          {!showRelAnimal && !showRelFazenda && !showAnimal && showCadAnimal && (
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
          
          {/* ✅ 5. TELA DE EDIT ANIMAL (COM NAVBAR) */}
          {!showRelAnimal && !showRelFazenda && !showAnimal && !showCadAnimal && showEditAnimal && (
            <>
              <EditAnimalScreen id ={animalIdSelecionado}
                onBack={handleVoltarDaEdicaoAnimal}
                onSave={handleSalvarEdicaoAnimal}
              />
              <Navbar 
                activeTab={activeTab} 
                onTabChange={handleTabChange}
              />
            </>
          )}
          
          {/* ✅ 6. TELA DE REBANHO (COM NAVBAR) */}
          {!showRelAnimal && !showRelFazenda && !showAnimal && !showCadAnimal && !showEditAnimal && showRebanho && (
            <>
              <RebanhoScreen 
                onBack={handleVoltarDoRebanho}
                onEditarAnimal={handleEditarAnimal}
                onCadastrarAnimal={handleCadastrarAnimal}
                onAbrirAnimal={handleAbrirAnimal}
              />
              <Navbar 
                activeTab={activeTab} 
                onTabChange={handleTabChange}
              />
            </>
          )}
          
          {/* ✅ 7. TELA DE EDIT FAZENDA (COM NAVBAR) */}
          {!showRelAnimal && !showRelFazenda && !showAnimal && !showCadAnimal && !showEditAnimal && !showRebanho && showEditFazenda && (
            <>
              <EditFazendaScreen id ={fazendaIdSelecionada} onBack={handleVoltarDaEdicaoFazenda} onSave={handleSalvarEdicaoFazenda}
              />
              <Navbar 
                activeTab={activeTab} 
                onTabChange={handleTabChange}
              />
            </>
          )}
          
          {/* ✅ 8. TELA DE FAZENDA (COM NAVBAR) */}
          {!showRelAnimal && !showRelFazenda && !showAnimal && !showCadAnimal && !showEditAnimal && !showRebanho && !showEditFazenda && showFazendaDetalhes && (
            <>
              <FazendaScreen 
                fazendaId={fazendaIdSelecionada}
                onBack={handleVoltarParaHome}
                onAbrirRebanho={handleAbrirRebanho}
                onEditarFazenda={handleEditarFazenda}
                onAbrirRelFazenda={handleAbrirRelFazenda}
              />
              <Navbar 
                activeTab={activeTab} 
                onTabChange={handleTabChange}
              />
            </>
          )}
          
          {/* ✅ 9. OUTROS MODAIS (COM NAVBAR) */}
          {!showRelAnimal && !showRelFazenda && !showAnimal && !showCadAnimal && !showEditAnimal && !showRebanho && !showEditFazenda && !showFazendaDetalhes && showCadFazenda && (
            <>
              <CadFazendaScreen 
                onBack={handleVoltarHome}
                onSave={handleSalvarFazenda}
              />
              <Navbar 
                activeTab={activeTab} 
                onTabChange={handleTabChange}
              />
            </>
          )}
          
          {!showRelAnimal && !showRelFazenda && !showAnimal && !showCadAnimal && !showEditAnimal && !showRebanho && !showEditFazenda && !showFazendaDetalhes && showEdicaoPerfil && (
            <>
              <EdicaoScreen 
                onBack={handleVoltarPerfil}
                onSave={handleSalvarPerfil}
              />
              <Navbar 
                activeTab={activeTab} 
                onTabChange={handleTabChange}
              />
            </>
          )}
          
          {/* ✅ 10. TELAS PRINCIPAIS DA NAVBAR (apenas se NÃO estiver em outras telas) */}
          {!showRelAnimal && !showRelFazenda && !showAnimal && !showCadAnimal && !showEditAnimal && !showRebanho && !showEditFazenda && !showFazendaDetalhes && !showCadFazenda && !showEdicaoPerfil && (
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
        </>
      )}
    </>
  );
}

export default App;