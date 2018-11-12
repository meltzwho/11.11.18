import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Article extends Component {

  editArticle = () => {
    // switch to edit route with active article
    this.props.history.push(`/edit?idArticle=${this.props.article.idArticle}`)
  }

  render() {
    return <li>
      <span className='article' onClick={this.editArticle}>
        {this.props.article.title} {this.props.article.timeCreated}
      </span>
    </li>;
  }
}

export default withRouter(Article);