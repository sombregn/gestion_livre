import React, { useContext, useEffect, useState } from 'react';
import BookContext from '../../context/book/BookContext';
import BookItem from './BookItem';
import Spinner from '../layout/Spinner';

const BookList = () => {
  const bookContext = useContext(BookContext);
  const { books, getBooks, loading, filtered } = bookContext;

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    getBooks();
    // eslint-disable-next-line
  }, []);

  const onChange = e => {
    setSearchText(e.target.value);
  };

  if (loading) {
    return <Spinner />;
  }

  if (books.length === 0) {
    return <h4 className='text-center'>Aucun livre trouvé</h4>;
  }

  const filteredBooks = searchText
    ? books.filter(
        book =>
          book.title.toLowerCase().includes(searchText.toLowerCase()) ||
          book.author.toLowerCase().includes(searchText.toLowerCase()) ||
          book.genre.toLowerCase().includes(searchText.toLowerCase())
      )
    : books;

  return (
    <div>
      <div className='mb-4'>
        <input
          type='text'
          className='form-control'
          placeholder='Rechercher par titre, auteur ou genre...'
          value={searchText}
          onChange={onChange}
        />
      </div>
      {filteredBooks.length === 0 ? (
        <h4 className='text-center'>Aucun livre trouvé</h4>
      ) : (
        filteredBooks.map(book => <BookItem key={book._id} book={book} />)
      )}
    </div>
  );
};

export default BookList;