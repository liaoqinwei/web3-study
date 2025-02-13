import Web3 from 'web3';


const web3 = new Web3('http://127.0.0.1:8545')


const wallet = web3.eth.accounts.wallet.create(1);


console.log(wallet)

const signature = wallet[0].sign('Hello, Web3.js!');


console.log(signature);
