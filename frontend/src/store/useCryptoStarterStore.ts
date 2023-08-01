import { create } from 'zustand';
import { Contract } from 'ethers';

interface CryptoStarterStore {
  loaded: boolean;
  contract: Contract | {};
  campaigns: [];
  setLoaded: (loaded: boolean) => void;
  setContract: (contract: Contract) => void;
  setCampaigns: (campaigns: []) => void;
}

const useCryptoStarterStore = create<CryptoStarterStore>((set) => ({
  loaded: false,
  contract: {},
  campaigns: [],
  setLoaded: (loaded) => set(() => ({ loaded })),
  setContract: (contract) => set(() => ({ contract })),
  setCampaigns: (campaigns) => set(() => ({ campaigns: [...campaigns] })),
}));

export default useCryptoStarterStore;
