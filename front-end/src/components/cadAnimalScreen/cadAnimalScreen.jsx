import "./cadAnimalScreen.css";
import logoMarrom from "../../assets/logo-marrom-sem-slogan.png";
import cameraIcon from "../../assets/icons/camera.svg";
import exit from "../../assets/icons/exit.svg";
import { useState, useEffect } from "react";

function CadAnimalScreen({ onBack }) {
  const [fazendas, setFazendas] = useState([]);
  const [formData, setFormData] = useState({
    nome_animal: "",
    codigo: "",
    genero: "",
    tipo: "",
    raca: "",
    peso: "",
    idade: "",
    fazenda_id: "",
    imagem: null,
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchFazendas = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Usuário não autenticado");
          return;
        }

        const response = await fetch(`${import.meta.env.VITE_API_URL}/fazendas`, {
          method: "GET",
          headers: {
            autorizacao: `Bearer ${token}`,
          },
        });

        if(!response.ok) {
          console.log("Erro ao buscar fazendas");
          return;
        }
        const data = await response.json();
        setFazendas(Array.isArray(data) ? data : data.fazendas || []);
      } catch(error) {
        console.log("Erro ao buscar fazendas: ", error)
      }
    };
    fetchFazendas();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, imagem: file }));
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form data enviada: ", formData)
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Usuário não autenticado");
        return;
      }

      const formDataToSend = new FormData();
      // Campos básicos
      formDataToSend.append("nome_animal", formData.nome_animal);
      formDataToSend.append("genero", formData.genero);
      formDataToSend.append("tipo", formData.tipo);
      formDataToSend.append("raca", formData.raca);
      formDataToSend.append("peso", formData.peso);
      formDataToSend.append("idade", formData.idade);
      formDataToSend.append("fazenda_id", Number(formData.fazenda_id));
      if (formData.imagem) formDataToSend.append("imagem", formData.imagem);

      // Código: se tiver letras, envia como codigo_rfid e força codigo=0 (compatível com backend antigo)
      const codigoValor = String(formData.codigo || "").trim();
      const temLetra = /\D/.test(codigoValor);
      if (temLetra) {
        formDataToSend.append("codigo_rfid", codigoValor);
        formDataToSend.append("codigo", 0);
      } else {
        formDataToSend.append("codigo", codigoValor || 0);
      }

        console.log("Fazenda selecionada: ", formData.fazenda_id);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/animais`, {
        method: "POST",
        headers: {
          autorizacao: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        const error = await response.json();
        console.log("Erro ao cadastrar animal", error);
        alert("Falha ao cadastrar o animal");
        return;
      }

      alert("Animal cadastrado com sucesso!");

      setFormData({
        nome_animal: "",
        codigo: "",
        genero: "",
        tipo: "",
        raca: "",
        peso: "",
        idade: "",
        fazenda_id: "",
        imagem: null,
      });
      setPreview(null);
    } catch (error) {
      console.log("Erro na requisição: ", error);
      alert("Erro ao cadastrar animal");
    }
  };

  return (
    <div className="cad-fazenda-container">
      <div className="header-cad-fazenda">
        <img src={exit} alt="Voltar" onClick={onBack} className="exit-icon" />
        <img src={logoMarrom} alt="Logo" className="logo-cad" />
      </div>

      <form onSubmit={handleSubmit} className="formcad">
        <div className="title-formcad">
          <h2>Cadastro de Animal</h2>
        </div>

        <div className="input-groupcad">
          <label htmlFor="nome_animal">Nome do animal</label>
          <input
            id="nome_animal"
            type="text"
            name="nome_animal"
            value={formData.nome_animal}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-groupcad">
          <label htmlFor="codigo">Código (RFID ou numérico)</label>
          <input
            id="codigo"
            type="text"
            name="codigo"
            placeholder="Ex.: F3E196C5 ou 12345"
            value={formData.codigo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-groupcad">
          <label htmlFor="genero">Gênero</label>
          <select
            id="genero"
            name="genero"
            value={formData.genero}
            onChange={handleChange}
            required
          >
            <option value="">Selecione o gênero</option>
            <option value="F">Fêmea</option>
            <option value="M">Macho</option>
          </select>
        </div>

        <div className="input-groupcad">
          <label htmlFor="tipo">Tipo</label>
          <select
            id="tipo"
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            required
          >
            <option value="">Selecione o tipo</option>
            <option value="leiteiro">Leiteiro</option>
            <option value="corte">De corte</option>
            <option value="reprodutor">Reprodutor</option>
          </select>
        </div>

        <div className="input-groupcad">
          <label htmlFor="raca">Raça</label>
          <input
            id="raca"
            type="text"
            name="raca"
            value={formData.raca}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-groupcad-row">
          <div className="input-groupcad">
            <label htmlFor="peso">Peso</label>
            <input
              id="peso"
              type="text"
              name="peso"
              placeholder="Ex.: 600"
              value={formData.peso}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-groupcad">
            <label htmlFor="idade">Idade (em anos)</label>
            <input
              id="idade"
              type="number"
              name="idade"
              placeholder="Ex.: 2"
              value={formData.idade}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="input-groupcad">
          <label htmlFor="fazenda_id">Fazenda</label>
          <select
            id="fazenda_id"
            name="fazenda_id"
            value={formData.fazenda_id}
            onChange={handleChange}
            required
          >
            <option value="">Selecione a fazenda</option>
            {Array.isArray(fazendas) && fazendas.map((fazenda) => (
              <option key={fazenda.id} value={fazenda.id}>
                {fazenda.nome_fazenda}
              </option>
            ))}
          </select>
        </div>

        <div className="input-cadimg">
          <label htmlFor="imagem_animal" className="esquerda-img-cad">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "8px", }}
              />
            ) : (
              <img src={cameraIcon} alt="Adicionar foto" />
            )}
            <input id="imagem_animal" type="file" name="imagem" onChange={handleFileChange} />
          </label>
          <div className="direita">
            <p>Adicione uma foto de seu animal clicando na câmera.</p>
          </div>
        </div>

        <div className="btn-cadfazenda">
          <button type="submit">Cadastrar</button>
        </div>
      </form>
    </div>
  );
}

export default CadAnimalScreen;
