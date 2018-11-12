import React, { Component } from 'react';
import { Route, Switch, withRouter} from 'react-router-dom';
import {Panel, Well} from 'react-bootstrap';
import Shared from './Shared';
import Main from './Main';
import '../styles/index.less';


class App extends Component {

  render() {
    return (
      <Panel className='container'>
        <Panel.Body>
          <Well>
            <Switch>
              {/* shared route is for users viewing an article */}
              {/* since there is no auth for simplicity shared doesn't have a navbar */}
              {/* while all other routes will have a navbar */}
              <Route path='/shared' component={() => <Shared />}/>
              <Route path='/' component={() => <Main />}/>
            </Switch>
          </Well>
        </Panel.Body>
      </Panel>
    );
  }
}

export default withRouter(App);