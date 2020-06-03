import React from 'react'
import Main from './components/MainComponent'
import { Provider } from 'react-redux'
import { configureStore } from './redux/configureStore'

const store = configureStore()

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}