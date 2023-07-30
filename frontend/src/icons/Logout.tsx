interface Props {
  className?: string;
  color?: string;
}

const Logout = ({ className, color, ...rest }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...rest}
    className={`w-full h-auto ${className}`}
  >
    <path
      stroke={color}
      strokeWidth={2}
      d="M5 6.645V5.551c0-2.12 0-3.18.68-3.778.68-.597 1.73-.461 3.833-.189l7.257.94c2.491.322 3.737.483 4.483 1.332.747.85.747 2.106.747 4.618v7.052c0 2.512 0 3.768-.747 4.618-.746.85-1.992 1.01-4.483 1.333l-7.257.939c-2.102.272-3.154.408-3.833-.19C5 21.63 5 20.57 5 18.45v-.876"
    />
    <path
      fill={color}
      d="m15 12 .81-.585.423.585-.422.585L15 12ZM1 13a1 1 0 1 1 0-2v2Zm10.477-7.585 4.334 6-1.622 1.17-4.333-6 1.621-1.17Zm4.334 7.17-4.334 6-1.621-1.17 4.333-6 1.622 1.17ZM15 13H1v-2h14v2Z"
    />
  </svg>
);

export default Logout;
