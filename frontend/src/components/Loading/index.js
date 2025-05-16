import styles from "@/components/Loading/Loading.module.css";

const Loading = ({loading}) => {
  return (
    <>
      <div className={loading ? styles.loading : styles.done}>
        {/* Substituir por uma imagem de carregamento sobre bovinos */}
        <img src="../../images/loading.gif" alt="Carregando" />
        <p>Carregando...</p>
      </div>
    </>
  );
};

export default Loading;
