interface CornerProps {
  className?: string;
}

export function Corner({ className }: CornerProps) {
  return (
    <svg
      className={className}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
    >
      <path d="M0 0H14" stroke="#38BDF8" strokeOpacity="0.6" strokeWidth="1.5" />
      <path d="M0 0V14" stroke="#38BDF8" strokeOpacity="0.6" strokeWidth="1.5" />
    </svg>
  );
}
