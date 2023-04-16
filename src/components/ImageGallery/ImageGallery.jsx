import { Component } from 'react';
import PropTypes from 'prop-types';
import {ImageGalleryItem} from '../ImageGalleryItem/ImageGalleryItem';
import {Loader} from '../Loader/Loader';
import {Button} from '../Button/Button';

// 4

export class ImageGallery extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    inputValue: PropTypes.string.isRequired,
  };

  state = {
    images: [],
    status: 'idle',
  };

  getImages = async (inputValue, page = 1) => {
    const url = 'https://pixabay.com/api/';
    const API_KEY = '35274925-eeeea550779812487c02d925d';

    return await fetch(`${url}?q=${inputValue}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`)
      .then(res => res.json());
  };


  componentDidUpdate(prevProps, prevState) {
    if (prevProps.inputValue !== this.props.inputValue) {
      this.fetchLoad();
    }
    if (prevProps.page !== this.props.page && this.props.page > 1) {
      this.fetchLoadMore();
    }
  }

  fetchLoad = () => {
    const { inputValue, page } = this.props;

    this.getImages(inputValue, page)
      .then(response => {
        this.setState({
          images: response.hits,
          status: 'resolve',
        });
      })
      .catch(error => this.setState({ status: 'rejected' }));
  };

  fetchLoadMore = () => {
    const { inputValue, page } = this.props;

    this.getImages(inputValue, page)
      .then(response => {
        this.setState(prevState => ({
          images: [...prevState.images, ...response.hits],
          status: 'resolve',
        }));
        if (response.hits.length === 0) {
        this.props.loadMoreBtn.disabled = true;
      }
      })

      .catch(error => this.setState({ status: 'rejected' }));
  };

  render() {
    const { images, status } = this.state;

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
          {this.state.images.length !== 0 ? (
            <Button onClick={this.props.loadMoreBtn} />
          ) : (
            alert('No results')
          )}
        </>
      );
    }
  }
}
