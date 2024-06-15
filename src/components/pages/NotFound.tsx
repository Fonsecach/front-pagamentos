import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
      <h1>404 - Não Encontrado</h1>
      <p>A página que você está procurando não existe.</p>
      <Link to="/">Home</Link>
    </div>
  );
};

export default NotFound;
