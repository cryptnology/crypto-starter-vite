import { abi } from '../src/out/CryptoStarter.sol/CryptoStarter.json';
import { transactions as localTransactions } from './broadcast/DeployCryptoStarter.s.sol/31337/run-latest.json';

enum Chains {
  'Localhost' = 31337,
  'Sepolia' = 11155111,
}

export const config = (chainId: number) => {
  switch (chainId) {
    case Chains.Localhost:
      return {
        contractAddress: localTransactions[0].contractAddress,
        contractAbi: abi,
      };

    default:
      break;
  }
};
