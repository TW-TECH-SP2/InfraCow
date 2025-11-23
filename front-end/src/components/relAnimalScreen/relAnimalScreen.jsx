import "./relAnimalScreen.css";
import exit from "../../assets/icons/exit.svg";
import share from "../../assets/icons/share.svg";
import downloadrel from "../../assets/icons/download-rel.svg";
import axios from "axios";
import { useRef } from "react";

function RelAnimalScreen({ onBack, onVoltarAnimal }) {
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
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates
            impedit voluptas, amet aliquid voluptatem ipsa. Animi nesciunt
            beatae, accusantium explicabo a totam consectetur omnis libero quos
            quis, corporis debitis sit.
          </p>

          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates
            impedit voluptas, amet aliquid voluptatem ipsa. Animi nesciunt
            beatae, accusantium explicabo a totam consectetur omnis libero quos
            quis, corporis debitis sit.
          </p>

          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates
            impedit voluptas, amet aliquid voluptatem ipsa. Animi nesciunt
            beatae, accusantium explicabo a totam consectetur omnis libero quos
            quis, corporis debitis sit.
          </p>

          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates
            impedit voluptas, amet aliquid voluptatem ipsa. Animi nesciunt
            beatae, accusantium explicabo a totam consectetur omnis libero quos
            quis, corporis debitis sit.
          </p>

          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates
            impedit voluptas, amet aliquid voluptatem ipsa. Animi nesciunt
            beatae, accusantium explicabo a totam consectetur omnis libero quos
            quis, corporis debitis sit.
          </p>

          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates
            impedit voluptas, amet aliquid voluptatem ipsa. Animi nesciunt
            beatae, accusantium explicabo a totam consectetur omnis libero quos
            quis, corporis debitis sit.
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
