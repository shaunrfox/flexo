import React from 'react';
import PropTypes from 'prop-types';
import style from './appFooter.scss';

const AppFooter = (
  {
    onAboutClicked
  }
) => {
  return (
		<div className={style['app-footer']}>
			<button
				onClick={onAboutClicked}
				className={style['footer-button']}
			>
				About
			</button>
			<div className={style.divider}>
				/
			</div>
			<a
				href='https://github.com/shaunrfox/flexiblewidth'
				className={style['footer-button']}
				target='_blank'
				rel='noreferrer'
			>
				Github
			</a>
		</div>
  );
};

AppFooter.propTypes = {
  onAboutClicked: PropTypes.func
};

AppFooter.defaultProps = {
  onAboutClicked: () => {}
};

export default AppFooter;
