
import React, { Component } from 'react';
import { BrowserRouter as Router, NavLink, Route, Switch} from "react-router-dom";
import PostForm from "./postform";
import Post from "./Post"

class App extends Component {
  state = {
    post: [],
    display: [],
  };

  async componentDidMount() {
    try {
      const res = await fetch('http://127.0.0.1:8000/api/post/');
      const post = await res.json();
      this.setState({
        post: post,
        display: post,
        sort: post
      });
    } catch (e) {
      console.log(e);
    }
  }

  handleRoasts = event => {
    const todosupdate= this.state.post.filter(i=>i.boast===false)
    this.setState({display:todosupdate});
  };
  handleBoasts = event => {
    const todosupdate= this.state.post.filter(i=>i.boast===true)
    this.setState({display:todosupdate});
  };
  handleDefault = event => {
    const post=this.state.post
    this.setState({display:post});
  };
  handlesort = event => {
    const todosupdate= this.state.display.sort(function (a, b) {
      return b.likes - a.likes;
    });
    this.setState({display:todosupdate});
  };
  handlesortdate = event => {
    const todosupdate= this.state.display.sort(function(a,b){
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(b.date) - new Date(a.date);
    });
    this.setState({display:todosupdate});
  };

  render() {
    
    return (
      <Router>
        <div>
        <p><NavLink exact to ="/" activeClassName="selected">home</NavLink></p>
        <p><NavLink exact to ="/post" activeClassName="selected">add a post</NavLink> </p>
        <Switch>
          <Route exact path="/" render={() => 

            <React.Fragment>
          <button onClick={this.handleRoasts}>Roasts</button>
          <button onClick={this.handleBoasts}>boasts</button>
          <button onClick={this.handleDefault}>both</button>
          <button onClick={this.handlesort}>sort likes</button>
          <button onClick={this.handlesortdate}>sort dates</button>

          {this.state.display.map(item => (
            // <div key={item.id}>
            //   <h1>{item.title}</h1>
            //   <p>{item.description}</p>
            //   <p>{item.date}</p>
            //   <p>{item.likes}</p>
            //   <button>like</button>
            //   <button>dislike</button>

            // </div>
            <Post post={item} />
          ))}
          </React.Fragment>
        }/>

        <Route exact path="/post" render={() => 
            <PostForm />
        } />

        </Switch>
        </div>
      </Router>
    );
  }
}

export default App;