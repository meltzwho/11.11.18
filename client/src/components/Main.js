import React, { Component } from 'react';
import { Route, Switch, withRouter, NavLink} from 'react-router-dom';
import {Navbar, Nav, NavItem} from 'react-bootstrap';
import Users from './Users';
import Articles from './Articles';
import Edit from './Edit';

class Main extends Component {
  render() {
    return <div>
      <Navbar>
        <Nav>
          <NavItem>
            <NavLink activekey={1} to='/users'>
              Users
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink activekey={2} to='/articles'>
              Articles
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
      <Switch>
        <Route exact path='/users' component={() => <Users />}/>
        <Route exact path='/articles' component={() => <Articles />}/>
        <Route exact path='/edit' component={() => <Edit />}/>
      </Switch>
    </div>;
  }
}

export default withRouter(Main);