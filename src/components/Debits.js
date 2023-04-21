/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';

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

  render() {
    return(
      <div>Debits</div>
    )
  }

}

export default Debits;