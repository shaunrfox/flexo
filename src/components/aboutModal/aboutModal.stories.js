import React from 'react';
import AboutModal from './index';

import { storiesOf } from '@storybook/react';

storiesOf('About Modal', module)
  .add('default', () => (
		<AboutModal		/>
  ));
