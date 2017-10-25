import {
    GET_POST_COMMENTS,
    ADD_COMMENT,
    UPDATE_COMMENT,
    UPVOTE_COMMENT,
    DOWNVOTE_COMMENT,
    DETETE_COMMENT
 } from '../actions'

export function comments(state = [], action) {
    let comment = {}
    let comments = []
    switch(action.type) {
        case GET_POST_COMMENTS:
            comments = action.comments;
            return [...comments]

        case ADD_COMMENT:
            comment = action.comment;
            return [
                ...state,
                comment
            ]
        case UPDATE_COMMENT:
            comment = action.comment;
            comments = state.filter((c) => c.id != comment.id)
            return [
                ...comments,
                comment
            ]
        case UPVOTE_COMMENT:
            comment = action.comment;
            comments = state.filter((c) => c.id != comment.id)
            return [
                ...comments,
                comment
            ]
        case DOWNVOTE_COMMENT:
            comment = action.comment
            comments = state.filter((c) => c.id != comment.id)
            return [
                ...comments,
                comment
            ]
        case DETETE_COMMENT:
            const {commentId} = action
            comments = state.filter((comment) => comment.id != commentId);
            return comments
        default:
            return state;
    }
}