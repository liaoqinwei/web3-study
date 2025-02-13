import * as fs from 'node:fs'
import * as path from 'node:path'
import * as solc from 'solc'
import { COMPILE_RESULT_PATH, CONTRACT_ROOT_PATH } from './constant'
import { getContractNameFromArgs } from './utils/contract'


const contractName = getContractNameFromArgs()

const fileName = `${contractName}.sol`


const contractPath = path.join(CONTRACT_ROOT_PATH, fileName);
const sourceCode = fs.readFileSync(contractPath, 'utf-8')


// solc compiler config
const input = {
  language: 'Solidity',
  sources: {
    [fileName]: {
      content: sourceCode,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};
// Compile the Solidity code using solc
if (!fs.existsSync(COMPILE_RESULT_PATH))
  fs.mkdirSync(COMPILE_RESULT_PATH)

const compiledCode = JSON.parse(solc.compile(JSON.stringify(input)));



const bytecode = compiledCode.contracts[fileName][contractName].evm.bytecode.object;
const bytecodePath = path.join(COMPILE_RESULT_PATH, `${contractName}.bin`)
fs.writeFileSync(bytecodePath, bytecode, { flag: 'w+', encoding: 'utf-8' })



const abi = compiledCode.contracts[fileName][contractName].abi;
const abiPath = path.join(COMPILE_RESULT_PATH, `${contractName}.abi`)
fs.writeFileSync(abiPath, JSON.stringify(abi), { flag: 'w+', encoding: 'utf-8' })

console.log('compile complete....  😀😀😀😀😀')
