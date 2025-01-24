import * as solc from 'solc'
import * as path from 'node:path'
import * as fs from 'node:fs'

const contractRootPath = path.join(__dirname, 'contract')
const compileResultPath = path.join(__dirname, '__compiler')


const contractName = 'SimpleStorage'
const fileName = `${contractName}.sol`


const contractPath = path.join(contractRootPath, fileName);
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
if (!fs.existsSync(compileResultPath))
  fs.mkdirSync(compileResultPath)

const compiledCode = JSON.parse(solc.compile(JSON.stringify(input)));



const bytecode = compiledCode.contracts[fileName][contractName].evm.bytecode.object;
const bytecodePath = path.join(compileResultPath, `${contractName}.bin`)
fs.writeFileSync(bytecodePath, bytecode, { flag: 'w+', encoding: 'utf-8' })



const abi = compiledCode.contracts[fileName][contractName].abi;
const abiPath = path.join(compileResultPath, `${contractName}.abi`)
fs.writeFileSync(abiPath, JSON.stringify(abi), { flag: 'w+', encoding: 'utf-8' })

console.log('compile complete....  😀😀😀😀😀')
