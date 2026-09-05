import React from 'react';
import appLogoImg from '../assets/images/careerpath_ai_logo_1787310353450.jpg';

interface IntelliPathLogoProps {
  variant?: 'icon' | 'full' | 'stacked' | 'horizontal';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  showTagline?: boolean;
  className?: string;
  useImage?: boolean;
}

export const IntelliPathLogo: React.FC<IntelliPathLogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  showTagline = false,
  className = '',
  useImage = false,
}) => {
  const sizeMap = {
    xs: { icon: 'w-6 h-6', text: 'text-xs', tagline: 'text-[7px]', badge: 'text-[8px] px-1 py-0.2' },
    sm: { icon: 'w-8 h-8', text: 'text-sm', tagline: 'text-[8px]', badge: 'text-[9px] px-1.5 py-0.5' },
    md: { icon: 'w-10 h-10', text: 'text-base', tagline: 'text-[9px]', badge: 'text-[10px] px-1.5 py-0.5' },
    lg: { icon: 'w-12 h-12', text: 'text-xl', tagline: 'text-xs', badge: 'text-xs px-2 py-0.5' },
    xl: { icon: 'w-16 h-16', text: 'text-2xl', tagline: 'text-xs', badge: 'text-sm px-2.5 py-1' },
    '2xl': { icon: 'w-24 h-24 sm:w-28 sm:h-28', text: 'text-3xl sm:text-4xl', tagline: 'text-xs sm:text-sm', badge: 'text-lg px-3 py-1' },
    '3xl': { icon: 'w-36 h-36 sm:w-44 sm:h-44', text: 'text-4xl sm:text-5xl', tagline: 'text-sm sm:text-base', badge: 'text-xl px-4 py-1.5' },
  };

  const currentSize = sizeMap[size];

  // High fidelity vector reproducing the exact uploaded CareerPath AI artwork
  const LogoVector = (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full drop-shadow-md select-none"
    >
      <defs>
        {/* Outer Circular Gradient */}
        <linearGradient id="cArcGrad" x1="20" y1="30" x2="160" y2="180" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00b4d8" />
          <stop offset="50%" stopColor="#0077b6" />
          <stop offset="100%" stopColor="#03045e" />
        </linearGradient>

        {/* 3D Road Highway Gradient */}
        <linearGradient id="roadGrad" x1="60" y1="160" x2="140" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0077b6" />
          <stop offset="60%" stopColor="#0096c7" />
          <stop offset="100%" stopColor="#caf0f8" />
        </linearGradient>

        {/* Growth Bars Gradients */}
        <linearGradient id="bar1Grad" x1="105" y1="140" x2="105" y2="95" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0077b6" />
          <stop offset="100%" stopColor="#00b4d8" />
        </linearGradient>
        <linearGradient id="bar2Grad" x1="120" y1="140" x2="120" y2="75" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0096c7" />
          <stop offset="100%" stopColor="#48cae4" />
        </linearGradient>
        <linearGradient id="bar3Grad" x1="135" y1="140" x2="135" y2="55" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00b4d8" />
          <stop offset="100%" stopColor="#90e0ef" />
        </linearGradient>

        {/* Leaping Figure & Star Gradients */}
        <linearGradient id="personGrad" x1="120" y1="80" x2="155" y2="35" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0077b6" />
          <stop offset="40%" stopColor="#00b4d8" />
          <stop offset="100%" stopColor="#48cae4" />
        </linearGradient>

        <linearGradient id="starGlow" x1="140" y1="20" x2="165" y2="45" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#caf0f8" />
          <stop offset="50%" stopColor="#00b4d8" />
          <stop offset="100%" stopColor="#0077b6" />
        </linearGradient>
      </defs>

      {/* Main Outer Crescent Arc (The C form) */}
      <path
        d="M 125 38 C 70 36 40 70 40 115 C 40 155 70 178 100 178 C 80 170 60 148 60 115 C 60 80 82 54 125 54 C 132 54 138 55 142 57 L 146 42 C 140 39 133 38 125 38 Z"
        fill="url(#cArcGrad)"
      />

      {/* 3 Ascending Growth Bar Pillars */}
      {/* Bar 1 (Short) */}
      <path d="M 102 125 L 112 122 L 112 144 L 102 144 Z" fill="url(#bar1Grad)" rx="1.5" />
      {/* Bar 2 (Medium) */}
      <path d="M 117 105 L 127 101 L 127 146 L 117 146 Z" fill="url(#bar2Grad)" rx="1.5" />
      {/* Bar 3 (Tall) */}
      <path d="M 132 82 L 142 77 L 142 148 L 132 148 Z" fill="url(#bar3Grad)" rx="1.5" />

      {/* The Winding Upward Career Highway in 3D Perspective */}
      <path
        d="M 60 170 C 65 130 90 105 138 72 C 130 82 105 110 82 170 Z"
        fill="url(#roadGrad)"
      />
      <path
        d="M 82 170 C 105 110 130 82 138 72 C 142 70 144 72 142 76 C 118 118 96 150 90 170 Z"
        fill="#005f73"
        opacity="0.4"
      />

      {/* White Dashed Road Markings */}
      <path
        d="M 72 166 L 75 158"
        stroke="#ffffff"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M 82 146 L 87 137"
        stroke="#ffffff"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M 96 124 L 102 116"
        stroke="#ffffff"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M 112 102 L 118 95"
        stroke="#ffffff"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M 127 84 L 132 78"
        stroke="#ffffff"
        strokeWidth="1.1"
        strokeLinecap="round"
      />

      {/* Dynamic Person Leaping Figure at Peak */}
      {/* Head */}
      <circle cx="138" cy="46" r="6.5" fill="#48cae4" />

      {/* Body & Sweeping Reaching Arms */}
      <path
        d="M 132 54 C 136 52 142 54 146 58 C 152 50 156 42 160 38 C 158 45 152 55 146 62 C 142 67 136 78 128 85 C 132 74 135 65 132 54 Z"
        fill="url(#personGrad)"
      />
      {/* Dynamic Trailing Leg/Cape */}
      <path
        d="M 128 85 C 122 80 115 76 120 68 C 124 72 128 78 128 85 Z"
        fill="#0096c7"
      />

      {/* Five-Pointed Reaching Star */}
      <polygon
        points="164,22 167,31 176,31 169,37 172,46 164,40 156,46 159,37 152,31 161,31"
        fill="url(#starGlow)"
        filter="drop-shadow(0 0 4px #48cae4)"
      />
    </svg>
  );

  const LogoIcon = (
    <div className={`relative ${currentSize.icon} shrink-0 flex items-center justify-center`}>
      {useImage ? (
        <img
          src={appLogoImg}
          alt="CareerPath AI"
          className="w-full h-full object-contain rounded-2xl drop-shadow-md"
          referrerPolicy="no-referrer"
        />
      ) : (
        LogoVector
      )}
    </div>
  );

  if (variant === 'icon') {
    return <div className={`inline-flex items-center ${className}`}>{LogoIcon}</div>;
  }

  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center text-center gap-3 ${className}`}>
        {LogoIcon}
        <div className="flex flex-col items-center">
          {/* Main Wordmark: CareerPath AI */}
          <div className="flex items-center gap-2">
            <span className={`font-black tracking-tight text-white ${currentSize.text}`}>
              Career<span className="text-sky-400">Path</span>
            </span>
          </div>

          {/* Subtitle Divider with Center Dot */}
          <div className="flex items-center gap-2 w-full max-w-[240px] my-1 opacity-70">
            <div className="h-px bg-gradient-to-r from-transparent via-sky-400/50 to-transparent flex-1" />
            <div className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            <div className="h-px bg-gradient-to-r from-transparent via-sky-400/50 to-transparent flex-1" />
          </div>

          {/* Tagline */}
          <span className={`font-mono uppercase tracking-[0.25em] text-slate-300 font-semibold ${currentSize.tagline}`}>
            DISCOVER • LEARN • GROW • SUCCEED
          </span>
        </div>
      </div>
    );
  }

  // Default: Horizontal
  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {LogoIcon}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-black tracking-tight text-white ${currentSize.text}`}>
            Career<span className="text-sky-400">Path</span>
          </span>
        </div>
        {showTagline && (
          <span className={`font-mono uppercase tracking-widest text-slate-400 mt-1 ${currentSize.tagline}`}>
            DISCOVER • LEARN • GROW • SUCCEED
          </span>
        )}
      </div>
    </div>
  );
};
