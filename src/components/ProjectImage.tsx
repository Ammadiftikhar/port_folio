import React, { useState } from 'react';

interface ProjectImageProps {
  src: string;
  alt: string;
  name: string;
  className?: string;
}

/**
 * Renders a project screenshot, gracefully falling back to a branded
 * gradient placeholder (with the project initials) when the image is
 * missing or fails to load.
 */
const ProjectImage: React.FC<ProjectImageProps> = ({ src, alt, name, className }) => {
  const [failed, setFailed] = useState(false);

  const initials = name
    .split(' ')
    .map((word) => word[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-grape via-candy to-sun ${className ?? ''}`}
        role="img"
        aria-label={alt}
      >
        <span className="font-display text-5xl font-extrabold tracking-tight text-white/95">{initials}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
};

export default ProjectImage;
