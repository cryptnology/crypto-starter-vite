import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useTheme } from 'next-themes';

import FundCard from './FundCard';
import { Loader } from '../icons';

interface DisplayCampaignsProps {
  title: string;
  isLoading: boolean;
  campaigns: any[];
}

const DisplayCampaigns = ({
  title,
  isLoading,
  campaigns,
}: DisplayCampaignsProps) => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleNavigate = (campaign: { id: string }) => {
    navigate(`/campaign-details/campaign/${Number(campaign.id) + 1}`, {
      state: campaign,
    });
  };

  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-dark dark:text-light text-left">
        {title} ({campaigns.length})
      </h1>

      <div className="flex justify-center xl:justify-normal flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <div className="w-[100px] h-[100px] object-contain">
            <Loader color={`${theme === 'dark' ? '#58E6D9' : '#755BB4'}`} />
          </div>
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any campaigns yet
          </p>
        )}

        {!isLoading &&
          campaigns.length > 0 &&
          campaigns.map((campaign) => (
            <FundCard
              key={uuidv4()}
              {...campaign}
              handleClick={() => handleNavigate(campaign)}
            />
          ))}
      </div>
    </div>
  );
};

export default DisplayCampaigns;
