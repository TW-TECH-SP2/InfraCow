import React, { useState } from 'react';
import Layout from '../components/Layout';

const casesData = [
  {
    id: '001',
    bovino: {
      rfid: '0xE20034120123456',
      nome: 'Mimosa',
      peso: '600kg',
      idade: '12',
      type: 'Leiteira'
    },
    medicao: {
      temperatura: '38.6 °C',
      data: '20/12/2018'
    }
  },
  {
    id: '002',
    bovino: {
      rfid: '0xE20034120123457',
      nome: 'Zezinho',
      peso: '550kg',
      type: 'Corte'
    },
    medicao: {
      temperatura: '39.1 °C',
      data: '15/03/2019'
    }
  },
  {
    id: '003',
    bovino: {
      rfid: '0xE20034120123458',
      nome: 'Estrela',
      peso: '610kg',
      type: 'Reprodução'
    },
    medicao: {
      temperatura: '38.4 °C',
      data: '10/05/2017'
    }
  },
  {
    id: '004',
    bovino: {
      rfid: '0xE20034120123459',
      nome: 'Branquinha',
      peso: '580kg',
      type: 'Leiteira'
    },
    medicao: {
      temperatura: '37.9 °C',
      data: '01/11/2020'
    }
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
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h2 className="text-white text-2xl font-bold mb-4">Bovino:</h2>
                        <div className="space-y-3">
                          <div>
                            <span className="text-white font-bold">RFID:</span>
                            <span className="text-gray-300 ml-2">{caseItem.bovino.rfid}</span>
                          </div>
                          <div>
                            <span className="text-white font-bold">Nome:</span>
                            <span className="text-gray-300 ml-2">{caseItem.bovino.nome}</span>
                          </div>
                          <div>
                            <span className="text-white font-bold">Peso:</span>
                            <span className="text-gray-300 ml-2">{caseItem.bovino.peso}</span>
                          </div>
                          {caseItem.bovino.idade && (
                            <div>
                              <span className="text-white font-bold">Idade:</span>
                              <span className="text-gray-300 ml-2">{caseItem.bovino.idade} anos</span>
                            </div>
                          )}
                          <div>
                            <span className="text-white font-bold">Tipo:</span>
                            <span className="text-gray-300 ml-2">{caseItem.bovino.type}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h2 className="text-white text-2xl font-bold mb-4">Medição:</h2>
                        <div className="space-y-3">
                          <div>
                            <span className="text-white font-bold">Temperatura:</span>
                            <span className="text-gray-300 ml-2">{caseItem.medicao.temperatura}</span>
                          </div>
                          <div>
                            <span className="text-white font-bold">Data:</span>
                            <span className="text-gray-300 ml-2">{caseItem.medicao.data}</span>
                          </div>
                        </div>
                      </div>
                    </div>
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