import React, { useReducer } from 'react';
import axios from 'axios';
import BookContext from './BookContext';
import bookReducer from './bookReducer';
import {
  GET_BOOKS,
  ADD_BOOK,
  DELETE_BOOK,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_BOOK,
  FILTER_BOOKS,
  CLEAR_FILTER,
  BOOK_ERROR,
  CLEAR_BOOKS,
  GET_BOOK
} from './bookTypes';

const BookState = props => {
  const initialState = {
    books: [],
    current: null,
    filtered: null,
    error: null,
    loading: true
  };

  const [state, dispatch] = useReducer(bookReducer, initialState);

  // Obtenir tous les livres
  const getBooks = async () => {
    try {
      const res = await axios.get('/api/books');

      dispatch({
        type: GET_BOOKS,
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: BOOK_ERROR,
        payload: err.response.data.message
      });
    }
  };

  // Obtenir un livre spécifique
  const getBook = async id => {
    try {
      const res = await axios.get(`/api/books/${id}`);

      dispatch({
        type: GET_BOOK,
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: BOOK_ERROR,
        payload: err.response.data.message
      });
    }
  };

  // Ajouter un livre
  const addBook = async book => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post('/api/books', book, config);

      dispatch({
        type: ADD_BOOK,
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: BOOK_ERROR,
        payload: err.response.data.message
      });
    }
  };

  // Supprimer un livre
  const deleteBook = async id => {
    try {
      await axios.delete(`/api/books/${id}`);

      dispatch({
        type: DELETE_BOOK,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: BOOK_ERROR,
        payload: err.response.data.message
      });
    }
  };

  // Mettre à jour un livre
  const updateBook = async book => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(`/api/books/${book._id}`, book, config);

      dispatch({
        type: UPDATE_BOOK,
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: BOOK_ERROR,
        payload: err.response.data.message
      });
    }
  };

  // Définir le livre courant
  const setCurrent = book => {
    dispatch({ type: SET_CURRENT, payload: book });
  };

  // Effacer le livre courant
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Filtrer les livres
  const filterBooks = text => {
    dispatch({ type: FILTER_BOOKS, payload: text });
  };

  // Effacer le filtre
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  // Effacer les livres
  const clearBooks = () => {
    dispatch({ type: CLEAR_BOOKS });
  };

  return (
    <BookContext.Provider
      value={{
        books: state.books,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        loading: state.loading,
        getBooks,
        getBook,
        addBook,
        deleteBook,
        setCurrent,
        clearCurrent,
        updateBook,
        filterBooks,
        clearFilter,
        clearBooks
      }}
    >
      {props.children}
    </BookContext.Provider>
  );
};

export default BookState;