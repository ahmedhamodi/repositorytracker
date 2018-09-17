import React, { Component } from 'react';
import { Header } from './Header';
import { Search } from './Search';
import { Favourites } from './Favourites';

class App extends Component {
  constructor() {
    super();
    
    this.searchRef = React.createRef();
    this.favouritesRef = React.createRef();
  }

  render() {
    return (
      <div className="column-flex">
        <Header />
        <div className="row-flex">
          <div className="flex">
            <Search addRepo={repo => this.favouritesRef.current.addRepo(repo)} ref={this.searchRef} />
          </div>
          <div className="flex">
            <Favourites removeRepo={repo => this.searchRef.current.unfavouriteRepo(repo)} ref={this.favouritesRef} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
