import { useState } from 'react';

interface ArchitecturalImageProps {
  src: string;
  alt: string;
  title?: string;
  className?: string;
  imgClassName?: string;
  loading?: 'eager' | 'lazy';
}

export function ArchitecturalImage({
  src,
  alt,
  title,
  className = '',
  imgClassName = '',
  loading = 'lazy',
}: ArchitecturalImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center bg-[#21201D] text-[#EAE4D8] p-6 text-center overflow-hidden ${className}`}
        role="img"
        aria-label={alt}
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          aria-hidden="true"
          className="mb-3 text-[#9A7B4F]"
        >
          <rect x="6" y="10" width="36" height="28" stroke="currentColor" strokeWidth="1" />
          <line x1="6" y1="24" x2="42" y2="24" stroke="currentColor" strokeWidth="0.75" />
          <line x1="24" y1="10" x2="24" y2="38" stroke="currentColor" strokeWidth="0.75" />
        </svg>
        <span className="font-serif text-lg tracking-wide text-[#F6F3EC]">
          {title ?? 'Architectural Elevation'}
        </span>
        <span className="mt-1 text-xs font-mono text-[#A69F93]">{alt}</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#EAE4D8] ${className}`}>
      <img
        src={src}
        alt={alt}
        loading={loading}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className={`h-full w-full object-cover ${imgClassName}`}
      />
    </div>
  );
}
