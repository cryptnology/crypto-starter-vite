import { ConnectWallet } from '@thirdweb-dev/react';
import { ToggleThemeButton } from './components';
import { config } from './config';

const App = () => {
  console.log(config(31337));
  return (
    <>
      <ToggleThemeButton />
      <ConnectWallet
        theme="dark"
        btnTitle="Connect Wallet"
        dropdownPosition={{
          side: 'bottom', // "top" | "bottom" | "left" | "right";
          align: 'end', // "start" | "center" | "end";
        }}
      />
    </>
  );
};

export default App;
