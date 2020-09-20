import React from 'react';
import logo from './logo.svg';
import './App.css';

import { getAccount, getBalance } from './utils/ontology';
import Wallet from './components/Wallet';

const accounts = process.env.REACT_APP_ACCOUNTS.split(",");

console.log('accounts', accounts);

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      account: ''
    }
  }

  async componentDidMount() {
    var account = await getAccount();
//    var balance = await getBalance(account);

//    var balance1 = await getBalance(account1);
//    var balance2 = await getBalance(account2);

    var accountData = [];

    for(var i = 0; i < accounts.length; i++) {
      var account = accounts[i];
      var balance = await getBalance(account);
      accountData[i] = {[account]: balance};
    }

    console.log('accountData', accountData);

    var netWorth = [];

    var balanceONT = 0;
    var balanceONG = 0;
    var balanceWING = 0;

    for(var i = 0; i < accountData.length; i++) {
      var account = accountData[i];
      console.log('account', account);
      for(const key in account) {
        console.log(i, 'key', key);
        console.log(i, 'balance', account[key]);
        console.log(i, 'balance_ont', account[key]['ONG']);
        balanceONT += Number(account[key]['ONT']);
        balanceONG += Number(account[key]['ONG']);
        balanceWING += Number(account[key]['WING']);
      }
    }
//    var ONT = Number(balance1['ONT']) + Number(balance2['ONT']);
//    var ONG = Number(balance1['ONG']) + Number(balance2['ONG']);
//    var WING = Number(balance1['WING']) + Number(balance2['WING']);


    this.setState({
      ONT: balanceONT,
      ONG: balanceONG,
      WING: balanceWING
    })
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Net Worth
          </p>
          <p>ONT: {this.state.ONT}</p>
          <p>ONG: {this.state.ONG}</p>
          <p>WING: {this.state.WING}</p>

          <div>
            {accounts.map(account => {
              return <Wallet key={account} account={account}/>;
            })}
          </div>

        </header>
      </div>
    );
  }
}
