import { cn } from '@/lib/utils';
import React, { useRef, useId } from 'react';

type FeatureType = {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  description: string;
};

type FeatureCardPorps = React.ComponentProps<'div'> & {
  feature: FeatureType;
};

export function FeatureCard({ feature, className, ...props }: FeatureCardPorps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const p = genRandomPattern();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleMouseEnter = () => {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty('--mouse-x', '50%');
    cardRef.current.style.setProperty('--mouse-y', '50%');
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        'group relative overflow-hidden p-6 bg-black rounded-lg shadow-[0_0_4px_rgba(255,255,255,0.02)] hover:shadow-[0_0_8px_rgba(255,255,255,0.05)] transition-shadow duration-300',
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      {...props}
    >
      <div className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full [mask-image:linear-gradient(white,transparent)]">
        <div className="from-white/5 to-white/1 absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] opacity-100">
          {/* Dim lines */}
          <GridLines
            width={20}
            height={20}
            x="-12"
            y="4"
            className="fill-none stroke-white/10 absolute inset-0 h-full w-full mix-blend-overlay group-hover:opacity-0 transition-opacity duration-300"
          />
          {/* Bright lines with spotlight mask and slight scale */}
          <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div 
              className="absolute inset-0 scale-[1.05] [mask-image:radial-gradient(circle_250px_at_var(--mouse-x)_var(--mouse-y),white_0%,transparent_70%)] [transform-origin:var(--mouse-x)_var(--mouse-y)]"
            >
              <GridLines
                width={20}
                height={20}
                x="-12"
                y="4"
                className="fill-none stroke-white/90 absolute inset-0 h-full w-full mix-blend-overlay filter drop-shadow-[0_0_2px_rgba(255,255,255,0.5)]"
              />
            </div>
          </div>
          {/* Black squares */}
          {/* <GridSquares
            width={20}
            height={20}
            x="-12"
            y="4"
            squares={p}
            className="absolute inset-0 h-full w-full"
          /> */}
        </div>
      </div>
      <feature.icon className="text-gray-300 size-6" strokeWidth={1} aria-hidden />
      <h3 className="mt-10 text-sm md:text-base text-white">{feature.title}</h3>
      <p className="text-gray-400 relative z-20 mt-2 text-xs font-light">
        {feature.description}
      </p>
    </div>
  );
}

type GridLinesProps = React.ComponentProps<'svg'> & {
  width: number;
  height: number;
  x: string;
  y: string;
};

function GridLines({ width, height, x, y, ...props }: GridLinesProps) {
  const patternId = useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
    </svg>
  );
}

type GridSquaresProps = React.ComponentProps<'svg'> & {
  width: number;
  height: number;
  x: string;
  y: string;
  squares?: number[][];
};

function GridSquares({ width, height, x, y, squares, ...props }: GridSquaresProps) {
  return (
    <svg x={x} y={y} className="overflow-visible" aria-hidden="true" {...props}>
      {squares?.map(([ix, iy], index) => (
        <rect
          key={index}
          width={width + 1}
          height={height + 1}
          x={ix * width}
          y={iy * height}
          fill="black"
          strokeWidth="0"
        />
      ))}
    </svg>
  );
}

function genRandomPattern(length?: number): number[][] {
  length = length ?? 5;
  return Array.from({ length }, () => [
    Math.floor(Math.random() * 4) + 7, // random x between 7 and 10
    Math.floor(Math.random() * 6) + 1, // random y between 1 and 6
  ]);
}