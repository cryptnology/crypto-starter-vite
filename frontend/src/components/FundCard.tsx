import { daysLeft } from '../utils';

interface FundCardProps {
  owner: string;
  name: string;
  title: string;
  description: string;
  target: string;
  deadline: string;
  amountCollected: string;
  image: string;
  handleClick: () => void;
}

const FundCard = ({
  owner,
  name,
  title,
  description,
  target,
  deadline,
  amountCollected,
  image,
  handleClick,
}: FundCardProps) => {
  const remainingDays = daysLeft(deadline);

  return (
    <div
      className="sm:w-[288px] w-full rounded-[15px] bg-light border-2 border-dark dark:bg-primaryDark dark:border-0 cursor-pointer"
      onClick={handleClick}
    >
      <img
        src={image}
        alt="fund"
        className="w-full h-[158px] p-0.5 dark:p-0 rounded-[12px] dark:rounded-[15px]"
      />
      <div className="flex flex-col p-4">
        <div className="block">
          <h3 className="font-epilogue font-semibold text-[16px] text-dark dark:text-light text-left leading-[26px] truncate">
            {title}
          </h3>
          <p className="mt-[5px] font-epilogue font-normal text-dark dark:text-[#808191] text-left leading-[18px] truncate">
            {description}
          </p>
        </div>

        <div className="flex justify-between flex-wrap mt-[15px] gap-2">
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-dark/60 dark:text-[#b2b3bd] leading-[22px]">
              {amountCollected}
            </h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-dark dark:text-[#808191] sm:max-w-[120px] truncate">
              Raised of {target}
            </p>
          </div>
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-dark/60 dark:text-[#b2b3bd] leading-[22px]">
              {remainingDays}
            </h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-dark dark:text-[#808191] sm:max-w-[120px] truncate">
              {remainingDays === '1' ? 'Day Left' : 'Days Left'}
            </p>
          </div>
        </div>
        <div className="mt-[20px] gap-[12px]">
          <div className="flex-1 font-epilogue font-bold text-[12px] text-[#808191] truncate">
            Campaigner:{' '}
            <span className="text-dark/60 font-normal dark:text-[#b2b3bd]">
              {name}
            </span>
          </div>
          <p className="flex-1 font-epilogue font-bold text-[12px] text-[#808191] truncate">
            Address:{' '}
            <span className="text-dark/60 font-normal dark:text-[#b2b3bd]">
              {owner}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FundCard;
