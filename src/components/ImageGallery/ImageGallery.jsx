import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Loader } from '../Loader/Loader';
import { Button } from '../Button/Button';

export class ImageGallery extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    inputValue: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
    loadMoreBtn: PropTypes.func.isRequired,
  };

  state = {
    images: [],
    status: 'idle',
    disableLoadMoreBtn: false,
  };

  getImages = async (inputValue, page = 1) => {
    const url = 'https://pixabay.com/api/';
    const API_KEY = '35274925-eeeea550779812487c02d925d';

    return await fetch(
      `${url}?q=${inputValue}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    ).then(res => res.json());
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.inputValue !== this.props.inputValue ||
      prevProps.page !== this.props.page
    ) {
      this.fetchLoad();
    }
  }

  fetchLoad = () => {
    const { inputValue, page } = this.props;

    this.getImages(inputValue, page)
      .then(response => {
        if (page === 1) {
          this.setState({
            images: response.hits,
            status: 'resolve',
          });
        } else {
          this.setState(prevState => ({
            images: [...prevState.images, ...response.hits],
            status: 'resolve',
          }));
        }

        if (response.hits.length < 12) {
          this.setState({ disableLoadMoreBtn: true });
        } else {
          this.setState({ disableLoadMoreBtn: false });
        }
      })
      .catch(error => this.setState({ status: 'rejected' }));
  };

  render() {
    const { images, status, disableLoadMoreBtn } = this.state;

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'resolve') {
      return (
        <>
          <ul className='ImageGallery'>
            {images.map(({ id, largeImageURL, tags }) => (
              <ImageGalleryItem
                key={id}
                url={largeImageURL}
                tags={tags}
                onClick={this.props.onClick}
              />
            ))}
          </ul>
          {!disableLoadMoreBtn && (
            <Button onClick={this.props.loadMoreBtn} disabled={disableLoadMoreBtn}>
              Load More
            </Button>
          )}
        </>
      );
    }
  }
}
