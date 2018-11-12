import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';
import { FormControl, Button, Alert } from 'react-bootstrap';
import Axios from 'axios';

class Edit extends Component {

  state = {
    article: {
      body: '',
      title: '',
      timeCreated: '',
      idArticle: ''
    },
    noTitle: false,
    noBody: false,
    // restrict certain actions for new articles
    new: false
  }

  changeTitle = (event) => {
    this.setState({article: Object.assign(this.state.article, {title: event.target.value})})
  };

  changeBody = (event) => {
    this.setState({article: Object.assign(this.state.article, {body: event.target.value})})
  };

  // prevent empty titles and bodies
  inputValidate = () => {
    let shouldPost = true;
    
    if (this.state.article.body.trim() === '') {
      shouldPost = false;
      this.setState({noBody: true});
    } else {
      this.setState({noBody: false});
    }
    
    if (this.state.article.title.trim() === '') {
      shouldPost = false;
      this.setState({noTitle: true});
    } else {
      this.setState({noTitle: false});
    }

    return shouldPost;
  }

  handleNew = () => {
    let shouldPost = this.inputValidate();  

    if (shouldPost) {
      Axios.post('/api/articles', this.state.article)
      .then(() => this.props.history.push('/articles'));
    }

  };
  
  handleUpdate = () => {
    let shouldPost = this.inputValidate();

    if (shouldPost) {
      Axios.put('/api/articles', this.state.article)
      .then(() => this.props.history.push('/articles'));
    }
  };

  handleDelete = () => {
    if (this.state.article.idArticle !== '') {
      Axios.delete('/api/articles', {data: this.state.article})
      .then(() => this.props.history.push('/articles'));
    }
  };
  
  handleShare = () => {
    if (this.state.article.idArticle !== '') {
      Axios.post('/api/share', this.state.article)
      .then(() => this.props.history.push('/articles'));
    }
  };

  handleViews = () => {
    this.props.history.push(`/users?idArticle=${this.state.article.idArticle}`);
  };

  goBack = () => {
    this.props.history.push('/articles');
  };

  componentDidMount () {
    let params = new URLSearchParams(this.props.location.search);
    // fetch article if editing existing rather than creating new 
    if (params.get('idArticle')) {
      Axios.get(`/api/articles?idArticle=${params.get('idArticle')}`)
      .then(({data}) => this.setState({article: data[data.length-1]}) );
    } else {
      this.setState({new: true});
    }
  }

  render() {
    let article = this.state.article;

    return <div>
      
      {this.state.noTitle 
      && <Alert bsStyle='danger'>Article must have a title</Alert>}
      
      {this.state.noBody 
      && <Alert bsStyle='danger'>Article must have a body</Alert>}
      
      <div>
        <strong>Title:</strong>
        <FormControl
          placeholder='Title'
          value={article.title}
          type='text'
          onChange={this.changeTitle}
        />
      </div>
      
      <div>
        <strong>Body:</strong>
        <FormControl
          placeholder='Body'
          value={article.body}
          className='article-body'
          componentClass='textarea'
          onChange={this.changeBody}
        />
      </div>
      
      <div>
        <Button 
        bsStyle='primary' 
        onClick={this.handleNew}>
            Save as new article
        </Button>
        
        {/* only show if editing existing */}
        {!this.state.new &&
          <span>
          <Button 
          bsStyle='info' 
          onClick={this.handleUpdate}>
            Update existing
          </Button>
          
          <Button
          bsStyle='danger' 
          onClick={this.handleDelete}>
            Delete
          </Button>

          <Button
          bsStyle='success' 
          onClick={this.handleShare}>
            Share with all users
          </Button>

          <Button
          bsStyle='warning' 
          onClick={this.handleViews}>
            Views
          </Button>
          </span>
        }

        <Button
        onClick={this.goBack}>
          Back
        </Button>
        
      </div>
    </div>;
  }
}

export default withRouter(Edit);