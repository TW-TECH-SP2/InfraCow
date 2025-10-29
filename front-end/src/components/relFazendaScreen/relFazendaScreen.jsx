import "./relFazendaScreen.css";
import exit from "../../assets/icons/exit.svg";
import share from "../../assets/icons/share.svg";
import downloadrel from "../../assets/icons/download-rel.svg";
import axios from "axios";
import { useRef } from "react";

function RelFazendaScreen({ onBack, onVoltarFazenda, fazenda }) {
  const relatorioRef = useRef(null);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Relatório da Fazenda",
          text: "Veja o relatório da Fazenda",
          url: window.location.href,
        })
        .then(() => console.log("Compartilhado com sucesso!"))
        .catch((error) => console.log("Erro ao compartilhar", error));
    } else {
      alert("Compartilhamento não suportado nesse navegador");
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
        "http://localhost:4000/pdf/gerar",
        { titulo, conteudo },
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.download = "relatorio-fazenda.pdf";
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
    <div className="relfazenda-container">
      <div className="acoes-visu">
        <img src={exit} alt="Voltar" onClick={onVoltarFazenda} />
        <img src={share} alt="Compartilhar" onClick={handleShare} />
      </div>
      <div className="corpo-pdf">
        <div className="relatorio-conteudo" ref={relatorioRef}>
          <h1>Relatório da fazenda: {fazenda?.nome || "Recanto"}</h1>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>

          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>

          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
            voluptate asperiores necessitatibus blanditiis consequuntur quaerat
            nulla repudiandae voluptas veritatis facilis voluptatum, molestiae
            ipsum deserunt nihil ut quo! Optio, sunt rerum?
          </p>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Consequuntur voluptatem quibusdam odit at error eligendi unde quia
            iure rerum provident enim asperiores reiciendis repellat, doloribus
            praesentium, quaerat, totam autem earum!
          </p>

          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate
            sint laboriosam illum hic ut deleniti quae consequuntur, ullam
            cumque distinctio repellendus unde ipsam in assumenda dolores odio
            dolore illo corporis?
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

export default RelFazendaScreen;
