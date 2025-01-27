import Web3 from 'web3';
import { getCAByContractName, getCompiledContractContent, getContractNameFromArgs } from '../utils/contract';

const web3 = new Web3('http://127.0.0.1:8545')


const contractName = getContractNameFromArgs()
const { abi } = getCompiledContractContent(contractName)
const deployedAddress = getCAByContractName(contractName)

export const interactWithCoin = async () => {
  const contract = new web3.eth.Contract(abi, deployedAddress)

  contract.handleRevert = true;

  const providersAccounts = await web3.eth.getAccounts();
  const defaultAccount = providersAccounts[0];

  console.log(contract.methods)
}