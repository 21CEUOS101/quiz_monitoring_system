/*
 * @file index.js
 * @author Ashish H. Prajapati (prajapatiashish40567@gmail.com)
 *
 * @brief Main file of the application to render the application
 *
 * @details This file is the main file of the application. It renders the application and also renders the Toaster component.
 *
 * @version 0.1
 * @date 14th March 2024
 *
 * @history 14th March 2021 Finalized the file for version 0.1
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <App />
    </>
);
