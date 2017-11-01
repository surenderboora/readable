import {
    GET_POSTS,
    GET_POST,
    ADD_POST,
    UPVOTE_POST,
    DOWNVOTE_POST,
    DETETE_POST
} from '../actions'


export const listPosts = (posts) => {
    return {
        type: GET_POSTS,
        posts
    }
}

export const getPost = (post) => {
    return {
        type: GET_POST,
        post
    }
}

export const createPost = (post) => {
    return {
        type: ADD_POST,
        post
    }
}

export const upvotePost = (post) => {
    return {
        type: UPVOTE_POST,
        post
    }
}

export const downvotePost = (post) => {
    return {
        type: DOWNVOTE_POST,
        post
    }
}

export const removePost = (postId) => {
    return {
        type: DETETE_POST,
        postId
    }
}