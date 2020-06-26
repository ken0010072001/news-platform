import { createStore } from 'redux'

const initialState = {
  articles: [],
}

function newsState(state, action) {
  switch (action.type) {
    case 'SET_ARTICLES':
      return {
        ...state,
        articles: action.articles
      }
    default:
      return state
  }
}

 export const store = createStore(
  newsState, /* preloadedState, */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
