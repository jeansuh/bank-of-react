/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';
import React, { Component } from 'react';

class Debits extends Component {
  constructor (props) {
    super(props);
    this.state = {
      description: '', //Initializes states that will be used in debitList
      amount : '',
      date: '',
      debitList:this.props.debitList,
      accountBalance:this.props.accountBalance //initializes using props
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
    const { debitList, accountBalance, description, amount} = this.state;

    //defines variable to update date and converts it from data object to string
    var newDate = new Date().toISOString();
    //defines variable to update accountBalance with
    var newBalance = (Number(accountBalance) - Number(amount)).toFixed(2);
    //defines variable to update id with by incrementing the id of the last object
    var newId = debitList[debitList.length-1].id + 1;

    //updates states
    this.setState({
      debitList : [...debitList, {
        id:newId,
        description,
        amount,
        date:newDate
      }],
      accountBalance:newBalance,
    }, () => {
      console.log(this.state); 
      //updates parent component's state
      this.props.updateDebits(this.state.debitList, this.state.accountBalance);
    });

  }
  // Render the list of Debit items and a form to input new Debit item
  render() {
    const { debitList, accountBalance } = this.state;
    return(
      <div>
          <h1>Debits</h1>
          <ul>
            {debitList.map((debit) =>
              <li style={{listStyle:'none'}}>{`${debit.description} : ${debit.amount} ${debit.date.slice(0,10)}`} </li>)}
          </ul>
          <div>Account balance : {`${accountBalance}`}</div>
          <form onSubmit={this.handleSubmit}>
              <input type="text" value={this.state.description} onChange={(e) => {this.handleChange(e, "description")}} ref="description" />
              <input type="text" value={this.state.amount} onChange={(e) => {this.handleChange(e, "amount")}} ref="amount" />
            <button>Add Debit</button>
          </form>
          <Link to='/'>Return to Home</Link>
      </div>
    )
  }
}

export default Debits;