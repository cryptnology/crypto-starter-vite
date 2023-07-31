import { Contract } from 'ethers';
import { abi } from '../src/out/CryptoStarter.sol/CryptoStarter.json';
import { transactions as localTransactions } from './broadcast/DeployCryptoStarter.s.sol/31337/run-latest.json';

enum Chains {
  'Localhost' = 31337,
  'Sepolia' = 11155111,
}

export const config = (
  chainId: number,
): { contractAddress: string; contractAbi: Contract['interface'] } => {
  const contractAddress =
    chainId === Chains.Localhost ? localTransactions[0].contractAddress : '';

  return {
    contractAddress,
    // @ts-ignore
    contractAbi: abi,
  };
};
