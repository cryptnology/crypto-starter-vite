interface CountBoxProps {
  title: string;
  value: string;
}

const CountBox = ({ title, value }: CountBoxProps) => {
  return (
    <div className="flex flex-col items-center w-[150px]">
      <h4 className="font-epilogue font-bold text-[30px] text-light p-3 bg-primary border-2 border-dark dark:bg-primaryDark dark:border-0 rounded-t-[10px] w-full text-center truncate">
        {value}
      </h4>
      <p className="font-epilogue font-normal text-[16px] text-dark dark:text-[#808191] bg-light border-2 border-t-0 border-dark dark:bg-secondaryDark dark:border-0 px-3 py-2 w-full rounded-b-[10px] text-center">
        {title}
      </p>
    </div>
  );
};

export default CountBox;
