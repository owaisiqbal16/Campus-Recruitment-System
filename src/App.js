import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import {checkLoggedIn} from './store/actions/authActions';

import Navbar from './components/Navbar/Navbar';
import MyRoutes from './Routes';

import './App.css';


class App extends Component {

  componentDidMount() {
    this.userSignedIn();
  }

  userSignedIn = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    // console.log(user)
    if(user) {
      this.props.checkLoggedIn(user , this.props.history)
    }
  }


  render() {
    let routes = MyRoutes(this.props.status)
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div>{routes}</div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    status : state.auth.status
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkLoggedIn : user => dispatch(checkLoggedIn(user))
  }
}

export default connect(mapStateToProps , mapDispatchToProps)(App);
