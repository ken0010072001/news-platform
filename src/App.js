import React from 'react'
import { Provider } from 'react-redux'
import { store } from './reducers'
import Home from './components/Home'
import './App.css'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Home />
      </Provider>
    </div>
  );
}

export default App
