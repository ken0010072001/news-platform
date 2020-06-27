import { createStore } from 'redux'

const initialState = {
  articles: [],
  pager: 1
}

function newsState(state = initialState, action) {
  switch (action.type) {
    case 'SET_ARTICLES':
      return {
        ...state,
        articles: action.articles
      }
    case 'SET_PAGER':
      return {
        ...state,
        pager: action.pager
      }
    default:
      return state
  }
}

 export const store = createStore(
  newsState, /* preloadedState, */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
