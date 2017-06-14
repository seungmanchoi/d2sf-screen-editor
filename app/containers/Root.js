import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import Routes from '../routes';
import { SET_INIT_SETTINGS } from '../actions/settingsAction';

import {ipcRenderer} from 'electron';

function getSettings(store) {
  var result = ipcRenderer.sendSync('info-settings');

  if(!result.error) {
    store.dispatch({
      type: SET_INIT_SETTINGS,
      pathData: result.data
    });
  }
}

export default function Root({ store, history }) {
  getSettings(store);

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </Provider>
  );
}
