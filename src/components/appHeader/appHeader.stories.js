import React from 'react';
import AppHeader from './index';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

storiesOf('App Header', module)
  .add('default', () => (
		<AppHeader
			url='http://shaunfox.com/'
			currentSize={360}
			onUrlChanged={action('onUrlChanged')}
			onSizeChanged={action('onSizeChanged')}
		/>
  ))
  .add('showUrl', () => (
		<AppHeader
			showUrl={true}
			url='http://shaunfox.com/'
			currentSize={360}
			onUrlChanged={action('onUrlChanged')}
			onSizeChanged={action('onSizeChanged')}
		/>
  ));
