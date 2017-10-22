import React, { Component } from 'react';
class Comment extends Component {
	onCommentUpvote = (e, comment) => {
		e.preventDefault();
		console.log("You upvoted comment " + comment.id)
	}
	onCommentDownvote = (e, comment) => {
		e.preventDefault();
		console.log("You downvoted comment " + comment.id)
	}
	render() {
		const {comment} = this.props;
		return (
			<div className="comment">
                <div className="media">
                  <div className="author">
                  	{comment.author}
                  </div>
                  <div className="comment-body">
                    <div>{comment.body}</div>
                    <span className="anchor-time">{comment.createdOn}</span>
                  </div>
                </div>
                <section className="comment-footer">
                   <div>
                        <ul className="list-unstyled">
                            <li>
                            	<a href="#" onClick={(e) => this.onCommentDownvote(e, comment)}><i className="glyphicon glyphicon-thumbs-down"></i> </a>
                            	{comment.voteScore}
                            	<a href="#" onClick={(e) => this.onCommentUpvote(e, comment)}> <i className="glyphicon glyphicon-thumbs-up"></i></a>
                            </li>
                        </ul>
                   </div>
                </section>
           </div>
		);
	}
}
export default Comment;