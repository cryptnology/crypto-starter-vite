import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from 'next-themes';
import { useUserStore, loadAccount } from '../store';
import { providers } from 'ethers';

import { CustomButton } from './';
import { search } from '../assets';
import { navlinks } from '../constants';
import { Menu, Profile } from '../icons';

const NavBar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('dashboard');
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { theme } = useTheme();
  const { provider, account, setAccount, setBalance } = useUserStore();

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-light border-2 border-dark dark:bg-primaryDark dark:border-0 rounded-[100px]">
        <input
          type="text"
          placeholder="Search for campaigns"
          className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-gray-400 dark:placeholder:text-[#4b5264] text-dark dark:text-light bg-transparent outline-none"
        />

        <div className="w-[72px] h-full rounded-[20px] bg-primary dark:bg-[#58E6D9] flex justify-center items-center cursor-pointer">
          <img
            src={search}
            alt="search"
            className="w-[15px] h-[15px] dark:invert object-contain"
          />
        </div>
      </div>

      <div className="sm:flex hidden flex-row justify-end gap-4">
        <CustomButton
          btnType="button"
          title={account ? 'Create a campaign' : 'Connect'}
          handleClick={() => {
            if (account) navigate('create-campaign');
            else
              loadAccount(
                provider as providers.Web3Provider,
                setAccount,
                setBalance,
              );
          }}
        />

        <Link to="/profile">
          <div className="w-[52px] h-[52px] rounded-[10px] bg-light border-2 border-dark dark:bg-secondaryDark dark:border-0 flex justify-center items-center cursor-pointer">
            <div>
              <Profile color={`${theme == 'light' ? '#755BB4' : '#58E6D9'}`} />
            </div>
          </div>
        </Link>
      </div>

      {/* Small screen navigation */}
      <div className="sm:hidden flex justify-between items-center relative">
        <div onClick={() => setToggleDrawer((prev) => !prev)}>
          <Menu color={`${theme == 'light' ? '#755BB4' : '#58E6D9'}`} />
        </div>
        <div className="w-[48px] h-[48px] rounded-[10px] bg-light border-2 border-dark dark:bg-secondaryDark dark:border-0 flex justify-center items-center">
          <div>
            <Profile color={`${theme == 'light' ? '#755BB4' : '#58E6D9'}`} />
          </div>
        </div>

        <div
          className={`absolute top-[60px] right-0 left-0 rounded-[10px] bg-light border-2 border-dark dark:bg-secondaryDark dark:border-0 z-10 py-4 ${
            !toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-0'
          } transition-all duration-700`}
        >
          <ul className="mb-4">
            {navlinks.map((link) => (
              <li
                key={link.name}
                className={`flex rounded-[10px] p-4 ${
                  isActive === link.name && 'bg-primary dark:bg-[#3a3a43]'
                }`}
                onClick={() => {
                  setIsActive(link.name);
                  setToggleDrawer(false);
                  navigate(link.link);
                }}
              >
                {isActive === link.name ? (
                  <div>
                    <link.icon
                      color={`${theme == 'light' ? '#f1f2f9' : '#58E6D9'}`}
                    />
                  </div>
                ) : (
                  <div>
                    <link.icon
                      color={`${theme == 'light' ? '#0d121d' : '#f1f2f9'}`}
                    />
                  </div>
                )}
                <p
                  className={`ml-[20px] font-epilogue capitalize font-semibold text-[14px] ${
                    isActive === link.name
                      ? 'text-light dark:text-[#58E6D9]'
                      : 'text-[#808191]'
                  }`}
                >
                  {link.name}
                </p>
              </li>
            ))}
          </ul>

          <div className="flex mx-4">
            <CustomButton
              btnType="button"
              title={account ? 'Create a campaign' : 'Connect'}
              handleClick={() => {
                if (account) navigate('create-campaign');
                else
                  loadAccount(
                    provider as providers.Web3Provider,
                    setAccount,
                    setBalance,
                  );
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
