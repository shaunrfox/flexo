import React from 'react';
import PropTypes from 'prop-types';
import SizeButton from '../sizeButton';
import style from './appHeader.scss';

const sizes = [
  1080,
  800,
  768,
  720,
  540,
  480,
  375,
  320,
  240
];

const AppHeader = (
  {
    showUrl,
    url,
    currentSize,
    onUrlChanged,
    onSizeChanged
  }
) => {
  return (
		<div className={style['app-header']}>
			<div className={style['left-side']}>
				<div className={style.logo}>
					Flexiblewidth.com
				</div>
				{
					showUrl && (
						<div className={style['url-bar']}>
							<input
								type='text'
								value={url}
								onChange={e => onUrlChanged(e.target.value)}
							/>
						</div>
					)
				}

			</div>
			<div className={style['right-side']}>
				{
					sizes.map((size) => (
						<SizeButton key={size} size={size} onClick={onSizeChanged} selected={size === currentSize}/>
					))
				}
			</div>
		</div>
  );
};

AppHeader.propTypes = {
  showUrl: PropTypes.bool,
  url: PropTypes.string,
  currentSize: PropTypes.number,
  onUrlChanged: PropTypes.func,
  onSizeChanged: PropTypes.func
};

AppHeader.defaultProps = {
  showUrl: false,
  url: '',
  currentSize: 375,
  onUrlChanged: () => {},
  onSizeChanged: () => {}
};

export default AppHeader;
