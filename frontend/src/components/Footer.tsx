import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto">
      <div 
        className="h-16 bg-gradient-to-r from-yellow-400 via-green-500 to-blue-500"
        style={{
          backgroundImage: "url('/gradient-footer.png')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />
    </footer>
  );
};

export default Footer;