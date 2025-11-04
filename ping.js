const URL = "https:.com";

const INTERVALO = 5 * 60 * 1000; 

console.log(`Mantendo ${URL} acordado a cada ${INTERVALO / 1000 / 60} minutos...`);

async function ping() {
  const timestamp = new Date().toISOString();
  try {
    const response = await fetch(URL);
    console.log(`[${timestamp}] Status: ${response.status}`);
  } catch (err) {
    console.error(`[${timestamp}] Erro: ${err.message}`);
  }
}

ping();
setInterval(ping, INTERVALO);