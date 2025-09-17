import type { SVGProps } from 'react';

export function Globe(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      {...props}
    >
      <defs>
        <radialGradient id="globe-gradient" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="hsl(var(--primary))" />
          <stop offset="100%" stopColor="hsl(var(--accent))" />
        </radialGradient>
      </defs>
      <g transform="translate(100,100)">
        <circle r="90" fill="url(#globe-gradient)" />
        <path
          d="M-80,0 a80,80 0 0,1 160,0 a80,80 0 0,1 -160,0"
          stroke="hsla(var(--primary-foreground), 0.2)"
          fill="none"
          strokeWidth="2"
        />
        <path
          d="M0,-80 a80,80 0 0,1 0,160 a80,80 0 0,1 0,-160"
          stroke="hsla(var(--primary-foreground), 0.2)"
          fill="none"
          strokeWidth="2"
        />
        <path
          d="M-56.57,-56.57 a80,80 0 0,1 113.14,0 a80,80 0 0,1 -113.14,0"
          stroke="hsla(var(--primary-foreground), 0.2)"
          fill="none"
          strokeWidth="2"
          transform="rotate(45)"
        />
        <path
          d="M-56.57,-56.57 a80,80 0 0,1 113.14,0 a80,80 0 0,1 -113.14,0"
          stroke="hsla(var(--primary-foreground), 0.2)"
          fill="none"
          strokeWidth="2"
          transform="rotate(-45)"
        />
      </g>
      <style>
        {`
          @keyframes rotate {
            0% { transform: translate(100px,100px) rotate(0deg); }
            100% { transform: translate(100px,100px) rotate(360deg); }
          }
          g { animation: rotate 20s linear infinite; }
        `}
      </style>
    </svg>
  );
}
