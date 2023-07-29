import { ConnectWallet } from '@thirdweb-dev/react';

const App = () => {
  return (
    <ConnectWallet
      theme="dark"
      btnTitle="Connect Wallet"
      dropdownPosition={{
        side: 'bottom', // "top" | "bottom" | "left" | "right";
        align: 'end', // "start" | "center" | "end";
      }}
    />
  );
};

export default App;
