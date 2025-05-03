import React, { useContext, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import BookContext from '../../context/book/BookContext';
import Spinner from '../layout/Spinner';

const BookDetail = () => {
  const bookContext = useContext(BookContext);
  const { getBook, current, loading } = bookContext;
  const { id } = useParams();

  useEffect(() => {
    getBook(id);
    // eslint-disable-next-line
  }, [id]);

  if (loading || !current) {
    return <Spinner />;
  }

  const { title, author, description, isbn, publishedYear, genre, createdAt } = current;

  return (
    <div className='container mt-4'>
      <div className='card'>
        <div className='card-header bg-primary text-white'>
          <h2>{title}</h2>
        </div>
        <div className='card-body'>
          <h5 className='card-title'>par {author}</h5>
          <div className='row mt-4'>
            <div className='col-md-8'>
              <p className='card-text'>{description}</p>
            </div>
            <div className='col-md-4'>
              <ul className='list-group'>
                <li className='list-group-item'>
                  <strong>ISBN:</strong> {isbn}
                </li>
                <li className='list-group-item'>
                  <strong>Année de publication:</strong> {publishedYear}
                </li>
                <li className='list-group-item'>
                  <strong>Genre:</strong> {genre}
                </li>
                <li className='list-group-item'>
                  <strong>Ajouté le:</strong> {new Date(createdAt).toLocaleDateString()}
                </li>
              </ul>
            </div>
          </div>
          <div className='mt-4'>
            <Link to='/dashboard' className='btn btn-secondary'>
              Retour
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;