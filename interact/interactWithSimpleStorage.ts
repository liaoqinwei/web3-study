
import Web3 from 'web3';
import { getCAByContractName, getCompiledContractContent, getContractNameFromArgs } from '../utils/contract';

const web3 = new Web3('http://127.0.0.1:8545')


const contractName = getContractNameFromArgs()
const { abi } = getCompiledContractContent(contractName)
const deployedAddress = getCAByContractName(contractName)

export const interactWithSimpleStorage = async () => {

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