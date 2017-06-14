import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import NavContainer from '../containers/NavContainer';
import AppBarTopContainer from './AppBarTopContainer';

const paperStyle = {
  width: '100%',
  marginBottom: '100px'
}

export default class App extends Component {

  render() {

    return (
      <div>
        <AppBarTopContainer />
        <Paper style={paperStyle}>
          {this.props.children}
        </Paper>
        <NavContainer />
      </div>
    );
  }
}
