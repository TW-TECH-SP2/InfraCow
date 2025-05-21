import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface CaseCardProps {
  title: string;
  date: string;
  description: string;
  results: string;
}

const CaseCard: React.FC<CaseCardProps> = ({ title, date, description, results }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-4 border border-gray-700 rounded-lg overflow-hidden bg-gray-800">
      <div 
        className="p-4 flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div>
          <h3 className="text-white text-lg font-medium">{title}</h3>
          <p className="text-gray-400 text-sm">{date}</p>
        </div>
        <button className="text-white">
          {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
        </button>
      </div>
      
      {isExpanded && (
        <div className="p-4 pt-0 border-t border-gray-700">
          <p className="text-gray-300 mb-4">{description}</p>
          <div>
            <h4 className="text-white font-medium mb-2">Resultados:</h4>
            <p className="text-gray-300">{results}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseCard;