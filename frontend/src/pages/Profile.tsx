import { useState, useEffect } from 'react';

import { DisplayCampaigns } from '../components';
import {
  loadUserCampaigns,
  useCryptoStarterStore,
  useUserStore,
} from '../store';

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userCampaigns, setUserCampaigns] = useState([]);

  const { campaigns, contract } = useCryptoStarterStore();
  const { account } = useUserStore();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = loadUserCampaigns(campaigns, account);
    setUserCampaigns(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [account, contract]);

  return (
    <DisplayCampaigns
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={userCampaigns}
    />
  );
};

export default Profile;
