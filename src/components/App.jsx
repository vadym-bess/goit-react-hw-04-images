import { useState, useEffect } from 'react';
import { fetchPictures } from '../Servises/api';
import './App.module.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [pictures, setPictures] = useState([]);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [largeImageUrl, setLargeImageUrl] = useState('');
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [loadMore, setLoadMore] = useState(null);

  const getLargeImgUrl = imgUrl => {
    setLargeImageUrl(imgUrl);
    toggleModal();
  };

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  const searchResult = value => {
    setQuery(value);
    setPage(1);
    setPictures([]);
    setLoadMore(null);
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  useEffect(() => {
    if (!query) {
      return;
    }

    setStatus('loading');
    setLoadMore(null);

    fetchPictures(query, page)
      .then(e => {
        setPictures(prevState => [...prevState, ...e.hits]);
        setStatus('idle');
        setLoadMore(12 - e.hits.length);
      })
      .catch(error => console.log(error));
  }, [page, query]);

  return (
    <div className="App">
      <Searchbar onSubmit={searchResult} />
      {showModal && <Modal imgUrl={largeImageUrl} onClose={toggleModal} />}
      <ImageGallery pictures={pictures} onClick={getLargeImgUrl} />
      {status === 'loading' && <Loader />}
      {loadMore === 0 && <Button onClick={handleLoadMore} />}
    </div>
  );
};
