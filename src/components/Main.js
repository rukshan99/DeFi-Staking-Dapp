import React, { Component } from 'react';
import tether from '../tether.png';

class Main extends Component {

    render() {
        return (
            <div id='content' className='mt-3'>
                <table className='table text-muted text-center'>
                    <thead>
                        <tr style={{ color: 'white' }}>
                            <th scope='col'>Staking Balance</th>
                            <th scope='col'>Reward Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style={{ color: 'white' }}>
                            <td>{window.web3.utils.fromWei(this.props.stakingBalance, 'Ether')} mUSDT</td>
                            <td>{window.web3.utils.fromWei(this.props.rewardBalance, 'Ether')} RWD</td>
                        </tr>
                    </tbody>
                </table>
                <div className='card mb-2' style={{ opacity: '0.9' }}>
                    <form className='mb-3' onSubmit={(event) => {
                        event.preventDefault();
                        let amount = this.input.value.toString();
                        amount = window.web3.utils.toWei(amount, 'Ether');
                        this.props.stakeTokens(amount);
                    }}>
                        <div style={{ borderSpacing: '0 1em' }}>
                            <label className='float-left' style={{ marginLeft: '15px' }}><b>Stake Tokens</b></label>
                            <span className='float-right' style={{ marginRight: '8px' }}>
                                Balance: {window.web3.utils.fromWei(this.props.tetherBalance, 'Ether')}
                            </span>
                            <div className='input-group mb-4'>
                                <input type='text' placeholder='0' ref={(input) => { this.input = input }} required />
                                <div className='input-group-open'>
                                    <div className='input-group-text'>
                                        <img src={tether} alt='mtether' height='32' />
                                        &nbsp;&nbsp;&nbsp; mUSDT
                                    </div>
                                </div>
                            </div>
                            <button type='submit' className='btn btn-primary btn-lg btn-block'>DEPOSIT</button>
                        </div>
                    </form>
                    <button className='btn btn-primary btn-lg btn-block' onClick={(event) => {
                        event.preventDefault();
                        this.props.unstakeTokens();
                    }}>WITHDRAW</button>
                    <div className='card-body text-center' style={{ color: 'blue' }}>
                        AIRDROP
                    </div>
                </div>
            </div>
        )
    }

}

export default Main;