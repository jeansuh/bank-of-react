/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';
import React, { Component } from 'react';

class Credits extends Component {
  constructor (props) {
    super(props);
    this.state = {
      description: '', //Initializes variables that will be used in creditList
      amount: '',
      date:'',
      creditList:this.props.creditList,
      accountBalance:this.props.accountBalance //Initializes by using props
    }
  }

  render() {
    return (
      <div>
        <h1>Credits</h1>
      </div>
    )
  }

}

export default Credits;