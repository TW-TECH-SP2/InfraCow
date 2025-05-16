import styles from "@/components/LoginContent/LoginContent.module.css";
import { useRouter } from "next/router";

const LoginContent = () => {
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    // Futuramente aqui irá a validação, autenticação, etc.
    router.push("/home");
  };

  return (
    <div className={styles.loginContent}>
      {/* LOGO */}
      <div className={styles.logo}>
        <img
          src="/images/thegames_logo.png"
          className={styles.logoImg}
          alt="The Games"
        />
      </div>
      {/* LOGIN CARD */}
      <div className={styles.loginCard}>
        {/* LOGIN CARD HEADER */}
        <div className={styles.loginCardHeader}>
          <h3>Faça seu login:</h3>
        </div>
        {/* LOGIN CARD BODY */}
        <div className={styles.loginCardBody}>
          <form className="formPrimary" onSubmit={handleLogin}>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Digite seu e-mail"
              className={`${styles.input} ${"inputPrimary"}`}
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Digite sua senha"
              className={`${styles.input} ${"inputPrimary"}`}
            />
            <button type="submit" className={`${styles.input} ${"btnPrimary"}`}>
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginContent;
