import { GET_CATEGORIES } from '../actions'
import { dynamicSort } from '../utils'

export function categories(state = [], action) {
    switch(action.type) {
        case GET_CATEGORIES:
            const {categories} = action;
            return categories.sort(dynamicSort('name', 'asc'))
        default:
            return state
    }
}