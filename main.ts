import * as path from 'node:path'
import Web3 from 'web3'
import * as fs from 'node:fs'

const contractName = 'SimpleStorage'
const binPath = path.join(__dirname, `__compiler/${contractName}.bin`)
const abiPath = path.join(__dirname, `__compiler/${contractName}.abi`)
const CAPath = path.join(__dirname, `__ca`)

if (!fs.existsSync(CAPath))
  fs.mkdirSync(CAPath)


const bytecode = fs.readFileSync(binPath).toString()
const abi = JSON.parse(fs.readFileSync(abiPath).toString())

const web3 = new Web3('http://127.0.0.1:8545')

const contract = new web3.eth.Contract(abi)

contract.handleRevert = true

async function deploy() {
  const providersAccounts = await web3.eth.getAccounts();
  const defaultAccount = providersAccounts[0];

  const contractDeployer = contract.deploy({
    data: '0x' + bytecode,
    arguments: [1],
  });


  const gas = await contractDeployer.estimateGas({
    from: defaultAccount,
  });
  console.log('Estimated gas:', gas);


  try {
    const tx = await contractDeployer.send({
      from: defaultAccount,
      gas: gas.toString(),
      gasPrice: '10000000000',
    });
    console.log('Contract deployed at address: ' + tx.options.address);

    const deployedAddressPath = path.join(CAPath, contractName);
    fs.writeFileSync(deployedAddressPath, tx.options.address);
  } catch (error) {
    console.error(error);
  }
}


async function interact() {
  const deployedAddressPath = path.join(CAPath, contractName);
  const deployedAddress = fs.readFileSync(deployedAddressPath, 'utf8');
  const myContract = new web3.eth.Contract(abi, deployedAddress);
  myContract.handleRevert = true;

  const providersAccounts = await web3.eth.getAccounts();
  const defaultAccount = providersAccounts[0];


  try {
    const val = await myContract.methods.get().call() as bigint;
    console.log('val:', val)
    const receipt = await myContract.methods.set(val + 1n).send({
      from: defaultAccount,
      gas: '1000000',
      gasPrice: '10000000000',
    })
    console.log('receipt:', receipt)
    const newVal = await myContract.methods.get().call() as number;
    console.log('newVal:', newVal)

  } catch (error) {
    console.error(error)
  }



}

interact()

// deploy()

/* 
web3.eth
  .getChainId()
  .then(result => {
    console.log('Chain ID: ' + result);
  })
  .catch(error => {
    console.error(error);
  });
*/