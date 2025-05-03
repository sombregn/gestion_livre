import React, { useContext, useEffect } from 'react';
import BookForm from '../books/BookForm';
import BookList from '../books/BookList';
import AuthContext from '../../context/auth/AuthContext';

const Dashboard = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='container mt-4'>
      <div className='row'>
        <div className='col-md-6'>
          <h2 className='mb-4'>Gestion des livres</h2>
          <BookForm />
        </div>
        <div className='col-md-6'>
          <h2 className='mb-4'>Ma bibliothèque</h2>
          <BookList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;