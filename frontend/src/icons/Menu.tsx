interface Props {
  className?: string;
  color?: string;
}

const Menu = ({ className, color, ...rest }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={14}
    fill="none"
    {...rest}
    className={`w-full h-auto ${className}`}
  >
    <path
      fill={color}
      d="M0 8.4h20V5.6H0v2.8ZM0 14h20v-2.8H0V14ZM0 2.8h20V0H0v2.8Z"
    />
  </svg>
);

export default Menu;
