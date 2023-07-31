import { create } from 'zustand';
import { Contract, Event, ethers } from 'ethers';

interface CryptoStarterStore {
  loaded: boolean;
  contract: Contract | {};
  setLoaded: (loaded: boolean) => void;
  setContract: (contract: Contract) => void;
}

const useCryptoStarterStore = create<CryptoStarterStore>((set) => ({
  loaded: false,
  contract: {},
  setLoaded: (loaded) => set(() => ({ loaded })),
  setContract: (contract) => set(() => ({ contract })),
}));

export default useCryptoStarterStore;
