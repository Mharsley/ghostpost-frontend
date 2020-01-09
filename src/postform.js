import React, { Component } from "react";

class PostView extends Component {
  state = { title: "", description: "", boast: "false" };

  handlePost = e => {
    //   e.preventDefault();
      fetch('http://127.0.0.1:8000/api/post/',
      {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(this.state),
      })
      .then(response => response.json()).catch(e => console.log(e))
  };

  handleChange = e => {
    let value = "";
    if (e.target.name === "boast") {
      if (e.target.value === "true") {
        value = "false";
      } else if (e.target.value === "false") {
        value = "true";
      }
      this.setState({ [e.target.name]: value });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }

    console.log({ [e.target.name]: e.target.value });
    console.log(this.state);
  };
  handleboast = e => {
    this.setState({ boast: !this.state.boast });
  };

  render() {
    return (
      <div className="view">
        <form onSubmit={this.handlePost}>
          <label>
            Title:
            <input type="text" name="title" onChange={this.handleChange} />
          </label>

          <label>
            Discription:
            <input
              type="text"
              name="description"
              onChange={this.handleChange}
            />
          </label>

          <label>
            boast:
            <input
              name="boast"
              type="checkbox"
              onChange={this.handleChange}
              value={this.state.boast === "true"}
              //    checked={this.state.boast==="false"}
              // onChange={this.handleInputChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default PostView;
