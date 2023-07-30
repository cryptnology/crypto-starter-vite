interface Props {
  className?: string;
  color?: string;
}

const CreateCampaign = ({ className, color, ...rest }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...rest}
    className={`w-full h-auto ${className}`}
  >
    <g clipPath="url(#a)">
      <path
        fill={color}
        d="M17 0a1 1 0 0 0-1 1c0 2.949-2.583 4-5 4H4a4 4 0 0 0-4 4v2a3.98 3.98 0 0 0 1.514 3.109l3.572 7.972A3.233 3.233 0 0 0 8.039 24a2.982 2.982 0 0 0 2.72-4.2l-2.2-4.8H11c2.417 0 5 1.051 5 4a1 1 0 0 0 2 0V1a1 1 0 0 0-1-1ZM8.937 20.619A.983.983 0 0 1 8.039 22a1.232 1.232 0 0 1-1.126-.734L4.105 15h2.254l2.578 5.619ZM16 14.6a7.723 7.723 0 0 0-5-1.6H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h7a7.723 7.723 0 0 0 5-1.595V14.6Zm7.9.852a1 1 0 0 1-1.342.448l-2-1a1 1 0 1 1 .894-1.79l2 1a1 1 0 0 1 .448 1.337v.005Zm-3.79-9a1 1 0 0 1 .448-1.342l2-1a1 1 0 0 1 .894 1.79l-2 1a1 1 0 0 1-1.342-.448ZM20 10a1 1 0 0 1 1-1h2a1 1 0 1 1 0 2h-2a1 1 0 0 1-1-1Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default CreateCampaign;
