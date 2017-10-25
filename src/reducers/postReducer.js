import {
    GET_POSTS,
    GET_POST,
    ADD_POST,
    UPVOTE_POST,
    DOWNVOTE_POST,
    DETETE_POST
 } from '../actions'

export function posts(state = [], action) {
    let post = {}
    let posts = []
    let postId = 0
    switch(action.type) {
        case GET_POSTS:
            posts = action.posts;
            return posts
        case GET_POST:
        case ADD_POST:
        case UPVOTE_POST:
        case DOWNVOTE_POST:
            post = action.post;
            posts = state.filter((p) => p.id != post.id)
            return posts.concat(post)
        case DETETE_POST:
            postId = action.postId
            posts = state.filter((post) => post.id != postId)
            return posts
        default:
            return state;
    }
}