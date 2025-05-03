import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';
import BookContext from '../../context/book/BookContext';

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const bookContext = useContext(BookContext);

  const { isAuthenticated, logout, user } = authContext;
  const { clearBooks } = bookContext;

  const onLogout = () => {
    logout();
    clearBooks();
  };

  const authLinks = (
    <Fragment>
      <li className='nav-item'>
        <Link className='nav-link' to='/dashboard'>
          Tableau de bord
        </Link>
      </li>
      <li className='nav-item dropdown'>
        <a
          className='nav-link dropdown-toggle'
          href='#'
          id='navbarDropdown'
          role='button'
          data-bs-toggle='dropdown'
          aria-expanded='false'
        >
          {user && user.name}
        </a>
        <ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
          <li>
            <a onClick={onLogout} className='dropdown-item' href='#!'>
              <i className='fas fa-sign-out-alt'></i> Déconnexion
            </a>
          </li>
        </ul>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li className='nav-item'>
        <Link className='nav-link' to='/register'>
          S'inscrire
        </Link>
      </li>
      <li className='nav-item'>
        <Link className='nav-link' to='/login'>
          Se connecter
        </Link>
      </li>
    </Fragment>
  );

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
      <div className='container'>
        <Link className='navbar-brand' to='/'>
          <i className='fas fa-book-open'></i> BiblioApp
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
            {isAuthenticated ? authLinks : guestLinks}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;