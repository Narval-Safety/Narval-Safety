import React from 'react';
import { render } from 'react-dom';
import Foreground from './components/Foreground.js';

render(<Foreground chrome={chrome}/>, document.querySelector('#foreground'));
