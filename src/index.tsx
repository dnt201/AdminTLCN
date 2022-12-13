import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { Provider } from 'react-redux';

import App from './App';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import DeClareRouter from './router';
import store from '@app/store';
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <DeClareRouter />
                <ToastContainer />
                <Toaster position='bottom-right' containerStyle={{ zIndex: 10100 }} />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
);
