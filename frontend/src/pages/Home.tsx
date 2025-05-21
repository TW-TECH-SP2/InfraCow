import React from 'react';
import Layout from '../components/Layout';
import thermalImage from '../assets/thermal-image.jpg';

const Home: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-white text-4xl font-bold mb-8">Home</h1>
        
        <h2 className="text-white text-3xl font-bold mb-6">
          A Doença Respiratória Bovina (DRB)
        </h2>
        
        <p className="text-gray-300 mb-4 text-lg leading-relaxed">
          A Doença Respiratória Bovina (DRB) é uma condição grave que afeta o sistema respiratório
          dos bovinos, especialmente em bezerros, podendo evoluir para <strong className="text-white">bronquite, pneumonia</strong> e até 
          <strong className="text-white"> óbito</strong> se não tratada. A DRB é causada por uma <strong className="text-white">combinação de vírus</strong> (como <strong className="text-white">IBR, BVD</strong> e <strong className="text-white">BRSV</strong>) e 
          bactérias, agravada por fatores ambientais como <strong className="text-white">superlotação</strong> e <strong className="text-white">ventilação inadequada</strong>.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div>
            <h2 className="text-white text-3xl font-bold mb-6">
              Diagnóstico e Inovação
            </h2>
            
            <p className="text-gray-300 mb-2 text-lg leading-relaxed">
              Métodos tradicionais de diagnóstico, como <strong className="text-white">exames laboratoriais</strong> e 
              <strong className="text-white"> avaliação visual</strong>, dependem de estágios avançados da doença. Nosso 
              projeto inova com o uso de <strong className="text-white">análise termográfica</strong> e <strong className="text-white">inteligência artificial</strong>, 
              proporcionando um <strong className="text-white">diagnóstico precoce</strong> e <strong className="text-white">não invasivo</strong>.
            </p>
          </div>
          
          <div className="flex justify-center items-center">
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;