import { create } from 'zustand';
import { providers } from 'ethers';

interface UserStore {
  provider: providers.Web3Provider | {};
  chainId: number | null;
  account: string | '';
  balance: string | '';
  campaigns: [];
  donators: [];
  setProvider: (provider: providers.Web3Provider) => void;
  setChainId: (chainId: number) => void;
  setAccount: (account: string) => void;
  setBalance: (balance: string) => void;
  setCampaigns: (campaigns: []) => void;
  setDonators: (donators: []) => void;
}

const useUserStore = create<UserStore>((set) => ({
  provider: {},
  chainId: null,
  account: '',
  balance: '',
  campaigns: [],
  donators: [],
  setProvider: (provider) => set(() => ({ provider })),
  setChainId: (chainId) => set(() => ({ chainId })),
  setAccount: (account) => set(() => ({ account })),
  setBalance: (balance) => set(() => ({ balance })),
  setCampaigns: (campaigns) => set(() => ({ campaigns })),
  setDonators: (donators) => set(() => ({ donators })),
}));

export default useUserStore;
