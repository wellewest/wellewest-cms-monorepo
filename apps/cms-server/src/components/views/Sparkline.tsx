import React from 'react'

type Props = {
  data: number[]
  color?: string
  width?: number
  height?: number
  fill?: boolean
}

export const Sparkline: React.FC<Props> = ({
  data,
  color = '#004aad',
  width = 120,
  height = 36,
  fill = true,
}) => {
  if (!data?.length) return null
  const max = Math.max(...data, 1)
  const min = Math.min(...data, 0)
  const range = max - min || 1
  const stepX = width / Math.max(data.length - 1, 1)

  const points = data
    .map((v, i) => {
      const x = i * stepX
      const y = height - ((v - min) / range) * (height - 4) - 2
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')

  const areaPoints = `0,${height} ${points} ${width},${height}`

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      preserveAspectRatio="none"
      style={{ display: 'block' }}
    >
      {fill && (
        <polygon
          points={areaPoints}
          fill={color}
          opacity="0.12"
        />
      )}
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Sparkline
