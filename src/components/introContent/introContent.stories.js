import React from 'react';
import IntroContent from './index';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

storiesOf('Intro Content', module)
  .add('default', () => <IntroContent onViewSiteClick={action('clicked')} />);
