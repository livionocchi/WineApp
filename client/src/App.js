import React, { Component } from 'react';
import WineList from './components/WineList';
//import AddWine from './components/AddWine';
// Apollo is what brings GraphQL to the client-side alive
import ApolloClient from 'apollo-boost';
// It wraps the React app and allows you to access it from anywhere in your component tree
import { ApolloProvider } from 'react-apollo';

// Tells to the client where to find the graphiql tool
const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
})

class App extends Component {
  render() {
    return (
      <div>
        <ApolloProvider client={client}>
          <div className="header">
            <a href="/"><div id="logo"></div></a>
          </div>

          <WineList wines={ this.props.wines } />
          {/* <AddWine /> */}
        </ApolloProvider>
        <div className="tools">
          <div className="toolIcon"></div>
          <div className="toolIcon"></div>
          <div className="toolIcon"></div>
          <div className="toolIcon"></div>
        </div>
      </div>
    );
  }
}

export default App;
