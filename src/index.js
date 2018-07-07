import React from 'react';
import {render} from 'react-dom';
import Root from './Root';
import 'bootstrap/dist/css/bootstrap.css';
import 'sweetalert/dist/sweetalert.css'
import './styles/global.css'
import registerServiceWorker from './registerServiceWorker';

render(<Root />, document.getElementById('root'));
registerServiceWorker();
