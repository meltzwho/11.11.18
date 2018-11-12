import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';
import {Table} from 'react-bootstrap';

import Axios from 'axios';

class Users extends Component {

  // maintain list of users
  // sometimes show only users a particular article was shared with
  state = {
    users: [],
    article: {},
    showViews: false
  }

  componentDidMount () {
    // pull idArticle from query string if present
    let params = new URLSearchParams(this.props.location.search);
    let idArticle = params.get('idArticle');

    // fetch user list (possibly for specified article)
    Axios.get(`/api/users?idArticle=${idArticle}`)
    .then(({data}) => this.setState({users: data}));
   
    // if article specific user list
    // fetch article info
    if ( idArticle ) {
      Axios.get(`/api/articles?idArticle=${idArticle}`)
      .then(({data}) => this.setState({
        article: data[data.length-1],
        showViews: true
      }));
    }
  
  }

  render() {
    // map each user to table row
    let tableData = this.state.users.map((user, idx) => 
      <tr key={idx}>
        <td>{user.idUser}</td>
        <td>{user.email}</td>
        {/* conditionally show users viewStatus for specific article */}
        {this.state.showViews && <td>{user.viewStatus}</td>}
      </tr>
    );

    return <div>
      {/* conditionally show heading for article being viewed */}
      {this.state.showViews && <h1>Viewer status for: {this.state.article.title} {this.state.article.timeCreated}</h1>}
      
      <Table>
        <thead>
          <tr>
            <th>idUser</th>
            <th>email</th>
            {/* conditionally show heading for view status */}
            {this.state.showViews && <th>view status</th>}
          </tr>
        </thead>
        <tbody>
          {tableData}
        </tbody>
      </Table>
    </div>;
  }
}

export default withRouter(Users);