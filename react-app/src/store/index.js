import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import projectReducer from './project';
import rewardReducer from './rewards';
import contributionReducer from './contributions';
import categoryReducer from './category';
import updateReducer from './updates';


const rootReducer = combineReducers({
  session,
  project: projectReducer,
  rewards: rewardReducer,
  contributions: contributionReducer,
  category: categoryReducer,
  updates: updateReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
