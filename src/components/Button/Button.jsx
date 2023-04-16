// При нажатии на кнопку Load more должна догружаться следующая порция изображений и рендериться вместе с предыдущими. Кнопка должна рендерится только тогда, когда есть какие-то загруженные изобаржения. Если массив изображений пуст, кнопка не рендерится.
import PropTypes from 'prop-types';

export const Button = ({ onClick }) => {
  return (
    <div onClick={onClick}>
      <button type="Button" className='Button'>
        Load more
      </button>
    </div>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
};
