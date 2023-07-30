interface Props {
  className?: string;
  color?: string;
}

const Dashboard = ({ className, color, ...rest }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...rest}
    className={`w-full h-auto ${className}`}
  >
    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M1 4.5C1 1.875 1.028 1 4.5 1S8 1.875 8 4.5 8.011 8 4.5 8 1 7.125 1 4.5ZM12 4.5c0-2.625.028-3.5 3.5-3.5s3.5.875 3.5 3.5.011 3.5-3.5 3.5S12 7.125 12 4.5ZM1 15.5c0-2.625.028-3.5 3.5-3.5s3.5.875 3.5 3.5.011 3.5-3.5 3.5S1 18.125 1 15.5ZM12 15.5c0-2.625.028-3.5 3.5-3.5s3.5.875 3.5 3.5.011 3.5-3.5 3.5-3.5-.875-3.5-3.5Z"
      clipRule="evenodd"
    />
  </svg>
);

export default Dashboard;
