import React from 'react';
import SizeButton from './index';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

storiesOf('Size Button', module)
  .add('default', () => <SizeButton onClick={action('clicked')} size={360} />)
  .add('selected', () => <SizeButton onClick={action('clicked')} size={360} selected={true} />);
