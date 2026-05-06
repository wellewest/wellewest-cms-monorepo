import React from 'react'

export const Icon: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '6px 0',
      }}
    >
      <img
        src="/wellewest-symbol.svg"
        alt=""
        aria-hidden="true"
        style={{
          width: '60px',
          height: 'auto',
          display: 'block',
        }}
      />
      <span
        style={{
          fontFamily: '"Amaranth", sans-serif',
          fontWeight: 700,
          fontSize: '15px',
          color: 'var(--theme-text)',
          letterSpacing: '-0.01em',
        }}
      >
        WelleWest
      </span>
    </div>
  )
}

export default Icon
