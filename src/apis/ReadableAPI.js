import { dynamicSort, timestampToDate } from '../utils'

const api = process.env.REACT_APP_REDABLE_API_URL || 'http://localhost:3001'
let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

export const getPosts = (category = '') => {
  const url = category ? `${api}/${category}/posts`: `${api}/posts`;

  return fetch(url, { headers })
    .then(res => res.json())
    // .then(data => data.posts)
  }

export const createPost = (post) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  }).then(res => res.json())

export const getPost = (postId) =>
  fetch(`${api}/posts/${postId}`, { headers })
    .then(res => res.json())
    .then(post => {
      post['createdOn'] = timestampToDate(post['timestamp']);
      return post;
    })

export const voteOnPost = (postId, voteOption) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({option: voteOption})
    }).then(res => res.json())
    .then(post => {
      post['createdOn'] = timestampToDate(post['timestamp']);
      return post;
    })

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
  }).then(res => res.json())

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
