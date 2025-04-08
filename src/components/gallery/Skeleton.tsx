import React from 'react';
import './styles/skeleton.css';

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '200px',
  borderRadius = '8px'
}) => {
  return (
    <div 
      className="skeleton-pulse"
      style={{ 
        width, 
        height, 
        borderRadius,
      }}
    />
  );
};