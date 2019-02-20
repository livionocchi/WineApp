import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { winesDeatilsQuery, addBottleMutation } from './Queries.js';

class AddBottle extends Component {
  state = {
    name: null,
    producer: null,
    year: null,
    grade: null,
    wineId: null
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
      wineId: this.props.wineId
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addBottleMutation({
      variables: {
        name: this.state.name,
        producer: this.state.producer,
        year: this.state.year,
        grade: this.state.grade,
        wineId: this.state.wineId
      },
      refetchQueries: [{
        query: winesDeatilsQuery,
        variables: {
          id: this.props.wineId
        }
      }]
    })
    document.getElementById("add-bottle-form").reset();
  }

  render() {
    return (
      <form id="add-bottle-form" onSubmit={this.handleSubmit}>
        <div id="inputs">
          <div className="field">
            <input type="text" id="name" placeholder="bottle" onChange={ this.handleChange }/>
            <div>
              <div id="line"></div>
            </div>
          </div>
          <div className="field">
            <input type="text" id="producer" placeholder="producer" onChange={ this.handleChange }/>
            <div>
              <div id="line"></div>
            </div>
          </div>
          <div className="field">
            <input type="number" min="1900" max="2099" id="year" placeholder="year" onChange={ this.handleChange }/>
            <div>
              <div id="line"></div>
            </div>
          </div>
          <div className="field">
            <input type="number" min="0" max="5" id="grade" placeholder="vote the wine" onChange={ this.handleChange }/>
            <div>
              <div id="line"></div>
            </div>
          </div>
        </div>
        <button>add</button>

      </form>
    );
  }
}

export default compose(
  graphql(addBottleMutation, {name: "addBottleMutation"})
)(AddBottle);
