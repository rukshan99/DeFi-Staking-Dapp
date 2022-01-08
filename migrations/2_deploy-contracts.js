const Tether = artifacts.require('Tether');
const Reward = artifacts.require('Reward');
const DecentralBank = artifacts.require('DecentralBank');

module.exports = async function(deployer, network, accounts) {
    await deployer.deploy(Tether);
    const tether = await Tether.deployed()

    await deployer.deploy(Reward);
    const rwd = await RWD.deployed();

    await deployer.deploy(DecentralBank);
    const decentralBank = await DecentralBank.deployed();

    await rwd.transfer(decentralBank.address, '1000000000000000000000000');

    await tether.transfer(accounts[1], '100000000000000000000');
}