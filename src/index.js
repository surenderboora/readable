import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { BrowserRouter} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux'
import {Provider} from 'react-redux';
import reducer from './reducers'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(
	reducer,
	/*
	* Add this to enable redux dev tools. Use this when debugging redux state changes.
	* Needs redux devtools extension from chrome store for this to work and this will
	* show up a tab in dev tools with header as redux.
	*/
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
console.log("Index js store = ", store)
ReactDOM.render(
	<Provider store = {store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById('root'));
registerServiceWorker();
