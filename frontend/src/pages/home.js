import Head from "next/head";
import Container from "@/components/Container";
import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import HomeContent from "@/components/HomeContent";

export default function Homepage() {
  return (
    <>
      <Head>
        <title>InfraCow</title>
        <meta
          name="description"
          content="API para cadastro de bovinos e temperaturas"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Menu />
        <Container>
          <HomeContent />
        </Container>
      </main>
      <Footer />
    </>
  );
}
