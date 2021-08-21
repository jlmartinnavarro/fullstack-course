import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

const mainReducer = combineReducers({
  anecdotes: reducer,
  notification: notificationReducer,
  filter: filterReducer,
})

const store = createStore(mainReducer, composeWithDevTools())

export default store