import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import rootReducers from './reducers';
import Media from './screens/media';

//Create redux store
const store = createStore(
  rootReducers,
  applyMiddleware(thunkMiddleware)
)

function App() {
  return (
    <Provider store={store}>
      <Media />
    </Provider>
  );
}

export default App;