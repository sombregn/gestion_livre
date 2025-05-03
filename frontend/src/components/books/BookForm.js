import React, { useState, useContext, useEffect } from 'react';
import BookContext from '../../context/book/BookContext';
import AlertContext from '../../context/alert/AlertContext';

const BookForm = () => {
  const bookContext = useContext(BookContext);
  const alertContext = useContext(AlertContext);

  const { addBook, updateBook, clearCurrent, current } = bookContext;
  const { setAlert } = alertContext;

  useEffect(() => {
    if (current !== null) {
      setBook(current);
    } else {
      setBook({
        title: '',
        author: '',
        description: '',
        isbn: '',
        publishedYear: '',
        genre: ''
      });
    }
  }, [bookContext, current]);

  const [book, setBook] = useState({
    title: '',
    author: '',
    description: '',
    isbn: '',
    publishedYear: '',
    genre: ''
  });

  const { title, author, description, isbn, publishedYear, genre } = book;

  const onChange = e => setBook({ ...book, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    
    if (title === '' || author === '' || description === '' || isbn === '' || publishedYear === '' || genre === '') {
      setAlert('Veuillez remplir tous les champs', 'danger');
      return;
    }

    if (current === null) {
      addBook(book);
      setAlert('Livre ajouté avec succès', 'success');
    } else {
      updateBook(book);
      setAlert('Livre mis à jour avec succès', 'success');
    }
    
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <div className='card'>
      <div className='card-header bg-primary text-white'>
        <h3>{current ? 'Modifier le livre' : 'Ajouter un livre'}</h3>
      </div>
      <div className='card-body'>
        <form onSubmit={onSubmit}>
          <div className='form-group mb-3'>
            <label htmlFor='title'>Titre</label>
            <input
              type='text'
              className='form-control'
              id='title'
              name='title'
              value={title}
              onChange={onChange}
              required
            />
          </div>
          <div className='form-group mb-3'>
            <label htmlFor='author'>Auteur</label>
            <input
              type='text'
              className='form-control'
              id='author'
              name='author'
              value={author}
              onChange={onChange}
              required
            />
          </div>
          <div className='form-group mb-3'>
            <label htmlFor='description'>Description</label>
            <textarea
              className='form-control'
              id='description'
              name='description'
              value={description}
              onChange={onChange}
              required
              rows='3'
            ></textarea>
          </div>
          <div className='form-group mb-3'>
            <label htmlFor='isbn'>ISBN</label>
            <input
              type='text'
              className='form-control'
              id='isbn'
              name='isbn'
              value={isbn}
              onChange={onChange}
              required
              placeholder='ex: 978-2-1234-5680-3'
            />
          </div>
          <div className='form-group mb-3'>
            <label htmlFor='publishedYear'>Année de publication</label>
            <input
              type='number'
              className='form-control'
              id='publishedYear'
              name='publishedYear'
              value={publishedYear}
              onChange={onChange}
              required
              min='1000'
              max={new Date().getFullYear()}
            />
          </div>
          <div className='form-group mb-3'>
            <label htmlFor='genre'>Genre</label>
            <input
              type='text'
              className='form-control'
              id='genre'
              name='genre'
              value={genre}
              onChange={onChange}
              required
            />
          </div>
          <div className='d-flex justify-content-between'>
            <button type='submit' className='btn btn-primary'>
              {current ? 'Mettre à jour' : 'Ajouter'}
            </button>
            {current && (
              <button type='button' className='btn btn-light' onClick={clearAll}>
                Annuler
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookForm;