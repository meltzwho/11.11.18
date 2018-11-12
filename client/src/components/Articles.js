import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';
import {Button} from 'react-bootstrap';
import Article from './Article';

import Axios from 'axios';

class Articles extends Component {

  state = {
    articles: []
  }

  newArticle = () => {
    // switch to edit route with inactive article
    this.props.history.push('/edit');
  };

  componentDidMount () {
    // fetch articles
    Axios.get('/api/articles')
    .then(({data}) => this.setState({articles: data}));
  }

  render() {
    // map articles from api to Article component
    let articles = this.state.articles.map( (article, idx) => {
      // skip undefined indices
      if (article) { return <Article key={idx} article={article} /> }
    });
    // newest first
    articles = articles.reverse();
    
    return <div>
      <nav>
        <h1 className='article-published'>Published articles</h1>
        <Button onClick={this.newArticle}>
          New Article
        </Button>
      </nav>
      <ul>
        {articles}
      </ul>
    </div>;
  }
}

export default withRouter(Articles);