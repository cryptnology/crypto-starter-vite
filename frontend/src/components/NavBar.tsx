import { ConnectWallet } from '@thirdweb-dev/react';
import { ToggleThemeButton } from '.';

const NavBar = () => {
  return (
    <div>
      {' '}
      <ToggleThemeButton />
      <ConnectWallet
        theme="dark"
        btnTitle="Connect Wallet"
        dropdownPosition={{
          side: 'bottom', // "top" | "bottom" | "left" | "right";
          align: 'end', // "start" | "center" | "end";
        }}
      />
    </div>
  );
};

export default NavBar;
