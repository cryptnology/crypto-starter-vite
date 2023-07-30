interface Props {
  className?: string;
  color?: string;
}

const Logo = ({ className, color, ...rest }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={24}
    fill="none"
    {...rest}
    className={`w-full h-auto ${className}`}
  >
    <path
      fill="url(#a)"
      d="M3.186 9.235c-1.337-2.344-.599-5.308 1.65-6.622C7.084 1.3 9.99 2.135 11.328 4.478l5.87 10.287c1.338 2.344.599 5.308-1.65 6.622-2.248 1.313-5.155.478-6.492-1.866L3.186 9.236Z"
    />
    <path
      fill="url(#b)"
      d="M27.235 6.692c0 2.631-2.1 4.765-4.691 4.765-2.591 0-4.692-2.134-4.692-4.765 0-2.632 2.1-4.766 4.692-4.766 2.59 0 4.69 2.134 4.69 4.766Z"
    />
    <defs>
      <linearGradient
        id="a"
        x1={4.836}
        x2={15.441}
        y1={2.613}
        y2={21.002}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor={color} />
        <stop offset={1} stopColor={color} />
      </linearGradient>
      <linearGradient
        id="b"
        x1={22.544}
        x2={22.52}
        y1={1.926}
        y2={11.286}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor={color} />
        <stop offset={1} stopColor={color} />
      </linearGradient>
    </defs>
  </svg>
);

export default Logo;
