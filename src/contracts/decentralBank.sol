// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "./reward.sol";
import "./tether.sol";

contract DecentralBank {
    string public name = "Decentral Bank";
    address public owner;
    Tether public tether;
    Reward public reward;

    address[] public stakers;

    mapping(address => uint256) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(Reward _reward, Tether _tether) {
        reward = _reward;
        tether = _tether;
        owner = msg.sender;
    }

    function depositTokens(uint256 _amount) public {
        tether.transferFrom(msg.sender, address(this), _amount);
        stakingBalance[msg.sender] += _amount;

        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
            hasStaked[msg.sender] = true;
        }

        isStaking[msg.sender] = true;
    }

    function issueTokens() public {
        require(msg.sender == owner, "Caller must be the owner");
        for(uint i=0; i<stakers.length; i++) {
            address recipient = stakers[i];
            uint balance = stakingBalance[recipient];
            if(balance > 0) {
                reward.transfer(recipient, balance/10); // 10% reward tokens from the total amount of staking will be issued
            }
        }
    }

    function unstakeTokens() public {
        uint balance = stakingBalance[msg.sender];
        require(balance > 0, "staking balance should be more than zero");

        tether.transfer(msg.sender, balance);
        stakingBalance[msg.sender] = 0;
        isStaking[msg.sender] = false;
    }
}
