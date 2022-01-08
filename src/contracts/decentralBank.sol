// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import './reward.sol';
import './tether.sol';

contract DecentralBank {
    string public name = 'Decentral Bank';
    address public owner;
    Tether public tether;
    Reward public reward;

    constructor(Reward _reward, Tether _tether) {
        reward = _reward;
        tether = _tether;
    }
}