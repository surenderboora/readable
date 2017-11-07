import {
    GET_POST_COMMENTS,
    ADD_COMMENT,
    UPDATE_COMMENT,
    UPVOTE_COMMENT,
    DOWNVOTE_COMMENT,
    DETETE_COMMENT
 } from '../actions'
import { dynamicSort } from '../utils'

export function comments(state = [], action) {
    let comment = {}
    let comments = []
    switch(action.type) {
        case GET_POST_COMMENTS:
            comments = action.comments;
            comments.sort(dynamicSort('voteScore', 'desc'))
            return [...comments]
        case ADD_COMMENT:
            comment = action.comment;
            comments = [
                ...state,
                comment
            ]
            comments.sort(dynamicSort('voteScore', 'desc'))
            return comments
        case UPDATE_COMMENT:
        case UPVOTE_COMMENT:
        case DOWNVOTE_COMMENT:
            comment = action.comment
            comments = state.filter((c) => c.id !== comment.id)
            comments = [
                ...comments,
                {...comment}
            ]
            comments.sort(dynamicSort('voteScore', 'desc'))
            return comments
        case DETETE_COMMENT:
            const {commentId} = action
            comments = state.filter((comment) => comment.id !== commentId);
            comments.sort(dynamicSort('voteScore', 'desc'))
            return comments
        default:
            return state;
    }
}