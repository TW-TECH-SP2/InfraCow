import React, { useState } from 'react';
import Layout from '../components/Layout';

const casesData = [
  {
    id: '001',
    bovino: {
      rfid: '0xE200341201234567',
      nome: 'Cleide',
      peso: '600kg',
      dataNasc: '20/12/2018',
      type: 'Leiteira'
    },
    medicao: {
      temperatura: '39,6 °C',
      dataHora: '03/05/2025 09:32'
    },
    alerta: {
      notas: 'Temperatura acima do esperado (Positivo para DRB)'
    },
    recomendacoes: 'Animal apresentou temperatura de 39,6 °C, está confinado e demonstra letargia. Recomenda-se isolamento imediato e avaliação clínica veterinária para investigação de possível quadro de Doença Respiratória Bovina (DRB). Monitorar sinais respiratórios e repetir medição em 24 horas.'
  },
  {
    id: '002',
    bovino: {
      rfid: '0xE20034120123457',
      nome: 'Zezinho',
      peso: '550kg',
      dataNasc: '15/03/2017',
      type: 'Corte'
    },
    medicao: {
      temperatura: '39,1 °C',
      dataHora: '10/03/2025 14:21'
    },
    alerta: {
      notas: 'Temperatura acima do ideal'
    },
    recomendacoes: 'Avaliar sinais clínicos de febre e possível infecção. Acompanhar temperatura por 48 horas e manter animal sob observação.'
  },
  {
    id: '003',
    bovino: {
      rfid: '0xE20034120123458',
      nome: 'Estrela',
      peso: '610kg',
      dataNasc: '10/05/2016',
      type: 'Reprodução'
    },
    medicao: {
      temperatura: '38,4 °C',
      dataHora: '10/05/2025 07:45'
    },
    alerta: {
      notas: 'Temperatura dentro do esperado'
    },
    recomendacoes: 'Nenhuma ação necessária. Continuar acompanhamento rotineiro.'
  },
  {
    id: '004',
    bovino: {
      rfid: '0xE20034120123459',
      nome: 'Branquinha',
      peso: '580kg',
      dataNasc: '01/11/2015',
      type: 'Leiteira'
    },
    medicao: {
      temperatura: '37,9 °C',
      dataHora: '01/11/2025 06:18'
    },
    alerta: {
      notas: 'Temperatura dentro do esperado'
    },
    recomendacoes: 'Condições normais. Reavaliar em exames mensais.'
  }
];

const Cases: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>('001');

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-white text-4xl font-bold mb-8">Lista de Análises</h1>

        <div className="max-w-3xl mx-auto">
          {casesData.map((caseItem) => (
            <div key={caseItem.id} className="mb-6">
              <div className="relative p-0.5 rounded-3xl bg-gradient-to-r from-red-500 via-green-500 to-yellow-500">
                <div className="bg-gray-900 rounded-3xl p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center">
                      <span className="text-white text-2xl font-bold">ID:</span>
                      <span className="text-white text-2xl ml-2">{caseItem.id}</span>
                    </div>
                    <button
                      className="text-white transform transition-transform duration-200"
                      onClick={() => toggleExpand(caseItem.id)}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`transform transition-transform duration-200 ${expandedId === caseItem.id ? 'rotate-180' : ''}`}
                      >
                        <path d="M18 15L12 9L6 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>

                  {expandedId === caseItem.id && (
                    <>
                      <div className="grid md:grid-cols-2 gap-8 mb-6">
                        <div>
                          <h2 className="text-white text-2xl font-bold mb-4">Bovino:</h2>
                          <div className="space-y-2">
                            <div><span className="text-white font-bold">RFID:</span> <span className="text-gray-300 ml-2">{caseItem.bovino.rfid}</span></div>
                            <div><span className="text-white font-bold">Nome:</span> <span className="text-gray-300 ml-2">{caseItem.bovino.nome}</span></div>
                            <div><span className="text-white font-bold">Peso:</span> <span className="text-gray-300 ml-2">{caseItem.bovino.peso}</span></div>
                            <div><span className="text-white font-bold">Data Nasc:</span> <span className="text-gray-300 ml-2">{caseItem.bovino.dataNasc}</span></div>
                            <div><span className="text-white font-bold">Tipo:</span> <span className="text-gray-300 ml-2">{caseItem.bovino.type}</span></div>
                          </div>
                        </div>

                        <div>
                          <h2 className="text-white text-2xl font-bold mb-4">Medição:</h2>
                          <div className="space-y-2">
                            <div><span className="text-white font-bold">Temperatura:</span> <span className="text-gray-300 ml-2">{caseItem.medicao.temperatura}</span></div>
                            <div><span className="text-white font-bold">Data e hora:</span> <span className="text-gray-300 ml-2">{caseItem.medicao.dataHora}</span></div>
                          </div>
                          <div className="mt-4">
                            <h2 className="text-white text-2xl font-bold">Alerta:</h2>
                            <div><span className="text-white font-bold">Notas:</span> <span className="text-gray-300 ml-2">{caseItem.alerta.notas}</span></div>
                          </div>
                        </div>
                      </div>

                      {caseItem.recomendacoes && (
                        <div className="bg-black/20 border border-gray-600 rounded-xl p-4">
                          <h2 className="text-white text-2xl font-bold mb-2">Recomendações (IA):</h2>
                          <p className="text-gray-300 text-justify">{caseItem.recomendacoes}</p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Cases;