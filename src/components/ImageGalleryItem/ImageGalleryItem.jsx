import PropTypes from 'prop-types';

export function ImageGalleryItem({ url, tags, onClick }) {
  return (
    <>
      <li className='ImageGalleryItem'>
        <img src={url} alt={tags} onClick={() => onClick(url)}  className='ImageGalleryItem-image'/>
      </li>
    </>
  );
}

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
