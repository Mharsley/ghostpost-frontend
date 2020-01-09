import React, { Component } from "react";

class Post extends Component {
//   state = { title: "", description: "", boast: "false" };
    handleUpvote = (e, id) => {
        let vote = e.target.parentNode.childNodes[3].innerHTML
        // console.log(e.target.parentNode.childNodes[3].innerHTML)
        vote = parseInt(vote, 10)
        vote +=1
        e.target.parentNode.childNodes[3].innerHTML = vote



        fetch(`http://127.0.0.1:8000/api/post/${id}/upvote`)
      .then(response => response.json()).catch(e => console.log(e))
        
        
    };

    handleDownvote = (e, id) => {
        // console.log(e.target.parentNode.childNodes[3].innerHTML)
        let vote = e.target.parentNode.childNodes[3].innerHTML
        vote = parseInt(vote, 10)
        vote -= 1
        e.target.parentNode.childNodes[3].innerHTML = vote


        fetch(`http://127.0.0.1:8000/api/post/${id}/downvote`)
        .then(response => response.json()).catch(e => console.log(e))
          
          
      };




  
  render() {
    return (
      <div key={this.props.post.id}>
            <h1 class="title">{this.props.post.title}</h1>
            <p class="description">{this.props.post.description}</p>
            <p class="date">{this.props.post.date}</p>
            <p class="likes">{this.props.post.likes}</p>
            <button onClick={e => this.handleUpvote(e,this.props.post.id)}>like</button>
            <button onClick={e=> this.handleDownvote(e,this.props.post.id)}>dislike</button>

        </div>
    );
  }
}

export default Post;
