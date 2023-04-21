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

  //when the input is changed, captures it and updates states
  handleChange = (e, type) => {
    this.setState({...this.state, [type]: e.target.value}); 
    console.log(e.target.value);
  }

  //When submitted, stores data to this state and updates parent component's state
  handleSubmit = (e) => {
    e.preventDefault();
    const { creditList, accountBalance, description, amount} = this.state; //initializes states

    //defines variable to update date and converts it from data object to string
    var newDate = new Date().toISOString(); 
    //defines variable to update accountBalance with
    var newBalance = (Number(accountBalance) + Number(amount)).toFixed(2);
    //defines variable to update id with by incrementing the id of the last object
    var newId = creditList[creditList.length-1].id + 1;

    //updates states
    this.setState({
      creditList : [...creditList, {
        id:newId,
        description,
        amount,
        date: newDate
      }],
      accountBalance:newBalance,
    }, () => {
      console.log(this.state); 
      //updates parent component's state
      this.props.updateCredits(this.state.creditList, this.state.accountBalance);
    });
  }

  // Render the list of Credit items and a form to input new Credit item
  render() {
    const { creditList, accountBalance } = this.state;
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