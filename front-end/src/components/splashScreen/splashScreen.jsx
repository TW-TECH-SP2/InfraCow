import { useEffect } from 'react';
import './splashScreen.css';
import logoBranca from '../../assets/logo-branca.png'; // Ajuste o caminho se necessário

function SplashScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 300); // 300ms

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="splash-screen">
      <img src={logoBranca} alt="InfraCow Logo" className="logo" />
    </div>
  );
}

export default SplashScreen;
