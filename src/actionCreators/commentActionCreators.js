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

export const createComment = (comment) => {
    return {
        type: ADD_COMMENT,
        comment
    }
}

export const updateComment = (comment) => {
    return {
        type: UPDATE_COMMENT,
        comment
    }
}

export const upvoteComment = (comment) => {
    return {
        type: UPVOTE_COMMENT,
        comment
    }
}

export const downvoteComment = (comment) => {
    return {
        type: DOWNVOTE_COMMENT,
        comment
    }
}

export const deleteComment = (commentId) => {
    return {
        type: DETETE_COMMENT,
        commentId
    }
}