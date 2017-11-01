import {
    GET_POSTS,
    GET_POST,
    ADD_POST,
    UPVOTE_POST,
    DOWNVOTE_POST,
    DETETE_POST,
    ADD_COMMENT,
    DETETE_COMMENT,
    GET_POST_COMMENTS
 } from '../actions'

export function posts(state = [], action) {
    let post = {}
    let posts = []
    let postId = 0
    let comment = {}
    let commentId = 0
    switch(action.type) {
        case GET_POSTS:
            posts = action.posts;
            return posts
        case GET_POST:
        case ADD_POST:
        case UPVOTE_POST:
        case DOWNVOTE_POST:
            post = action.post;
            posts = state.filter((p) => p.id !== post.id)
            return posts.concat(post)
        case DETETE_POST:
            postId = action.postId
            posts = state.filter((post) => post.id !== postId)
            return posts
        case ADD_COMMENT:
            comment = action.comment;
            postId = comment.parentId;
            posts = state.filter((post) => post.id !== postId)
            post = state.find((post) => post.id === postId)
            post.comments = post.comments.push(comment)
            return posts.concat(post)
        case DETETE_COMMENT:
            commentId = action.commentId;
            postId = action.postId;
            posts = state.filter((post) => post.id !== postId)
            post = state.find((post) => post.id === postId)
            const post_comments = post.comments.filter((c) => c.id !== comment.id)
            const newPost = {
                    ...post,
                    comments: post_comments
                }
            return [...posts, newPost]
        case GET_POST_COMMENTS:
            postId = action.postId
            const comments = action.comments
            posts = state.filter((post) => post.id !== postId)
            post = state.find((post) => post.id === postId)
            console.log("GET_POST_COMMENTS", posts)
            console.log("GET_POST_COMMENTS", post)
            console.log("GET_POST_COMMENTS", comments)
            const currentPost = {
                    ...post,
                    comments: [...comments]
                }
            console.log("GET_POST_COMMENTS", currentPost)
            return [...posts, currentPost]
        default:
            return state;
    }
}