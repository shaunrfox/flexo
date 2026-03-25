import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import style from './iframeWrapper.scss';

const IframeWrapper = (
  {
    size,
    url,
    highlightSizeIndicator
  }
) => {
  return (
		<div className={style['iframe-wrapper']}>
			<iframe
				src={url}
			/>
			<div className={classnames(style['size-indicator'], { [style.highlighted]: highlightSizeIndicator })}>
				{size}px
			</div>
		</div>
  );
};

IframeWrapper.propTypes = {
  size: PropTypes.number,
  url: PropTypes.string,
  highlightSizeIndicator: PropTypes.bool
};

IframeWrapper.defaultProps = {
  size: 0,
  url: '',
  highlightSizeIndicator: false
};

export default IframeWrapper;
