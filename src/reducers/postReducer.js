import {
	GET_POSTS,
	GET_POST,
	UPVOTE_POST,
	DOWNVOTE_POST
 } from '../actions'

export function posts(state = {}, action) {
	let post = {}
	switch(action.type) {
		case GET_POSTS:
			const {posts} = action;
			return posts

		case GET_POST:
			post = action.post;
			return {
				...state,
				[post.id]: post
			}
		case UPVOTE_POST:
			post = action.post;
			return {
				...state,
				[post.id]: {
					...state[post.id],
					'voteScore': post.voteScore + 1
				}
			}
		case DOWNVOTE_POST:
			post = action.post;
			return {
				...state,
				[post.id]: {
					...state[post.id],
					'voteScore': post.voteScore + 1
				}
			}
		default:
			return state;
	}
}