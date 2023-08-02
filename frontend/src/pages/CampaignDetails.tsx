import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Contract, providers } from 'ethers';

import { CountBox, CustomButton, Loader } from '../components';
import { calculateBarPercentage, daysLeft } from '../utils';
import {
  loadDonations,
  loadUserCampaigns,
  useCryptoStarterStore,
  useUserStore,
  donate,
} from '../store';

const CampaignDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [donators, setDonators] = useState<
    { donator: any; donation: string }[]
  >([]);

  const { contract, campaigns } = useCryptoStarterStore();
  const { provider, account, setDonators: setStoreDonations } = useUserStore();

  const remainingDays = daysLeft(Number(state.deadline));

  const usersCampaigns = loadUserCampaigns(campaigns, state.owner);

  const getDonations = async () => {
    const donators = await loadDonations(
      contract as Contract,
      state.id,
      setStoreDonations,
    );
    setDonators(donators);
  };

  useEffect(() => {
    let timeout = setTimeout(() => {
      if (contract) {
        getDonations();
      }
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, [account, contract]);

  const handleDonate = async () => {
    setIsLoading(true);
    await donate(
      provider as providers.Web3Provider,
      contract as Contract,
      Number(BigInt(state.id._hex)),
      Number(amount),
    );
    navigate('/');
    setIsLoading(false);
  };

  return (
    <div>
      {isLoading && <Loader />}

      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <img
            src={state.image}
            alt="campaign"
            className="w-full h-[410px] object-cover rounded-xl"
          />
          <div className="relative w-full h-[5px] bg-gray-300 dark:bg-secondaryDark mt-2">
            <div
              className="absolute h-full bg-[#58E6D9]"
              style={{
                width: `${calculateBarPercentage(
                  state.target,
                  state.amountCollected,
                )}%`,
                maxWidth: '100%',
              }}
            ></div>
          </div>
        </div>

        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
          <CountBox title="Days Left" value={remainingDays} />
          <CountBox
            title={`Raised of ${state.target}`}
            value={state.amountCollected}
          />
          <CountBox title="Total Backers" value={donators.length.toString()} />
        </div>
      </div>

      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-dark dark:text-light uppercase">
              Creator
            </h4>

            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div>
                <h4 className="font-epilogue mb-1 font-semibold text-[14px] text-[#808191] break-all">
                  {state.name}
                </h4>
                <h4 className="font-epilogue font-semibold text-[14px] text-[#808191] break-all">
                  {state.owner}
                </h4>
                <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]">
                  {usersCampaigns.length}{' '}
                  {usersCampaigns.length > 1 ? 'Campaigns' : 'Campaign'}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-dark dark:text-light uppercase">
              Story
            </h4>

            <div className="mt-[20px]">
              <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                {state.description}
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-dark dark:text-light uppercase">
              Donators
            </h4>

            <div className="mt-[20px] flex flex-col gap-4">
              {donators.length > 0 ? (
                donators.map((item, index) => (
                  <div
                    key={`${item.donator}-${index}`}
                    className="flex justify-between items-center gap-4"
                  >
                    <p className="font-epilogue font-normal text-[16px] text-[#808191]  leading-[26px] break-ll">
                      {index + 1}. {item.donator}
                    </p>
                    <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] break-ll">
                      {item.donation}
                    </p>
                  </div>
                ))
              ) : (
                <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                  No donators yet. Be the first one!
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h4 className="font-epilogue font-semibold text-[18px] text-dark dark:text-light uppercase">
            Fund
          </h4>

          <div className="mt-[20px] flex flex-col p-4 bg-light border-2 border-dark dark:bg-primaryDark dark:border-0 rounded-[10px]">
            <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-dark dark:text-[#808191]">
              Fund the campaign
            </p>
            <div className="mt-[30px]">
              <input
                type="number"
                placeholder="ETH 0.1"
                step="0.01"
                className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-2 border-dark dark:border-[#46464f] bg-transparent font-epilogue text-dark dark:text-light text-[18px] leading-[30px] placeholder:text-gray-400 dark:placeholder:text-[#4b5264] rounded-[10px]"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <div className="my-[20px] p-4 bg-primary dark:bg-dark rounded-[10px]">
                <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-light">
                  Back it because you believe in it.
                </h4>
                <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-light dark:text-[#808191]">
                  Support the project for no reward, just because it speaks to
                  you.
                </p>
              </div>

              <CustomButton
                btnType="button"
                title={
                  remainingDays === '0' ? 'Campaign Ended' : 'Fund Campaign'
                }
                styles="w-full bg-[#8c6dfd]"
                handleClick={handleDonate}
                disabled={remainingDays === '0'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
