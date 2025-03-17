// src/components/UI/Card.jsx
import React from 'react';

export default function Card({ 
  children, 
  className = '', 
  status = null,
}) {
  const statusClass = status ? status : '';
  const cardClasses = `challenge ${statusClass} ${className}`;
  
  return (
    <div className={cardClasses}>
      {children}
    </div>
  );
}