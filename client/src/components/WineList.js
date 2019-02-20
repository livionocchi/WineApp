import React, { Component } from 'react';
import WineDetails from './WineDetails';
import AddBottle from './AddBottle';
// This is the binder
import { graphql } from 'react-apollo';
import { winesQuery } from './Queries.js';

class WineList extends Component {

  state = {
    wineId: null,
    filteredWines: null,
    active: false
  }

  displayWine = () => {
    let data = this.props.data;
    if(data.loading === true) {
      return (
        <center>
          <div>Wines are loading...</div>
        </center>
      )
    } else if (!data.loading && this.state.filteredWines !== null) {
      return this.state.filteredWines.map((fw) =>{
        if(fw.color === 'red') {
          return (<li className='singleWine red' onClick={ this.getWineId } key={ fw.id } id={ fw.id }>{ fw.name }</li>)
        } else {
            return(<li className='singleWine white' onClick={ this.getWineId } key={ fw.id } id={ fw.id }>{ fw.name }</li>)
        }
      })
    } else {
      let alphOrder = data.wines.sort((a, b) => {
        let textA = a.name.toUpperCase();
        let textB = b.name.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });

      return alphOrder.map((w) => {
          if(w.color === 'red') {
            return(<li className='singleWine red' onClick={ this.getWineId } key={ w.id } id={ w.id }>{ w.name }</li>)
          } else {
            return(<li className='singleWine white' onClick={ this.getWineId } key={ w.id } id={ w.id }>{ w.name }</li>)
          }
      })
    }
  }

  filterWines = (e) => {
    let input = e.target.value;
    let filteredWines = this.props.data.wines;
    filteredWines = filteredWines.filter((w) => {
      let wineName = w.name.toLowerCase();
      return wineName.indexOf(
        input.toLowerCase()) !== -1
    })
    this.setState({
      filteredWines
    });
  }

  getWineId = (e) => {
    if (this.state.wineId === null) {
      this.setState({
        wineId: e.target.id,
        active: !this.state.active
      })
    } else {
      this.setState({
        wineId: null,
        active: !this.state.active
      })
    }
  }

  render() {
    let wineDets = ['wine-details'];
    if(this.state.active) {
      wineDets.push('visible');
    }
    return (
      <div className="main">
        <div className="field" id="searchbar">
          <input type="text" placeholder="search a wine" onChange={ this.filterWines }/>
          <div>
            <div id="line"></div>
          </div>

        </div>
        <ul className='wine-list'>
          { this.displayWine() }
        </ul>
        <div className={ wineDets.join(' ') }  >
          <div id="close-btn" onClick={ this.getWineId }>close</div>
          <WineDetails wineId={this.state.wineId} />
          <p>add a new bottle</p>
          <AddBottle wineId={this.state.wineId} />
        </div>
      </div>
    );
  }
}

export default graphql(winesQuery)(WineList);
