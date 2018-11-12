import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';
import Axios from 'axios';

class Shared extends Component {

  state = {
    article: {
      body: ''
    }
  }

  componentDidMount () {
    let params = new URLSearchParams(this.props.location.search);
    // fetch article
    Axios.get(`/api/articles?idArticle=${params.get('idArticle')}`)
    .then(({data}) => this.setState({article: data[data.length-1]}) );
    // marked that user has viewed article
    Axios.put('/api/views', {viewInfo: `${params.get('idUser')}-${params.get('idArticle')}`});
  }

  render() {
    let article = this.state.article;
    let body = article.body;
    // newlines = new p element
    body = body.split('\n');
    body = body.map((p, idx) => <p key={idx}>{p}</p>);
    
    return <div>
      <p>
        <strong>Title:</strong> 
        {article.title}
      </p>
      <p>
        <strong>Body:</strong> 
        {body}
      </p>
    </div>;
  }
}

export default withRouter(Shared);