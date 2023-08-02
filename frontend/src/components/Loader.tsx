import { useTheme } from 'next-themes';
import { Loader as LoaderIcon } from '../icons';

const Loader = () => {
  const { theme } = useTheme();
  return (
    <div className="fixed inset-0 z-10 h-screen bg-dark opacity-70 flex items-center justify-center flex-col">
      <div className="w-[100px] h-[100px] object-contain">
        <LoaderIcon color={`${theme === 'dark' ? '#58E6D9' : '#755BB4'}`} />
      </div>
      <p className="mt-[20px] font-epilogue font-bold text-[20px] text-white text-center">
        Transaction is in progress <br /> Please wait...
      </p>
    </div>
  );
};

export default Loader;
