import React from 'react';
import PropTypes from 'prop-types';
import style from './introContent.scss';

class IntroContent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      url: ''
    };
  }

  render () {
    const { url } = this.state;
    const { onViewSiteClick } = this.props;
    return (
			<div className={style['intro-content']}>
				<div className={style['centering-content']}>
					<div className={style.title}>
						Enter a URL to view your site at multiple widths at once
					</div>
					<div className={style['input-wrapper']}>
						<input
						type='text'
						value={url}
						onChange={e => this.setState({ url: e.target.value })}
						placeholder='Enter a URL...'
						/>
					</div>
					{
						!url.trim() && (
							<div className={style.hint}>
								Any url or localhost will work
							</div>
						)
					}
					{
						!!url.trim() && (
							<div className={style['view-site-wrapper']}>
								<button
									className={style['view-site']}
									onClick={() => onViewSiteClick(url.trim())}
								>
									View Site
								</button>
							</div>
						)
					}
				</div>
			</div>
    );
  }
}

IntroContent.propTypes = {
  onViewSiteClick: PropTypes.func
};

IntroContent.defaultProps = {
  onViewSiteClick: () => {}
};

export default IntroContent;
