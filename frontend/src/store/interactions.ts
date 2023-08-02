import { BigNumber, Contract, ethers, providers } from 'ethers';

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

export const loadCampaigns = async (
  cryptoStarter: Contract,
  setCampaigns: (campaigns: []) => void,
) => {
  const campaigns = await cryptoStarter.getCampaigns();
  setCampaigns(campaigns);

  return campaigns;
};

export const loadDonations = async (
  cryptoStarter: Contract,
  id: number,
  setDonators: (donators: []) => void,
) => {
  const donations = await cryptoStarter.getDonators(id);
  setDonators(donations);

  const numberOfDonations = donations[0].length;

  const parsedDonations = [];

  for (let i = 0; i < numberOfDonations; i++) {
    parsedDonations.push({
      donator: donations[0][i],
      donation: ethers.utils.formatEther(donations[1][i].toString()),
    });
  }

  return parsedDonations;
};

export const loadUserCampaigns = (campaigns: [], account: string) => {
  const filteredCampaigns = campaigns.filter(
    // @ts-ignore
    (campaign) => campaign.owner === account,
  );

  return filteredCampaigns;
};

export const donate = async (
  provider: providers.Web3Provider,
  cryptoStarter: Contract,
  id: number,
  amount: number,
) => {
  let transaction;

  try {
    const signer = provider.getSigner();

    (transaction = await cryptoStarter.connect(signer).donateToCampaign(id, {
      value: ethers.utils.parseEther(amount.toString()),
    })),
      { gasLimit: 3000000 };

    await transaction.wait();
  } catch (error) {
    console.log(error);
  }
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

    (transaction = await cryptoStarter
      .connect(signer)
      .createCampaign(
        account,
        name,
        title,
        description,
        target,
        deadline,
        image,
      )),
      { gasLimit: 3000000 };

    await transaction.wait();
  } catch (error) {
    console.log(error);
  }
};

export const subscribeToEvents = (
  cryptoStarter: Contract,
  setCampaigns: (campaigns: []) => void,
  provider: providers.Web3Provider,
  setAccount: (account: string) => void,
  setBalance: (balance: string) => void,
) => {
  cryptoStarter.on('CreatedCampaign', () => {
    loadCampaigns(cryptoStarter, setCampaigns);
    loadAccount(provider, setAccount, setBalance);
  });
};
