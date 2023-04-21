/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';

let initialState={
  accountBalance:1234567.89,
  creditList:[],
  debitList:[]
};

class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      accountBalance: 1234567.89,
      creditList: [],
      debitList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      }
    };
  }

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser};
    newUser.userName = logInInfo.userName;
    this.setState({currentUser: newUser})
    this.setState(initialState);
    this.updateBalance();
  }

  //updates balance after fetching API data
  updateBalance(){
    var subtract = 0;
    var add = 0;
    this.state.creditList.forEach((credit) => {
      subtract = subtract + credit.amount;
      console.log(subtract);
    })
    this.state.debitList.forEach((debit) => {
      add = add + debit.amount;
      console.log(add);
    })
    this.setState({accountBalance:(subtract - add).toFixed(2)}, () => console.log(this.state.accountBalance));
  }

  //makes an API request and updates state
  fetchData(){
    Promise.all([fetch("https://johnnylaicode.github.io/api/credits.json"),
    fetch("https://johnnylaicode.github.io/api/debits.json")])
      .then(([r1, r2]) => {
        return Promise.all([r1.json(),r2.json()]); //saves as json format
      })
      .then(([r1,r2]) => {
        this.setState({
          creditList : r1,
          debitList: r2,
        }, () => {
          console.log(this.state.creditList , this.state.debitList);
          initialState = this.state;
          this.updateBalance(); //calls for function to update accountBalance with new credit and debit info
        })
      })
  }

  componentDidMount(){
    console.log("fetching");
    this.fetchData();
  }

  //update credit/debit list and account balance from the child components
  updateCredits = (creditInfo, balanceInfo) => {
    this.setState({creditList: creditInfo, accountBalance: balanceInfo});
  }

  updateDebits = (debitInfo, balanceInfo) => {
    this.setState({debitList: debitInfo, accountBalance: balanceInfo});
  }

  // Create Routes and React elements to be rendered using React components
  render() {  
    // Create React elements and pass input props to components
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />)
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    )
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} updateCredits={this.updateCredits} updateDebits={this.updateDebits} />)
    const CreditsComponent = () => (<Credits accountBalance = {this.state.accountBalance} creditList={this.state.creditList} updateCredits={this.updateCredits} />) 
    const DebitsComponent = () => (<Debits accountBalance = {this.state.accountBalance} debitList={this.state.debitList} updateDebits={this.updateDebits} />) 

    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename="/bank-of-react-example-code-gh-pages">
        <div>
          <Route exact path="/" render={HomeComponent}/>
          <Route exact path="/userProfile" render={UserProfileComponent}/>
          <Route exact path="/login" render={LogInComponent}/>
          <Route exact path="/credits" render={CreditsComponent}/>
          <Route exact path="/debits" render={DebitsComponent}/>
        </div>
      </Router>
    );
  }
}

export default App;