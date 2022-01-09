require('chai')
    .use(require('chai-as-promised'))
    .should();
const web3 = require('web3');

const Tether = artifacts.require('Tether');
const Reward = artifacts.require('Reward');
const DecentralBank = artifacts.require('DecentralBank');

contract('DecentralBank', ([owner, customer]) => { // owner = accounts[0]   customer = accounts[1]
    let tether, reward, decentralBank, name;

    const toWei = amount => {
        return web3.utils.toWei(amount, 'ether');
    }

    before(async () => {
        // Loading contracts
        tether = await Tether.new();
        reward = await Reward.new();
        decentralBank = await DecentralBank.new(reward.address, tether.address);

        // Transfering one million Reward Tokens to Decentral Bank
        await reward.transfer(decentralBank.address, toWei('1000000'));

        // Transfering 100 mTether to customer
        await tether.transfer(customer, toWei('100'), {from: owner});
    });

    describe('mTether Deployment', async () => {
        it('Successful name match', async () => {
            name = await tether.name();
            assert.equal(name, 'mTether');
        });
    });

    describe('Reward Token Deployment', async () => {
        it('Successful name match', async () => {
            name = await reward.name();
            assert.equal(name, 'Reward');
        });
    });

    describe('Decentral Bank Deployment', async () => {
        it('Successful name match', async () => {
            name = await decentralBank.name();
            assert.equal(name, 'Decentral Bank');
        });

        it('Tokens are available', async () => {
            const balance = await reward.balanceOf(decentralBank.address);
            assert.equal(balance, toWei('1000000'));
        });
    });
});