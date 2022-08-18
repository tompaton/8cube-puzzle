/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import App from './App';
import { StoreProvider } from "./store";

render(() => <StoreProvider><App /></StoreProvider>,
       document.getElementById('root'));
