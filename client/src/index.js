import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import { ContextProvider } from './Context/context';





ReactDom.render(
    <ContextProvider>
        <App/>
    </ContextProvider>,
    document.getElementById("root"));