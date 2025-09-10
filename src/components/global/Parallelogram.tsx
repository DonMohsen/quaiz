import { HTMLAttributes } from "react";

interface ParallelogramProps extends HTMLAttributes<SVGElement> {
  width?: number;
  height?: number;
  skew?: number; // horizontal offset for top edge
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
}

export function Parallelogram({
  width = 200,
  height = 100,
  skew = 40,
  stroke = "black",
  strokeWidth = 2,
  fill = "transparent",
  className,
  ...props
}: ParallelogramProps) {
  // Points: top-left, top-right, bottom-right, bottom-left
  const points = `${skew},0 ${width},0 ${width - skew},${height} 0,${height}`;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      {...props} // allow event handlers, etc.
    >
      <polygon
        points={points}
        fill={fill}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    </svg>
  );
}
