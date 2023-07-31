interface CustomButtonProps {
  btnType: 'button' | 'submit' | 'reset';
  title: string;
  handleClick?: () => void;
  styles?: string;
}

const CustomButton = ({
  btnType,
  title,
  handleClick,
  styles,
}: CustomButtonProps) => {
  return (
    <button
      type={btnType}
      className={`font-epilogue font-semibold text-[16px] leading-[26px] min-h-[52px] px-4 rounded-[10px] bg-primary dark:bg-[#58E6D9] text-light dark:text-dark ${styles}`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default CustomButton;
