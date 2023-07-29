import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThirdwebProvider, metamaskWallet } from '@thirdweb-dev/react';
import { Localhost, Sepolia } from '@thirdweb-dev/chains';

import App from './App.tsx';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <ThirdwebProvider
        activeChain={Localhost}
        supportedChains={[Localhost, Sepolia]}
        supportedWallets={[metamaskWallet()]}
        clientId={import.meta.env.VITE_THIRDWEB_CLIENT_ID as string}
      >
        <App />
      </ThirdwebProvider>
    </Router>
  </React.StrictMode>,
);
