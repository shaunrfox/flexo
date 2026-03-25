import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import style from './sizeButton.scss';

const SizeButton = (
  {
    size,
    onClick,
    selected
  }
) => {
  return (
		<button
			className={classnames(style['size-button'], { [style.selected]: selected })}
			onClick={() => onClick(size)}
		>
			{size}
		</button>
  );
};

SizeButton.propTypes = {
  size: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool
};

SizeButton.defaultProps = {
  selected: false
};

export default SizeButton;
