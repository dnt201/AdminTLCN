import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { Provider } from 'react-redux';
import './utils/prototype';

import App from './App';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import DeClareRouter from './router';
import store from '@app/store';
import { Toaster } from 'react-hot-toast';
import { SkeletonTheme } from 'react-loading-skeleton';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    // <React.StrictMode>
    <Provider store={store}>
        <BrowserRouter>
            <SkeletonTheme baseColor='#262D34' highlightColor='#444'>
                <DeClareRouter />
                <ToastContainer style={{ zIndex: 100000 }} />
                <Toaster position='bottom-right' containerStyle={{ zIndex: 10100 }} />
            </SkeletonTheme>
        </BrowserRouter>
    </Provider>,
    // </React.StrictMode>,
);
