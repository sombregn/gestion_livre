import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AlertContext from '../../context/alert/AlertContext';
import AuthContext from '../../context/auth/AuthContext';

const Login = () => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { login, error, clearErrors, isAuthenticated } = authContext;

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }

    if (error) {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated]);

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Veuillez remplir tous les champs', 'danger');
    } else {
      login({
        email,
        password
      });
    }
  };

  return (
    <div className='container mt-5'>
      <div className='row justify-content-center'>
        <div className='col-md-6'>
          <div className='card'>
            <div className='card-header bg-primary text-white'>
              <h2 className='text-center'>Connexion</h2>
            </div>
            <div className='card-body'>
              <form onSubmit={onSubmit}>
                <div className='form-group mb-3'>
                  <label htmlFor='email'>Email</label>
                  <input
                    type='email'
                    className='form-control'
                    id='email'
                    name='email'
                    value={email}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className='form-group mb-3'>
                  <label htmlFor='password'>Mot de passe</label>
                  <input
                    type='password'
                    className='form-control'
                    id='password'
                    name='password'
                    value={password}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className='d-grid'>
                  <button type='submit' className='btn btn-primary'>
                    Se connecter
                  </button>
                </div>
                <p className='mt-3 text-center'>
                  Pas encore de compte? <Link to='/register'>S'inscrire</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;