import React, { Component } from 'react';
import './App.css';
import { Repos } from './Repos';
import axios from 'axios';

export class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      repos_list: [],
      favorited_repos: [],
      search_performed: false
    };

    document.addEventListener('keyup', (ev) => {
      if (ev.keyCode === 13 && this.state.query.length >= 2) {
        this.search();
      }
    });
  }

  search = () => {
    axios.get(`https://api.github.com/search/repositories?q=${this.state.query}`)
      .then(response => {
        this.setState({
          query: this.state.query,
          repos_list: response.data.items.slice(0, Math.min(response.data.items.length, 10)),
          search_performed: true
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });    
  }

  searchChange = (event) => {
    const query = event.target.value;
    if (query.length === 0) {
      this.setState({ repos_list: [] });
    }
    this.setState({ query });
  }

  addRepo = (repo) => {
    this.props.addRepo(repo);
    this.favouriteRepo(repo);
  }

  favouriteRepo = (repo) => {
    this.setState(prevState => ({ favorited_repos: [...prevState.favorited_repos, repo] }));
  }

  unfavouriteRepo = (repo) => {
    const index = this.state.favorited_repos.findIndex(res => res.name === repo.name);
    const temp = this.state.favorited_repos.slice();
    temp.splice(index, 1);
    this.setState({ favorited_repos: temp });
  }

  showAddButton = (repo) => this.state.favorited_repos.findIndex(res => res.name === repo.name) === -1
  
  render() {
    const repos_list = this.state.repos_list;
    const search_performed = this.state.search_performed;
    const query = this.state.query;

    return (
      <div className="search-container">
        <div className="search">
          <input className="search-input" placeholder="Search for repositories" onChange={this.searchChange} />
          <button className="search-button" disabled={query.length < 1} onClick={this.search}>Search</button>
        </div>
        <Repos
          repos={repos_list}
          showEmptyMessage={!search_performed}
          emptyMessage="No search results to show."
          showActionButton={this.showAddButton}
          repoAction={this.addRepo}
          actionLabel="Add"
        />
      </div>  
    );
  }
}
