
import React from 'react';
import { cn } from '../../lib/utils';

interface SynergyScoreProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SynergyScore: React.FC<SynergyScoreProps> = ({ score, size = 'md', className }) => {
  const sizeConfig = {
    sm: { radius: 18, stroke: 3, textSize: 'text-xs' },
    md: { radius: 28, stroke: 4, textSize: 'text-lg' },
    lg: { radius: 48, stroke: 6, textSize: 'text-2xl' },
  };

  const { radius, stroke, textSize } = sizeConfig[size];
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  const getColor = (s: number) => {
    if (s >= 85) return 'text-green-500';
    if (s >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const colorClass = getColor(score);

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      <svg
        height={radius * 2}
        width={radius * 2}
        className="-rotate-90"
      >
        <circle
          className="text-neutral-200"
          strokeWidth={stroke}
          stroke="currentColor"
          fill="transparent"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          className={cn('transition-all duration-1000 ease-out', colorClass)}
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset }}
          stroke="currentColor"
          fill="transparent"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          strokeLinecap="round"
        />
      </svg>
      <span className={cn('absolute font-bold', textSize, colorClass)}>
        {score}
      </span>
    </div>
  );
};

export default SynergyScore;
