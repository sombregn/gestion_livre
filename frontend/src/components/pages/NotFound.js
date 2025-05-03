import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='container text-center mt-5'>
      <h1 className='display-1'>404</h1>
      <p className='lead'>Page non trouvée</p>
      <p>La page que vous recherchez n'existe pas.</p>
      <Link to='/' className='btn btn-primary'>
        Retourner à l'accueil
      </Link>
    </div>
  );
};

export default NotFound;