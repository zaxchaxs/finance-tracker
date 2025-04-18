import { cn } from '@/lib/utils';
import React, { ReactNode } from 'react';

const titleStyles = {
  h1: 'text-xl sm:text-2xl font-bold',
  h2: 'text-lg sm:text-xl font-semibold sm:font-bold',
  h3: 'text-base sm:text-lg font-semibold',
  h4: 'text-base sm:text-m font-semibold',
  
};

type PropsType = {
  variant?: "h1" | "h2" | "h3" | "h4",
  children: ReactNode,
  className?: string
  ref?: string;
}

const TitleSection = ({ variant = "h3", children, className, ref }: PropsType) => {
  const Tag = variant;
  return <Tag ref={ref} className={cn(`font-title text-primary`, titleStyles[variant], className)}>{children}</Tag>;
};

export default TitleSection;
