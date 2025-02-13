import Web3, { FMT_BYTES, FMT_NUMBER } from 'web3';


const web3 = new Web3('ws://127.0.0.1:8545/');

// Log the chain ID to the console
web3.eth
  .getChainId()
  .then(result => {
    console.log('Chain ID: ' + result);
  })
  .catch(error => {
    console.error(error);
  });

// configure default return format for the web3-eth package
// web3.eth.defaultReturnFormat = {
//   bytes: FMT_BYTES.HEX,
//   number: FMT_NUMBER.BIGINT,
// };

const transition = async () => {
  const privateKey = '0x2bd9f1fc6f90cc07ae0e59bd10fa5d9ddf0c24c4afc1c391c3ee423ec7e41ec9';

  const sender = web3.eth.accounts.wallet.add(privateKey)[0];

  const receiver = "0x87740Db6f6662d64ED38959fC0f526933AbdD110"

  console.log(
    "sender balance:",
    await web3.eth.getBalance(sender.address)
  )

  console.log(
    "sender balance:",
    await web3.eth.getBalance(receiver)
  )

  const subscription = await web3.eth.subscribe('logs')

  subscription.on('data', (data) => {
    console.log('logs:', data)
  })




  web3.eth.sendTransaction({
    from: sender.address,
    to: receiver,
    value: web3.utils.toWei('20', 'ether')
  }).on('sending', sending => {
    console.log('Sending:', sending);
  })
    .on('sent', sent => {
      console.log('Sent:', sent);
    })
    .on('transactionHash', transactionHash => {
      console.log('Transaction Hash:', transactionHash);
    })
    .on('receipt', async receipt => {
      console.log('Receipt:', receipt);

      console.log('Final sender balance:', await web3.eth.getBalance(sender.address));
      console.log('Final receiver balance:', await web3.eth.getBalance(receiver));
    })
    .on('confirmation', confirmation => {
      console.log('Confirmation:', confirmation);
      // process.exit(0);
    })
    .on('error', error => {
      console.log('Error:', error);
      // process.exit(1);
    });




  // await subscription.unsubscribe();


}

transition()