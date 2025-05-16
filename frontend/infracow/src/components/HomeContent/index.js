import { useState, useEffect } from "react";
import axios from "axios";
import styles from "@/components/HomeContent/HomeContent.module.css";
import Loading from "../Loading";
import EditContent from "../EditContent";

const HomeContent = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGame, setSelectedGame] = useState(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get("http://localhost:4000/games");
        setGames(response.data.games);
        // console.log(response.data.games);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, []);

  // Função para DELETAR um jogo
  const deleteGame = async (gameId) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/games/${gameId}`
      );
      if (response.status === 204) {
        alert("O jogo foi excluído com sucesso.");
        setGames(games.filter((game) => game._id !== gameId));
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Função para ABRIR O MODAL de edição com os dados do jogo
  const openEditModal = (game) => {
    setSelectedGame(game);
  };

  // Função para FECHAR O MODAL de edição
  const closeEditModal = () => {
    setSelectedGame(null);
  };

  // Função para atualizar o jogo editado na lista
  const handleUpdate = (updatedGame) => {
    setGames(
      games.map((game) => (game._id === updatedGame._id ? updatedGame : game))
    );
    closeEditModal();
  };

  return (
    <>
      <div className={styles.homeContent}>
        {/* CARD LISTA DE JOGOS */}
        <div className={styles.listGamesCard}>
          {/* TITLE */}
          <div className={styles.title}>
            <h2>Lista de jogos</h2>
          </div>
          <Loading loading={loading} />
          <div className={styles.games} id={styles.games}>
            {/* Lista de jogos irá aqui */}
            {games.map((game) => (
              <ul key={game._id} className={styles.listGames}>
                <div className={styles.gameImg}>
                  <img src="images/game_cd_cover.png" alt="Jogo em estoque" />
                </div>
                <div className={styles.gameInfo}>
                  <h3>{game.title}</h3>
                  <li>Plataforma: {game.descriptions.platform}</li>
                  <li>Gênero: {game.descriptions.genre}</li>
                  <li>Classificação: {game.descriptions.rating}</li>
                  <li>Ano: {game.year}</li>
                  <li>
                    Preço:
                    {game.price.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </li>
                  {/* Botão de deletar */}
                  <button
                    className={styles.btnDel}
                    onClick={() => {
                      const confirmed = window.confirm(
                        "Deseja mesmo excluir o jogo?"
                      );
                      if (confirmed) {
                        deleteGame(game._id);
                      }
                    }}
                  >
                    Deletar
                  </button>

                  {/* Botão de editar */}
                  <button
                    className={styles.btnEdit}
                    onClick={() => openEditModal(game)}
                  >
                    Editar
                  </button>
                </div>
              </ul>
            ))}
          </div>
        </div>
        {/* Renderização condicional */}
        {selectedGame && (
          <EditContent game={selectedGame} onClose={closeEditModal} 
          handleUpdate={handleUpdate}/>
        )}
      </div>
    </>
  );
};

export default HomeContent;
