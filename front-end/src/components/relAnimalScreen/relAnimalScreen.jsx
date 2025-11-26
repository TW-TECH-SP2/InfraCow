import "./relAnimalScreen.css";
import exit from "../../assets/icons/exit.svg";
import share from "../../assets/icons/share.svg";
import downloadrel from "../../assets/icons/download-rel.svg";
import axios from "axios";
import { useRef } from "react";

function RelAnimalScreen({ onVoltarAnimal }) {
  const relatorioRef = useRef(null);

  const handleShare = async () => {
    const shareData = {
      title: "Relatório do Bovino: Mimosa",
      text: "Confira o relatório completo do bovino Mimosa na Fazenda Recanto.",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        console.log("Relatório compartilhado com sucesso!");
      } catch (error) {
        console.error("Erro ao compartilhar:", error);
      }
    } else {
      alert("O compartilhamento não é suportado neste dispositivo.");
    }
  };

  const handleDownload = async () => {
    if (!relatorioRef.current) return;

    const titulo =
      relatorioRef.current.querySelector("h1")?.innerText || "Relatório";
    const paragrafoElements = relatorioRef.current.querySelectorAll("p");
    const conteudo = Array.from(paragrafoElements).map((p) => p.innerText);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/pdf/gerar`,
        { titulo, conteudo },
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.download = "relatorio-mimosa.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Erro ao baixar PDF:", error);
      alert(
        "Não foi possível baixar o PDF. Verifique se o backend está rodando."
      );
    }
  };

  return (
    <div className="relanimal-container">
      <div className="acoes-visu">
        <img src={exit} alt="Voltar" onClick={onVoltarAnimal} />
        <img src={share} alt="Compartilhar" onClick={handleShare} />
      </div>
      <div className="corpo-pdf">
        <div className="relatorio-conteudo" ref={relatorioRef}>
          <h1>Relatório do Bovino: Mimosa</h1>
          <p>
  A temperatura corporal do animal registrada foi de 38.5°C, o que está dentro da faixa normal para bovinos. 
  O monitoramento contínuo indica que o animal está se adaptando bem às condições climáticas atuais.
</p>

<p>
  Durante a tarde, observou-se um leve aumento para 39.2°C, possivelmente devido à exposição solar. 
  É importante assegurar sombra e água disponível para evitar estresse térmico.
</p>

<p>
  Com a chegada da noite, a temperatura corporal estabilizou em 38.7°C. 
  O animal demonstra comportamento normal, alimentando-se e ruminando adequadamente.
</p>

<p>
  O sistema de monitoramento alerta para a importância de verificar a hidratação, 
  especialmente em dias quentes. A temperatura do ambiente chegou a 35°C no pico do dia.
</p>

<p>
  Histórico de temperatura do animal nos últimos 7 dias mostra estabilidade, 
  com variações entre 38.5°C e 39.5°C, dentro do esperado para a raça e idade.
</p>

<p>
  Recomenda-se continuar o monitoramento diário e observar quaisquer mudanças comportamentais 
  que possam indicar desconforto térmico ou problemas de saúde.
</p>
        </div>

        <button className="botao-download-fixo" onClick={handleDownload}>
          <img src={downloadrel} alt="Download" />
          Baixar arquivo
        </button>
      </div>
    </div>
  );
}

export default RelAnimalScreen;
