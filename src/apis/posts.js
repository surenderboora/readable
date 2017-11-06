import { api, headers } from './index'
import { timestampToDate } from '../utils'

export const getPosts = (category = '') => {
  const url = category ? `${api}/${category}/posts`: `${api}/posts`;

  return fetch(url, { headers })
    .then(res => res.json())
    .then((posts) => {
        posts.forEach((post) => {
            post['createdOn'] = timestampToDate(post['timestamp'])
        })
        return posts;
    });
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

export const updatePost = (post) =>
  fetch(`${api}/posts/${post.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  })
  .then(res => res.json())


export const getPost = (postId) =>
  fetch(`${api}/posts/${postId}`, { headers })
    .then(res => {
      if(res.status >= 200 && res.status < 300)
        return res.json()
      throw Error(res.statusText);
    })
    .then(post => {
      post['createdOn'] = timestampToDate(post['timestamp']);
      return post;
    })
    .catch((error)=> {})

export const voteOnPost = (postId, voteOption) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({option: voteOption})
  })
  .then(res => res.json())
  .then(post => {
    post['createdOn'] = timestampToDate(post['timestamp']);
    return post;
  })

export const deletePost = (postId) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(post => {
    post['createdOn'] = timestampToDate(post['timestamp']);
    return post;
  })