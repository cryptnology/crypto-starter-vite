import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { navlinks } from '../constants';
import { ToggleThemeButton } from '.';
import { Logo } from '../icons';
import { useTheme } from 'next-themes';

interface IconProps {
  styles?: string;
  name?: string;
  children?: JSX.Element;
  disabled?: boolean;
  handleClick?: () => void;
}

const Icon = ({ styles, disabled, handleClick, children }: IconProps) => (
  <div
    className={`w-[48px] h-[48px] rounded-[10px] flex justify-center items-center ${
      !disabled && 'cursor-pointer'
    } ${styles}`}
    onClick={handleClick}
  >
    {children}
  </div>
);

const Sidebar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('dashboard');
  const { theme } = useTheme();

  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <div className="w-[52px] h-[52px] rounded-[10px] bg-light border-2 border-dark dark:bg-secondaryDark dark:border-0 flex justify-center items-center">
        <Link to="/">
          <Logo color={`${theme == 'light' ? '#755BB4' : '#58E6D9'}`} />
        </Link>
      </div>

      <div className="flex-1 flex flex-col justify-between items-center bg-light border-2 border-dark  dark:bg-primaryDark dark:border-0 rounded-[20px] w-[76px] py-4 mt-12">
        <div className="flex flex-col justify-center items-center gap-3">
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              handleClick={() => {
                if (!link.disabled) {
                  setIsActive(link.name);
                  navigate(link.link);
                }
              }}
            >
              <div className="flex justify-center items-center">
                <link.icon
                  color={`${theme == 'light' ? '#0d121d' : '#f1f2f9'}`}
                />
              </div>
            </Icon>
          ))}
        </div>
        <div className="w-[48px] h-[48px] rounded-[10px] bg-light border-2 border-dark dark:bg-secondaryDark dark:border-0 flex justify-center items-center">
          <ToggleThemeButton />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
