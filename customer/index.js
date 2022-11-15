import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import { App } from './app/App';
// Import the store here.
import store from './app/store';

ReactDOM.render(
  <Provider store={store}>
      <App  />
      </Provider>
      ,
      document.getElementById('root')
    )
// Pass state and dispatch props to the <App /> component.
/*const render = () => {
  ReactDOM.render(
<Provider store={store}>
    <App  />
    </Provider>
    ,
    document.getElementById('root')
  )
};*/
//render();

// Subscribe render to the store.
//store.subscribe(render);