import Web3 from 'web3';

const web3 = new Web3('http://127.0.0.1:8545')

const account = web3.eth.accounts.privateKeyToAccount('0x672d16f401e4b19b919ed27ce10b55046d6d436e513cc6c26602823619ad20c1')

const signature = account.sign('Hello, Web3.js!');

