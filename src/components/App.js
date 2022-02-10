import React, { Component } from 'react';
import web3 from 'web3';

import Tether from '../truffle_abis/Tether.json';
import Navbar from './Navbar';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            account: '0x023e333ca3',
            tether: {},
            reward: {},
            decentralBank: {},
            tetherBalance: '0',
            rewardBalance: '0',
            stakingBalance: '0',
            isLoading: true
        }
    }

    async UNSAFE_componentWillMount() {
        await this.loadWeb3();
        await this.loadBlockchainData();
    }

    async loadWeb3() {
        if(window.ethereum) {
            window.web3 = new web3(window.ethereum);
            await window.ethereum.enable();
        } else if(window.web3) {
            window.web3 = new web3(window.web3.currentProvider);
        } else {
            winsow.alert('No Ethereum (ETH) browser detected. Check Metamask!');
        }
    }

    async loadBlockchainData() {
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        const networkID = await web3.eth.net.getId();

        // Load Tether contract
        const tetherData = Tether.networks[networkID];
        let tether = {};
        let tetherBalance = 0;
        if(tetherData) {
            tether = {... new web3.eth.Contract(Tether.abi, tetherData.address)};
            tetherBalance = await tether.methods.balanceOf(this.state.account).call();
        } else {
            window.alert('ERROR: no there contract detected.');
        }

        this.setState({
            account: accounts[0] || '0x023e333ca3',
            tether,
            tetherBalance: tetherBalance.toString()
        });
    }

    render() {
        return (
            <div>
                <Navbar account={this.state.account} />
                <div className='text-center'>
                    <h1></h1>
                </div>
            </div>
        )
    }



}

export default App;