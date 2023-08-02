import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Container, NavBar, SideBar } from './components';
import { CampaignDetails, CreateCampaign, Home, Profile } from './pages';
import {
  loadAccount,
  loadNetwork,
  loadProvider,
  useUserStore,
  loadContract,
  useCryptoStarterStore,
  subscribeToEvents,
  loadCampaigns,
} from './store';
import { config } from './config';

const App = () => {
  const { setProvider, setChainId, setAccount, setBalance } = useUserStore();
  const { setCampaigns, setContract, setLoaded } = useCryptoStarterStore();

  const loadBlockchainData = async () => {
    const provider = loadProvider(setProvider);
    const chainId = await loadNetwork(provider, setChainId);

    // Reload page when network changes
    // @ts-ignore
    window.ethereum.on('chainChanged', () => {
      window.location.reload();
    });

    // Fetch current account & balance from Metamask when changed
    // @ts-ignore
    window.ethereum.on('accountsChanged', () => {
      loadAccount(provider, setAccount, setBalance);
    });

    const { contractAddress, contractAbi } = config(chainId);

    if (!contractAddress && !contractAbi) return;

    const contract = await loadContract(
      provider,
      contractAddress,
      setContract,
      setLoaded,
      contractAbi,
    );

    loadCampaigns(contract, setCampaigns);

    subscribeToEvents(contract, setCampaigns, provider, setAccount, setBalance);
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  return (
    <Container className="relative font-epilogue dark:text-light text-dark bg-light dark:bg-dark min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
        <SideBar />
      </div>
      <div className="flex-1 mx-auto">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route
            path="/campaign-details/campaign/:id"
            element={<CampaignDetails />}
          />
        </Routes>
      </div>
    </Container>
  );
};

export default App;
