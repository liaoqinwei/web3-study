import * as fs from 'node:fs'
import * as path from 'node:path'
import Web3 from 'web3'
import { CA_PATH } from './constant'
import { getCompiledContractContent, getContractNameFromArgs } from './utils/contract'



const contractName = getContractNameFromArgs()

const {
  abi,
  bytecode
} = getCompiledContractContent(contractName)

const web3 = new Web3('http://127.0.0.1:8545')

export async function deploy() {
  const contract = new web3.eth.Contract(abi)

  contract.handleRevert = true

  const providersAccounts = await web3.eth.getAccounts();
  const defaultAccount = providersAccounts[0];

  // 0xf7f98a687ccb154f823b305fa88a09e224c7b90affaf12be43c403927aad2ab7
  // const persona = [
  //   web3.utils.utf8ToHex('Musk'),
  //   web3.utils.utf8ToHex('Biden'),
  //   web3.utils.utf8ToHex('Trump'),
  //   web3.utils.utf8ToHex('Lincoin'),
  //   web3.utils.utf8ToHex('Kennedy'),
  // ]
  const contractDeployer = contract.deploy({
    data: '0x' + bytecode,
    // arguments: [persona]
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

    const deployedAddressPath = path.join(CA_PATH, contractName);
    fs.writeFileSync(deployedAddressPath, tx.options.address);
  } catch (error) {
    console.error(error);
  }
}


deploy()