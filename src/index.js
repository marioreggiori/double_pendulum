import React from 'react';
import ReactDOM from 'react-dom';


import App from './app';

import './css/styles.scss';

const mount = document.createElement('div');
mount.setAttribute('id', 'mount');
document.currentScript.parentElement.insertBefore(mount, document.currentScript);

ReactDOM.render(<App/>, mount);

