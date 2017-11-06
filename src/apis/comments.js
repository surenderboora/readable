import { api, headers } from './index'
import { timestampToDate } from '../utils'

export const getPostComments = (postId) =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())
    .then((comments) => {
      comments.forEach((comment) => {
        comment['createdOn'] = timestampToDate(comment['timestamp']);
      });
      return comments;
    })

export const createComment = (comment) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  })
  .then(res => res.json())
  .then(comment => {
      comment['createdOn'] = timestampToDate(comment['timestamp']);
      return comment;
  })

export const voteOnComment = (commentId, voteOption) =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({option: voteOption})
    }).then(res => res.json())
    .then(comment => {
      comment['createdOn'] = timestampToDate(comment['timestamp']);
      return comment;
    })

export const deleteComment = (commentId) =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(comment => {
    comment['createdOn'] = timestampToDate(comment['timestamp']);
    return comment;
  })

export const updateComment = (comment) =>
  fetch(`${api}/comments/${comment.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({body: comment.body})
  })
  .then(res => res.json())
  .then(comment => {
    comment['createdOn'] = timestampToDate(comment['timestamp']);
    return comment;
  })