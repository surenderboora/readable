import {
	GET_CATEGORIES
} from '../actions'

export const listCategories = (categories) => {
	return {
		type: GET_CATEGORIES,
		categories
	}
}