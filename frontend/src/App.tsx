import { Routes, Route } from 'react-router-dom';

import { NavBar, SideBar } from './components';
import { Home } from './pages';

const App = () => {
  return (
    <div className="relative sm:p-8 p-4 bg-light dark:bg-dark min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
        <SideBar />
      </div>
      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        {/* <NavBar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
