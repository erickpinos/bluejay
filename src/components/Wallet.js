import React from 'react';

import { getAccount, getBalance } from '../utils/ontology';

export default class Wallet extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      account: ''
    }
  }

  async componentDidMount() {
    var account = this.props.account;
    var balance = await getBalance(this.props.account);

    var ONT = Number(balance['ONT']);
    var ONG = Number(balance['ONG']);
    var WING = Number(balance['WING']);

    this.setState({
      account: account,
      ONT: ONT,
      ONG: ONG,
      WING: WING
    })
  }

  render() {
    return(
      <div className="Wallet">
        <header className="App-header">
          <p>
            {this.state.account}
          </p>
          <p>ONT: {this.state.ONT}</p>
          <p>ONG: {this.state.ONG}</p>
          <p>WING: {this.state.WING}</p>
        </header>
      </div>
    );
  }
}
