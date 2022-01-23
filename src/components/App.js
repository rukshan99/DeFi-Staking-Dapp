import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar';

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            account: '0x023e333ca3'
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