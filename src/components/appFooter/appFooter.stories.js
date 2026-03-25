import React from 'react';
import AppFooter from './index';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

storiesOf('App Footer', module)
  .add('default', () => (
		<AppFooter
			onAboutClicked={action('onAboutClicked')}
		/>
  ));
