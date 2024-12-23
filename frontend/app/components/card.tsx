import React from 'react';

type CardProps = {
  children: React.ReactNode;
  width?: string; 
};

const Card: React.FC<CardProps> = ({ children, width = 'max-w-md' }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className={`w-full ${width} p-6 bg-white shadow-lg rounded-xl`}>{children}</div>
    </div>
  );
};

export default Card;