import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import 'antd/dist/antd.css';

import Routes from './routes';

function App() {
  return (
    <Provider store={ store }>
      <PersistGate persistor={ persistor }>
        <Routes />
      </PersistGate>
    </Provider>
  );
}

export default App;
