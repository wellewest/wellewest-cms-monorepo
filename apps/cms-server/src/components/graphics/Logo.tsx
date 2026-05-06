import React from 'react'

export const Logo: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '1rem 0',
      }}
    >
      <img
        src="/wellewest-logo-blue.svg"
        alt="WelleWest"
        style={{
          maxWidth: '260px',
          width: '100%',
          height: 'auto',
        }}
      />
      <span
        style={{
          fontSize: '0.75rem',
          color: 'var(--theme-elevation-500, #888)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
      >
        Content Management System
      </span>
    </div>
  )
}

export default Logo
