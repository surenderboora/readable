import {
    GET_POST_COMMENTS,
    ADD_COMMENT,
    UPDATE_COMMENT,
    UPVOTE_COMMENT,
    DOWNVOTE_COMMENT,
    DETETE_COMMENT
} from '../actions'


export const listPostComments = (comments) => {
    return {
        type: GET_POST_COMMENTS,
        comments
    }
}

export const createComment = (post) => {
    return {
        type: ADD_COMMENT,
        post
    }
}

export const updateComment = (post) => {
    return {
        type: UPDATE_COMMENT,
        post
    }
}

export const upvoteComment = (post) => {
    return {
        type: UPVOTE_COMMENT,
        post
    }
}

export const downvoteComment = (post) => {
    return {
        type: DOWNVOTE_COMMENT,
        post
    }
}

export const deleteComment = (postId) => {
    return {
        type: DETETE_COMMENT,
        postId
    }
}