import React from 'react';
import PropTypes from 'prop-types';
import style from './aboutModal.scss';

const AboutModal = ({ onCloseModalButtonClick }) => {
  return (
		<div className={style['about-modal']}>
				<div className={style['about-modal-content']}>
					<button onClick={onCloseModalButtonClick} className={style['close-button']}>
						X
					</button>
					<div className={style.header}>
						About Flexiblewidth.com
					</div>
					<div className={style.description}>
						We built this tool to help us visualize a website at two sizes at once. This can certaily help witha published site, but can also be really handy to see right as you&apos;re build ing your site locally!
					</div>
					<div className={style.hr} />
					<div className={style['built-by']}>
						This tool was built by:
					</div>
					<div className={style['built-by-grid']}>
						<div className={style['built-by-name']}>
							Broderick Young
						</div>
						<a className={style['built-by-site']} href="http://broderickyoung.com/">
							broderickyoung.com
						</a>
						<div className={style['built-by-name']}>
							Shaun Fox
						</div>
						<a className={style['built-by-site']} href="http://shaunfox.com/">
							shaunfox.com
						</a>
					</div>
				</div>
		</div>
  );
};

AboutModal.propTypes = {
  onCloseModalButtonClick: PropTypes.func
};

AboutModal.defaultProps = {
  onCloseModalButtonClick: () => {}
};

export default AboutModal;
