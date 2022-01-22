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
        await tether.transfer(customer, toWei('100'), { from: owner });
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

    describe('Yield Farming', async () => {
        it('rewards tokens for staking', async () => {
            let result

            // Check investor balance
            result = await tether.balanceOf(customer)
            assert.equal(result.toString(), toWei('100'), 'customer mock tether balance before staking')

            // Check Staking for Customer of 100 tokens
            await tether.approve(decentralBank.address, toWei('100'), { from: customer })
            await decentralBank.depositTokens(toWei('100'), { from: customer })

            // Check updated balance of Customer and make sure its 0 after staking 100 tokens--ERROR START
            result = await tether.balanceOf(customer)
            assert.equal(result.toString(), toWei('0'), 'Customer mock wallet balance after staking 100 tokens')

            // Check updated balance of decentral bank
            result = await tether.balanceOf(decentralBank.address)
            assert.equal(result.toString(), toWei('100'), 'Decentral Bank wallet balance after staking from customer')

            // Is staking update
            result = await decentralBank.isStaking[customer]
            assert.equal(result.toString(), 'true', 'Customer is staking status after staking to be true')

            // Issue toekns
            await decentralBank.issueTokens({from: owner});

            // Ensure only the owner can issue tokens
            await decentralBank.issueTokens({from: customer}).should.be.rejected;

            // Unstake tokens
            await decentralBank.unstakeTokens({from: customer});

            // Check the balances after unstaking
            result = await tether.balanceOf(customer);
            assert.equal(result.toString(), toWei('100'), 'Customer wallet balance after unstaking')
        })
    })
});