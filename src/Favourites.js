import React, { Component } from 'react';
import { Repos } from './Repos';
import './App.css';

export class Favourites extends Component {
  constructor() {
    super();

    this.state = {
      repos: []
    };
  }

  addRepo = (repo) => {
    this.setState(prevState => ({ repos: [...prevState.repos, repo] }));
  }

  removeRepo = (repo, index) => {
    const new_repos = this.state.repos.slice();
    new_repos.splice(index, 1);
    this.setState({ repos: new_repos });
    this.props.removeRepo(repo);
  }

  render() {
    return (
      <div className="favourites">
        <Repos
          repos={this.state.repos}
          showEmptyMessage={true}
          showActionButton={() => true}
          emptyMessage="No favourites to show."
          repoAction={this.removeRepo}
          actionLabel="Remove"
        />
      </div>
    );
  }
}
