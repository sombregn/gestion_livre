import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import BookContext from '../../context/book/BookContext';
import AlertContext from '../../context/alert/AlertContext';
import { Link } from 'react-router-dom';

const BookItem = ({ book }) => {
  const bookContext = useContext(BookContext);
  const alertContext = useContext(AlertContext);

  const { deleteBook, setCurrent, clearCurrent } = bookContext;
  const { setAlert } = alertContext;

  const { _id, title, author, genre, publishedYear } = book;

  const onDelete = () => {
    deleteBook(_id);
    clearCurrent();
    setAlert('Livre supprimé avec succès', 'success');
  };

  return (
    <div className='card mb-3'>
      <div className='card-body'>
        <h4 className='card-title'>{title}</h4>
        <h6 className='card-subtitle mb-2 text-muted'>par {author}</h6>
        <div className='card-text'>
          <p>
            <strong>Genre:</strong> {genre}
          </p>
          <p>
            <strong>Année:</strong> {publishedYear}
          </p>
        </div>
        <div className='d-flex justify-content-between mt-3'>
          <Link to={`/books/${_id}`} className='btn btn-info text-white'>
            Détails
          </Link>
          <button
            className='btn btn-primary'
            onClick={() => setCurrent(book)}
          >
            Modifier
          </button>
          <button className='btn btn-danger' onClick={onDelete}>
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};

BookItem.propTypes = {
  book: PropTypes.object.isRequired
};

export default BookItem;