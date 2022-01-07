const Tether = artifacts.require('Tether');
const Reward = artifacts.require('Reward');
const DecentralBank = artifacts.require('DecentralBank');

module.exports = async function(deployer) {
    await deployer.deploy(Tether);
    await deployer.deploy(Reward);
    await deployer.deploy(DecentralBank);
}