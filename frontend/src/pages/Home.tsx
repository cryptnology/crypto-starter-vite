import { useEffect, useState } from 'react';

import { useCryptoStarterStore, useUserStore } from '../store';
import { DisplayCampaigns } from '../components';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { campaigns, contract } = useCryptoStarterStore();
  const { account } = useUserStore();

  useEffect(() => {
    if (!contract && !campaigns) return;
    setIsLoading(true);
    if (campaigns) setIsLoading(false);
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
