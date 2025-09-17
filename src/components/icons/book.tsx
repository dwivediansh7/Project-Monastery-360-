import type { SVGProps } from 'react';

export function Book(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      {...props}
    >
      <g transform="translate(10, 20) rotate(-10 90 80)">
        <rect
          x="10"
          y="10"
          width="160"
          height="160"
          rx="10"
          fill="hsl(var(--primary))"
          stroke="hsl(var(--accent))"
          strokeWidth="4"
        />
        <line
          x1="90"
          y1="10"
          x2="90"
          y2="170"
          stroke="hsl(var(--accent))"
          strokeWidth="4"
        />
        <g className="page-turn">
          <path
            d="M 90,10 Q 130,20 170,10 L 170,170 Q 130,160 90,170 Z"
            fill="hsl(var(--card))"
            stroke="hsl(var(--accent))"
            strokeWidth="2"
          />
          <text x="120" y="50" fontFamily="serif" fontSize="10">Lorem</text>
          <text x="110" y="70" fontFamily="serif" fontSize="10">ipsum</text>
          <text x="130" y="90" fontFamily="serif" fontSize="10">dolor</text>
        </g>
      </g>
      <style>
        {`
          @keyframes turn-page {
            0% { transform: perspective(1000px) rotateY(0deg); }
            50% { transform: perspective(1000px) rotateY(-160deg); }
            100% { transform: perspective(1000px) rotateY(0deg); }
          }
          .page-turn { 
            animation: turn-page 5s ease-in-out infinite; 
            transform-origin: 90px 90px;
          }
        `}
      </style>
    </svg>
  );
}
