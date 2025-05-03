import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

// Composants de mise en page
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Alert from './components/layout/Alert';

// Pages
import Home from './components/pages/Home';
import Dashboard from './components/pages/Dashboard';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import NotFound from './components/pages/NotFound';
import BookDetail from './components/books/BookDetail';
import PrivateRoute from './components/auth/PrivateRoute';

// Context
import AuthState from './context/auth/AuthState';
import BookState from './context/book/BookState';
import AlertState from './context/alert/AlertState';

// Utils
import setAuthToken from './utils/setAuthToken';
import './utils/api';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <BookState>
        <AlertState>
          <Router>
            <div className='d-flex flex-column min-vh-100'>
              <Navbar />
              <div className='container mt-4 mb-4'>
                <Alert />
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/register' element={<Register />} />
                  <Route 
                    path='/dashboard' 
                    element={
                      <PrivateRoute>
                        <Dashboard />
                      </PrivateRoute>
                    } 
                  />
                  <Route 
                    path='/books/:id' 
                    element={
                      <PrivateRoute>
                        <BookDetail />
                      </PrivateRoute>
                    } 
                  />
                  <Route path='*' element={<NotFound />} />
                </Routes>
              </div>
              <Footer />
            </div>
          </Router>
        </AlertState>
      </BookState>
    </AuthState>
  );
};

export default App;