import React from 'react';
import ReactDom from 'react-dom';
import MainPage from './components/mainPage';
import './styles/globalStyles.scss';

const rootDiv = document.getElementById('react-root');

ReactDom.render(<MainPage/>, rootDiv);
