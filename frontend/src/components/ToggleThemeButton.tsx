import { useTheme } from 'next-themes';
import { Moon, Sun } from '../icons';

interface Props {
  className?: string;
}

const ToggleThemeButton = ({ className }: Props) => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className={`${className} cursor-default lg:cursor-pointer`}
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      {theme === 'light' ? (
        <Sun
          className="bg-[#f1f2f9]"
          color={`${theme == 'light' ? '#755BB4' : '#58E6D9'}`}
        />
      ) : (
        <Moon
          className="bg-[#2c2f32]"
          color={`${theme == 'light' ? '#755BB4' : '#58E6D9'}`}
        />
      )}
    </button>
  );
};

export default ToggleThemeButton;
