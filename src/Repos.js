import React, { Component } from 'react';
import './App.css';

export class Repos extends Component {

  load_repos = () => {
    return (
      <div className="repo">
        <div className="repo-header">
          <div className="repo-item-name">Name</div>
          <div className="repo-item-language">Language</div>
          <div className="repo-item-tag">Latest tag</div>
          <div className="repo-item-add"></div>
        </div>
        <div className="repo-body">
        { this.props.repos.map((repo, index) => (
          <div className="repo-body-item" key={repo.name}>
            <div className="repo-item repo-item-name">{repo.name}</div>
            <div className="repo-item repo-item-language">{repo.language}</div>
            <div className="repo-item repo-item-tag">{repo.latestTag}</div>
            <div className="repo-item repo-item-add">
              { this.props.showActionButton(repo, index) ? (<a className="repo-action-button" onClick={() => this.props.repoAction(repo, index)}>{this.props.actionLabel}</a>) : undefined }
            </div>
          </div>
        ))}
        </div>
      </div>
    )
  }

  no_repos = () => {
    return (
      <p>{!this.props.showEmptyMessage ? 'No repos...' : this.props.emptyMessage}</p>
    )
  }

  render() {
    return (
      this.props.repos.length > 0 ? this.load_repos() : this.no_repos()
    );
  }
}