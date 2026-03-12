import React from 'react';

type IconProps = {
  size?: number;
  color?: string;
  className?: string;
};

export const MicrosoftLogo: React.FC<IconProps> = ({ size = 40, className }) => {
  const s = size;
  const box = s / 2.5;
  const gap = s * 0.02;
  return (
    <svg
      width={s}
      height={s}
      viewBox={`0 0 ${s} ${s}`}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <rect x={0} y={0} width={box} height={box} rx={3} fill="#F35325" />
      <rect x={box + gap} y={0} width={box} height={box} rx={3} fill="#81BC06" />
      <rect x={0} y={box + gap} width={box} height={box} rx={3} fill="#05A6F0" />
      <rect x={box + gap} y={box + gap} width={box} height={box} rx={3} fill="#FFBA08" />
    </svg>
  );
};
