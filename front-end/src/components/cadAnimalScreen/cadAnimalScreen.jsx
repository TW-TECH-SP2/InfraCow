import "./cadAnimalScreen.css";
import logoMarrom from "../../assets/logo-marrom-sem-slogan.png";
import cameraIcon from "../../assets/icons/camera.svg";
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
      Object.keys(formData).forEach((key) => {
        if (key === "fazenda_id") {
        formDataToSend.append(key, Number(formData[key]));
        } else {
          formDataToSend.append(key, formData[key]);
        }});

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
        alert("Falha ao cadastrar o animal", error);
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
      <div className="logo-cad">
        <img src={logoMarrom} alt="Logo" />
      </div>

      <form onSubmit={handleSubmit} className="formcad">
        <div className="title-formcad">
          <h2>Cadastro de Animal</h2>
        </div>

        <div className="input-groupcad">
          <label htmlFor="nome">Nome do animal</label>
          <input
            type="text"
            name="nome_animal"
            value={formData.nome_animal}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-groupcad">
          <label htmlFor="codigo">Código</label>
          <input
            type="text"
            name="codigo"
            value={formData.codigo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-groupcad">
          <label htmlFor="genero">Gênero</label>
          <select
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
          <div className="esquerda-img-cad">
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "8px", }}
              />
            ) : (
              <img src={cameraIcon} alt="Adicionar foto" />
            )}
            <input type="file" name="imagem" onChange={handleFileChange} />
          </div>
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
