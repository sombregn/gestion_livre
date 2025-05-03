import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='container mt-5'>
      <div className='row'>
        <div className='col-md-12 text-center'>
          <h1 className='display-4'>Bienvenue sur BiblioApp</h1>
          <p className='lead'>
            La plateforme de gestion de livres personnelle et intuitive
          </p>
          <div className='mt-4'>
            <Link to='/register' className='btn btn-primary me-2'>
              S'inscrire
            </Link>
            <Link to='/login' className='btn btn-light'>
              Se connecter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;