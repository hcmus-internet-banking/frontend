type Props = {
  className?: string;
  y?: number;
};

function Spacer({ className, y }: Props) {
  return (
    <div
      className={className}
      style={{
        height: y ? `${y * 0.25}rem` : "1rem",
      }}
    />
  );
}

export default Spacer;
