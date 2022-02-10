import React, { Component } from 'react';
import web3 from 'web3';
import Navbar from './Navbar';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            account: '0x023e333ca3'
        }
    }

    async UNSAFE_componentWillMount() {
        await this.loadWeb3();
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