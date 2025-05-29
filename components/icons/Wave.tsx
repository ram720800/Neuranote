const Wave = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="36"
    height="36"
    viewBox="0 0 24 24"
    className={className}
  >
    <defs>
      <linearGradient id="myGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ef4444" />
        <stop offset="100%" stopColor="#f59e0b" />
      </linearGradient>
    </defs>
    <path
      fill="url(#myGradient)"
      fillRule="evenodd"
      d="M9.25 21.75c-.41 0-.75-.34-.75-.75V3c0-.41.34-.75.75-.75s.75.34.75.75v18c0 .41-.34.75-.75.75m-3-4c-.41 0-.75-.34-.75-.75V7c0-.41.34-.75.75-.75S7 6.59 7 7v10c0 .41-.34.75-.75.75m5.25.25c0 .41.34.75.75.75s.75-.34.75-.75V6c0-.41-.34-.75-.75-.75s-.75.34-.75.75zm3.75-2.25c-.41 0-.75-.34-.75-.75V9c0-.41.34-.75.75-.75s.75.34.75.75v6c0 .41-.34.75-.75.75M17.5 17c0 .41.34.75.75.75s.75-.34.75-.75V7c0-.41-.34-.75-.75-.75s-.75.34-.75.75zm3.75-3.25c-.41 0-.75-.34-.75-.75v-2c0-.41.34-.75.75-.75s.75.34.75.75v2c0 .41-.34.75-.75.75M2.5 13c0 .41.34.75.75.75S4 13.41 4 13v-2c0-.41-.34-.75-.75-.75s-.75.34-.75.75z"
      color="currentColor"
    />
  </svg>
);

export default Wave;
