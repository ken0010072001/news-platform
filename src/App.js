import React from 'react'
import { useEffect } from 'react'
import { Provider } from 'react-redux'
import { store } from './reducers'
import Home from './componets/Home'
import './App.css'

function App() {

  useEffect(() => {
  })

  return (
    <div className="App">
      <Provider store={store}>
        <Home />
      </Provider>
    </div>
  );
}

export default App
