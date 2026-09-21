import React from 'react';

export function VgurukoolLogo({ className = "w-8 h-8", glow = true }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Vgurukool Sovereign Identity Logo"
    >
      <defs>
        <linearGradient id="vgLogoGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="45%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>
        <linearGradient id="vgLogoFlame" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#EA580C" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#FEF08A" />
        </linearGradient>
        {glow && (
          <filter id="vgLogoGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        )}
      </defs>

      {/* Radiant Lotus Petals Halo */}
      <g
        stroke="url(#vgLogoGold)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        filter={glow ? "url(#vgLogoGlow)" : undefined}
      >
        {/* Central Crown Petal */}
        <path d="M50 10 C54 20 54 28 50 36 C46 28 46 20 50 10 Z" fill="url(#vgLogoGold)" fillOpacity="0.25" />
        {/* Inner Left Petal */}
        <path d="M42 16 C39 25 43 33 48 37 C43 32 39 26 42 16 Z" fill="url(#vgLogoGold)" fillOpacity="0.2" />
        {/* Inner Right Petal */}
        <path d="M58 16 C61 25 57 33 52 37 C57 32 61 26 58 16 Z" fill="url(#vgLogoGold)" fillOpacity="0.2" />
        {/* Mid Left Petal */}
        <path d="M33 24 C29 32 34 40 42 42 C35 38 31 33 33 24 Z" fill="url(#vgLogoGold)" fillOpacity="0.15" />
        {/* Mid Right Petal */}
        <path d="M67 24 C71 32 66 40 58 42 C65 38 69 33 67 24 Z" fill="url(#vgLogoGold)" fillOpacity="0.15" />
        {/* Outer Left Petal */}
        <path d="M25 35 C22 43 28 49 38 48 C30 46 25 41 25 35 Z" fill="url(#vgLogoGold)" fillOpacity="0.12" />
        {/* Outer Right Petal */}
        <path d="M75 35 C78 43 72 49 62 48 C70 46 75 41 75 35 Z" fill="url(#vgLogoGold)" fillOpacity="0.12" />
      </g>

      {/* Ascending Flame (Akhanda Jyoti) Core */}
      <path
        d="M50 24 C55 34 57 44 52 53 C49 58 44 54 48 48 C51 42 47 36 50 24 Z"
        fill="url(#vgLogoFlame)"
        filter={glow ? "url(#vgLogoGlow)" : undefined}
      />
      <path
        d="M48 38 C45 45 47 52 50 56 C47 54 44 48 48 38 Z"
        fill="#FEF08A"
      />

      {/* Geometric Monoline 'V' Pedestal & Chalice */}
      <g fill="url(#vgLogoGold)">
        {/* Inner V */}
        <path d="M32 46 L47 76 L50 82 L53 76 L68 46 L60 46 L50 67 L40 46 Z" />
        {/* Outer V Accent Wing */}
        <path d="M26 46 L47 87 L50 94 L53 87 L74 46 L68 46 L50 82 L32 46 Z" fillOpacity="0.65" />
      </g>
    </svg>
  );
}
export default VgurukoolLogo;
