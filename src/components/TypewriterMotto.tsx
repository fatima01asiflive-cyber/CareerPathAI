import React, { useEffect, useState } from 'react';

export const TypewriterMotto: React.FC = () => {
  const text = 'Discover Your Future, Build Your Path';
  const [value, setValue] = useState('');

  useEffect(() => {
    let index = 0;
    let timeout: number;
    const type = () => {
      setValue(text.slice(0, index + 1));
      index += 1;
      if (index < text.length) timeout = window.setTimeout(type, 70);
      else timeout = window.setTimeout(() => { index = 0; setValue(''); type(); }, 1800);
    };
    type();
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <div className="font-mono text-sm sm:text-base text-sky-300 min-h-6" aria-label={text}>
      {value}<span className="inline-block w-px h-4 sm:h-5 bg-sky-400 ml-1 animate-pulse align-middle" />
    </div>
  );
};
