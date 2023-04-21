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

  handleChange = (e, type) => {
    this.setState({...this.state, [type]: e.target.value}); 
    console.log(e.target.value);
  }

  render() {
    return (
        <div>
          <h1>Credits</h1>
          <ul>
            {creditList.map((credit) =>
              <li style={{listStyle:'none'}}>{`${credit.description} : ${credit.amount} ${credit.date.slice(0,10)}`} </li>)}
          </ul>
          <div>Account balance : {`${accountBalance}`}</div>
          <form onSubmit={this.handleSubmit}>
              <input type="text" value={this.state.description} onChange={(e) => {this.handleChange(e, "description")}} ref="description" />
              <input type="text" value={this.state.amount} onChange={(e) => {this.handleChange(e, "amount")}} ref="amount" />
            <button>Add Credit</button>
          </form>
          <Link to='/'>Return to Home</Link>
        </div>
    )
  }

}

export default Credits;