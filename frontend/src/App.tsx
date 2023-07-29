import { ConnectWallet } from '@thirdweb-dev/react';
import { ToggleThemeButton } from './components';

const App = () => {
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
