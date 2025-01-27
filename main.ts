import { interactWithCoin } from "./interact/interactWithCoin";
import { interactWithSimpleStorage } from "./interact/interactWithSimpleStorage";
import { getContractNameFromArgs } from "./utils/contract";

const name = getContractNameFromArgs()
const interactMap = {
  SimpleStorage: interactWithSimpleStorage,
  Coin: interactWithCoin
}


if (interactMap[name]) {
  interactMap[name]()
}

