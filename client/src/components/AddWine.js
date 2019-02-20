import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { addWineMutation, winesQuery } from './Queries.js';

class AddWine extends Component {
  state = {
    name: "",
    color: "",
    region: ""
  }

  b

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addWineMutation({
      variables: {
        name: this.state.name,
        color: this.state.color,
        region: this.state.region
      },
      refetchQueries: [{ query: winesQuery }]
    })
    document.getElementById("add-wine-form").reset();
  }

  render() {
    return (
      <form id="add-wine-form" onSubmit={this.handleSubmit}>
        <div className="field">
          <input type="text" id="name" placeholder="wine" onChange={ this.handleChange }/>
        </div>

        <div className="field">
          <input type="radio" id="color" name="color" value="red" onChange={ this.handleChange }/><span className="red"> RED</span>
          <input type="radio" id="color" name="color" value="white" onChange={ this.handleChange }/><span className="white">WHITE</span>
        </div>

        <div className="field">
          <input type="text" id="region" placeholder="region" onChange={ this.handleChange }/>
        </div>
        <button>+</button>

      </form>
    );
  }
}

export default compose(
  graphql(addWineMutation, {name: "addWineMutation"})
)(AddWine);
