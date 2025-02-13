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
  const minter = providersAccounts[0]
  const defaultAccount = providersAccounts[1];


  // 造币
  // console.log(await contract.methods.mint(defaultAccount, 200).send({
  //   from: minter,
  //   gas: '1000000',
  //   gasPrice: '10000000000',
  // }))


  // 转账
  // console.log(await contract.methods.send(defaultAccount, 50).send({
  //   from: minter,
  //   gas: '1000000',
  //   gasPrice: '10000000000',
  // }))

  // 查询币
  console.log(await contract.methods.balances(defaultAccount).call())



}