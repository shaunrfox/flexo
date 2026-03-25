import React from 'react';
import AppHeader from '../appHeader';
import AppFooter from '../appFooter';
import IntroContent from '../introContent';
import IframeContent from '../iframeContent';
import AboutModal from '../aboutModal';
import style from './mainPage.scss';

class MainPage extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      url: '',
      size: 375,
      showingAboutModal: false
    };
  }

  render () {
    const { url, size, showingAboutModal } = this.state;
    return (
			<div className={style['main-page']}>
				<div className={style['header-wrapper']}>
					<AppHeader
						showUrl={!!url}
						url={url}
						currentSize={size}
						onUrlChanged={url => this.setState({ url })}
						onSizeChanged={size => this.setState({ size })}
					/>
				</div>
				<div className={style['main-content']}>
					{
						!url && (
							<IntroContent
								onViewSiteClick={url => this.setState({ url })}
							/>
						)
					}
					{
						!!url && (
							<IframeContent
								url={url}
								size={size}
								onSizeChange={size => this.setState({ size })}
							/>
						)
					}
				</div>
				<div className={style['footer-wrapper']}>
					<AppFooter onAboutClicked={() => this.setState({ showingAboutModal: true })}/>
				</div>
				{
					showingAboutModal && (<AboutModal onCloseModalButtonClick={() => this.setState({ showingAboutModal: false })} />)
				}
			</div>
    );
  }
}

export default MainPage;
