import { combineReducers } from 'redux';
import {categories} from './categoryReducer'
import {posts} from './postReducer'

export default combineReducers({
	categories,
	posts
})