import { BigNumber, Contract, Event, ethers, providers } from 'ethers';

interface Form {
  name: string;
  title: string;
  description: string;
  target: BigNumber;
  deadline: number;
  image: string;
}

export const loadProvider = (
  setProvider: (provider: providers.Web3Provider) => void,
) => {
  // @ts-ignore
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  setProvider(provider);

  return provider;
};

export const loadNetwork = async (
  provider: providers.Web3Provider,
  setChainId: (chainId: number) => void,
) => {
  const { chainId } = await provider.getNetwork();
  setChainId(chainId);

  return chainId;
};

export const loadAccount = async (
  provider: providers.Web3Provider,
  setAccount: (account: string) => void,
  setBalance: (balance: string) => void,
) => {
  // @ts-ignore
  const accounts = await window.ethereum.request({
    method: 'eth_requestAccounts',
  });
  const account = ethers.utils.getAddress(accounts[0]);
  setAccount(account);

  const balance = await provider.getBalance(account);
  const formattedBalance = ethers.utils.formatEther(balance);
  setBalance(formattedBalance);

  return { account, balance };
};

export const loadContract = async (
  provider: providers.Web3Provider,
  address: string,
  setContract: (contract: Contract) => void,
  setLoaded: (loaded: boolean) => void,
  contractABI: Contract['interface'],
) => {
  const cryptoStarter = new ethers.Contract(address, contractABI, provider);

  setContract(cryptoStarter);
  setLoaded(true);

  return cryptoStarter;
};

export const createCampaign = async (
  provider: providers.Web3Provider,
  cryptoStarter: Contract,
  account: string,
  form: Form,
) => {
  let transaction;
  try {
    const signer = provider.getSigner();

    const { name, title, description, target, deadline, image } = form;

    transaction = await cryptoStarter
      .connect(signer)
      .createCampaign(
        account,
        name,
        title,
        description,
        target,
        deadline,
        image,
      ),  { gasLimit: 3000000 };

    await transaction.wait();

  } catch (error) {
    console.log(error);
  }
};
