import { useEffect, useState } from 'react';
import { Contract } from 'ethers';

import { loadCampaigns, useCryptoStarterStore, useUserStore } from '../store';
import { DisplayCampaigns } from '../components';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { contract, setCampaigns: contractSetCampaigns } =
    useCryptoStarterStore();
  const { account } = useUserStore();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await loadCampaigns(
      contract as Contract,
      contractSetCampaigns,
    );
    setCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [account, contract]);

  return (
    <DisplayCampaigns
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  );
};

export default Home;
