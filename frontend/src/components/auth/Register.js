import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AlertContext from '../../context/alert/AlertContext';
import AuthContext from '../../context/auth/AuthContext';

const Register = () => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { register, error, clearErrors, isAuthenticated } = authContext;

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
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      setAlert('Veuillez remplir tous les champs', 'danger');
    } else if (password !== password2) {
      setAlert('Les mots de passe ne correspondent pas', 'danger');
    } else {
      register({
        name,
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
              <h2 className='text-center'>Inscription</h2>
            </div>
            <div className='card-body'>
              <form onSubmit={onSubmit}>
                <div className='form-group mb-3'>
                  <label htmlFor='name'>Nom</label>
                  <input
                    type='text'
                    className='form-control'
                    id='name'
                    name='name'
                    value={name}
                    onChange={onChange}
                    required
                  />
                </div>
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
                    minLength='6'
                  />
                </div>
                <div className='form-group mb-3'>
                  <label htmlFor='password2'>Confirmer le mot de passe</label>
                  <input
                    type='password'
                    className='form-control'
                    id='password2'
                    name='password2'
                    value={password2}
                    onChange={onChange}
                    required
                    minLength='6'
                  />
                </div>
                <div className='d-grid'>
                  <button type='submit' className='btn btn-primary'>
                    S'inscrire
                  </button>
                </div>
                <p className='mt-3 text-center'>
                  Déjà inscrit? <Link to='/login'>Se connecter</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;