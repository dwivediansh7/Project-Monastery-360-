import type { SVGProps } from 'react';

export function Calendar(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      {...props}
    >
      <rect
        x="20"
        y="30"
        width="160"
        height="140"
        rx="15"
        fill="hsl(var(--card))"
        stroke="hsl(var(--primary))"
        strokeWidth="4"
      />
      <rect
        x="20"
        y="30"
        width="160"
        height="40"
        rx="15"
        ry="15"
        fill="hsl(var(--primary))"
      />
      <text
        x="100"
        y="58"
        textAnchor="middle"
        fill="hsl(var(--primary-foreground))"
        fontSize="24"
        fontWeight="bold"
      >
        NOV
      </text>
      <g className="calendar-day">
        <circle cx="100" cy="120" r="20" fill="hsl(var(--accent))" />
        <text
          x="100"
          y="125"
          textAnchor="middle"
          fill="hsl(var(--accent-foreground))"
          fontSize="24"
          fontWeight="bold"
        >
          4
        </text>
      </g>
      <style>
        {`
          @keyframes pop-day {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
          }
          .calendar-day { 
            animation: pop-day 3s ease-in-out infinite;
            transform-origin: 100px 120px;
          }
        `}
      </style>
    </svg>
  );
}
