import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import style from './iframeContent.scss';
import IframeWrapper from '../iframeWrapper';

class IframeContent extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      tempSize: props.size,
      mouseDown: false
    };
  }

  componentDidMount () {
    window.addEventListener('mousemove', (event) => {
      const { mouseDown } = this.state;
      if (!mouseDown) {
        return;
      }
      const realSize = window.innerWidth - event.pageX;
      this.props.onSizeChange(Math.max(realSize, 240));
    });
    window.addEventListener('mouseup', () => {
      this.setState({ mouseDown: false });
    });
    window.addEventListener('mouseleave', () => {
      this.setState({ mouseDown: false });
    });
  }

  render () {
    const { mouseDown } = this.state;
    const { size, url } = this.props;
    const otherSize = window.innerWidth - 6 - size;
    return (
			<div className={style['iframe-content']}>
				<div className={style['left-iframe']}>
					<IframeWrapper
						url={url}
						size={otherSize}
						highlightSizeIndicator={mouseDown}
					/>
				</div>
				<div
					className={classnames(style.divider, { [style.moving]: mouseDown })}
					onMouseDown={() => this.setState({ mouseDown: true })}
				>
					<div className={style['divider-marker']}/>
					<div className={style['divider-marker']}/>
					<div className={style['divider-marker']}/>
				</div>
				<div
					className={style['right-iframe']}
					style={{ width: `${size}px` }}
				>
					<IframeWrapper
						url={url}
						size={size}
						highlightSizeIndicator={mouseDown}
					/>
				</div>
				{
					mouseDown && (<div className={style['window-blocker']}/>)
				}
			</div>
    );
  }
}

IframeContent.propTypes = {
  size: PropTypes.number,
  url: PropTypes.string,
  onSizeChange: PropTypes.func
};

IframeContent.defaultProps = {
  onSizeChange: () => {
  }
};

export default IframeContent;
