import * as path from 'node:path'
import * as fs from 'node:fs'
import { CA_PATH, COMPILE_RESULT_PATH } from '../constant'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'



/**
 * 通过合约名称 获取对应的合约编译文件
 * @param contractName 合约名称
 * @returns 
 */
export const getCompiledContractContent = (contractName) => {
  const binPath = path.join(COMPILE_RESULT_PATH, `${contractName}.bin`)
  const abiPath = path.join(COMPILE_RESULT_PATH, `${contractName}.abi`)

  if (!fs.existsSync(CA_PATH))
    fs.mkdirSync(CA_PATH)

  const bytecode = fs.readFileSync(binPath).toString()
  const abi = JSON.parse(fs.readFileSync(abiPath).toString())

  return { bytecode, abi }
}

export const getCAByContractName = (contractName) => {
  const deployedAddressPath = path.join(CA_PATH, contractName);
  const deployedAddress = fs.readFileSync(deployedAddressPath, 'utf8');

  return deployedAddress
}


export const getContractNameFromArgs = () => {
  const argv = yargs(hideBin(process.argv)).argv as any
  const contractName = argv.name as string

  return contractName
}