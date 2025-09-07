// CircularProgressBar.tsx
import React from "react";

interface CircularProgressBarProps {
  value: number;
  max: number;
  color: string;
  size?: number; // default 120px
  strokeWidth?: number; // default 12px
  textColor?:string
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  value,
  max,
  color,
  textColor,
  size = 120,
  strokeWidth = 12,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(Math.max(value / max, 0), 1); // 0 to 1
  const strokeDashoffset = circumference * (1 - percentage);
function lightenColor(color: string, percent: number) {
  const num = parseInt(color.replace("#", ""), 16);
  const r = Math.min(255, ((num >> 16) & 0xff) + (255 * percent) / 100);
  const g = Math.min(255, ((num >> 8) & 0xff) + (255 * percent) / 100);
  const b = Math.min(255, (num & 0xff) + (255 * percent) / 100);
  return `rgb(${r}, ${g}, ${b})`;
}

const lighterColor = lightenColor(color, 40);

  return (
    <svg width={size} height={size}>
      <defs>
      <linearGradient id="gradient" x1="100%" y1="0%" x2="0%" y2="0%">
  <stop offset="10%" stopColor={lighterColor} />
  <stop offset="50%" stopColor={color} />
    <stop offset="100%" stopColor={lighterColor} />

</linearGradient>

      </defs>

      {/* Background Circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#e6e6e6"
        strokeWidth={strokeWidth}
        fill="none"
      />

      {/* Progress Circle */}
     <circle
  cx={size / 2}
  cy={size / 2}
  r={radius}
  stroke={color} // just the color based on percentage
  strokeWidth={strokeWidth}
  fill="none"
  strokeDasharray={circumference}
  strokeDashoffset={strokeDashoffset}
  strokeLinecap="round"
  transform={`rotate(-90 ${size / 2} ${size / 2})`}
/>


      {/* Percentage Text */}
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize={size * 0.2}
        fontWeight="bold"
        fill={textColor||'black'}
        className="translate-y-[1px]"
      >
        {Math.round(percentage * 100)}%
      </text>
    </svg>
  );
};

export default CircularProgressBar;
