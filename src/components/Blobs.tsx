import React from 'react';

type BlobColor = 'grape' | 'candy' | 'sun' | 'mint' | 'sky2';

const colorMap: Record<BlobColor, string> = {
  grape: 'bg-grape/40 dark:bg-grape/30',
  candy: 'bg-candy/40 dark:bg-candy/25',
  sun: 'bg-sun/40 dark:bg-sun/25',
  mint: 'bg-mint/40 dark:bg-mint/25',
  sky2: 'bg-sky2/40 dark:bg-sky2/25',
};

interface BlobsProps {
  items?: { color: BlobColor; className: string }[];
}

/** Decorative animated gradient blobs. Purely visual. */
const Blobs: React.FC<BlobsProps> = ({
  items = [
    { color: 'grape', className: 'left-[-8rem] top-[-6rem] h-72 w-72' },
    { color: 'candy', className: 'right-[-6rem] top-24 h-64 w-64' },
    { color: 'sun', className: 'bottom-[-8rem] left-1/3 h-72 w-72' },
  ],
}) => (
  <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
    {items.map((b, i) => (
      <div
        key={i}
        className={`blob absolute rounded-full ${colorMap[b.color]} ${b.className} ${
          i % 2 ? 'animate-blob-slow' : 'animate-blob'
        }`}
      />
    ))}
  </div>
);

export default Blobs;
