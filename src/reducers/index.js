import { createStore } from 'redux'

const initialState = {
  articles: [],
  pager: 1,
  searching: false,
  searchArticles: []
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
    case 'SET_SEARCH_STATE':
      return {
        ...state,
        searching: action.searching
      }
    case 'SET_SEARCH_ARTICLES':
      return {
        ...state,
        searchArticles: action.searchArticles
      }
    default:
      return state
  }
}

 export const store = createStore(
  newsState, /* preloadedState, */
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
