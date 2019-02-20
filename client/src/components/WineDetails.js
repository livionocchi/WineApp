import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { winesDeatilsQuery } from './Queries.js';

class WineDetails extends Component {
  state = {
    wineDets: this.props.data.wine
  }
displayDetails = () => {
  let wineDets = this.props.data.wine;

  if(wineDets && wineDets.bottle.length === 0) {
    return (
      <div className={'bkg' + wineDets.color}>
        <p id="wine-name">{wineDets.name}</p>
        <p>{ wineDets.color } grapes from { wineDets.region }</p>
        <p>you don't have any bottle associate with this wine</p>
      </div>
    )
  } else if (wineDets && wineDets.bottle.length !== 0) {
      let orderedBottles = wineDets.bottle.sort((a, b) => {
        let yearA = a.year;
        let yearB = b.year;
        return (yearA < yearB) ? -1 : (yearA > yearB) ? 1 : 0;
      });

      let bottles = orderedBottles.map((b) => {
        return (
          <li id="bottles" key={ b.id }>
            <p>{ b.name }</p>
            <p>{ b.producer }</p>
            <p>{ b.year }</p>
            <p>{ b.grade }</p>
          </li>
        )
      })

      return(
        <div className={'bkg' + wineDets.color}>
          <p id="wine-name">{wineDets.name}</p>
          <p>{ wineDets.color } grapes from { wineDets.region }</p>
          <ul id="bottles-list">
            { bottles }
          </ul>
        </div>
      )
  }
}

  render() {
    return (
      <div className="wine-info">
        { this.displayDetails() }
      </div>
    );
  }
}

export default compose(
  graphql(winesDeatilsQuery, {
    options: (props) => {
      return {
        variables: {
          id: props.wineId
        }
      }
    }
  })
)(WineDetails);
