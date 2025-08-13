import React, { useState, useEffect } from 'react';

interface IconLoaderProps {
  iconName: string;
  className?: string;
  size?: number;
  fallback?: React.ReactNode;
}

const IconLoader: React.FC<IconLoaderProps> = ({ 
  iconName, 
  className = "", 
  size = 24, 
  fallback = <div className="animate-pulse bg-gray-200 rounded" style={{ width: size, height: size }} />
}) => {
  const [IconComponent, setIconComponent] = useState<React.ComponentType<any> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadIcon = async () => {
      try {
        // Add a small delay to prevent resource exhaustion
        await new Promise(resolve => setTimeout(resolve, 10));
        
        const lucideModule = await import('lucide-react');
        const Icon = (lucideModule as any)[iconName];
        if (Icon && typeof Icon === 'function') {
          setIconComponent(() => Icon);
        }
      } catch (error) {
        console.warn(`Failed to load icon: ${iconName}`, error);
      } finally {
        setLoading(false);
      }
    };

    loadIcon();
  }, [iconName]);

  if (loading) {
    return <>{fallback}</>;
  }

  if (!IconComponent) {
    return <div className={`text-gray-400 ${className}`} style={{ width: size, height: size }} />;
  }

  return <IconComponent className={className} size={size} />;
};

export default IconLoader; 