import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Loader } from '../Loader/Loader';
import { Button } from '../Button/Button';

export const ImageGallery = ({ onClick, inputValue, page, loadMoreBtn }) => {
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');

  const getImages = async (inputValue, page = 1) => {
    const url = 'https://pixabay.com/api/';
    const API_KEY = '35274925-eeeea550779812487c02d925d';

    try {
      const response = await fetch(
        `${url}?q=${inputValue}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Failed to fetch images');
    }
  };

  useEffect(() => {
    const fetchLoad = async () => {
      setStatus('pending');
      try {
        const response = await getImages(inputValue, page);
        setImages(response.hits);
        setStatus('resolved');
      } catch (error) {
        setStatus('rejected');
      }
    };

    fetchLoad();
  }, [inputValue, page]);

  const fetchLoadMore = async () => {
    try {
      const response = await getImages(inputValue, page + 1);
      setImages((prevState) => [...prevState, ...response.hits]);
      setStatus('resolved');
      if (response.hits.length === 0) {
        loadMoreBtn.disabled = true;
      }
    } catch (error) {
      setStatus('rejected');
    }
  };

  if (status === 'pending') {
    return <Loader />;
  }

  if (status === 'resolved') {
    return (
      <>
        <ul className='ImageGallery'>
          {images.map(({ id, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              url={largeImageURL}
              tags={tags}
              onClick={onClick}
            />
          ))}
        </ul>
        {images.length !== 0 ? (
          <Button onClick={fetchLoadMore} />
        ) : (
          alert('No results')
        )}
      </>
    );
  }

  if (status === 'rejected') {
    return <div>Failed to fetch images.</div>;
  }

  return null;
};

ImageGallery.propTypes = {
  onClick: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  loadMoreBtn: PropTypes.func.isRequired,
};
