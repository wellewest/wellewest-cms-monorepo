import React from 'react'

type Props = {
  data: { label: string; value: number }[]
  color?: string
  height?: number
}

export const LineChart: React.FC<Props> = ({
  data,
  color = '#004aad',
  height = 240,
}) => {
  if (!data?.length) return null
  const width = 800
  const padding = { top: 20, right: 20, bottom: 36, left: 48 }
  const chartW = width - padding.left - padding.right
  const chartH = height - padding.top - padding.bottom

  const max = Math.max(...data.map((d) => d.value), 1)
  const stepX = chartW / Math.max(data.length - 1, 1)

  // Y-Achsen-Ticks (0, 25%, 50%, 75%, 100%)
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((p) => ({
    y: padding.top + chartH - p * chartH,
    value: Math.round(max * p),
  }))

  const points = data
    .map((d, i) => {
      const x = padding.left + i * stepX
      const y = padding.top + chartH - (d.value / max) * chartH
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')

  const areaPoints = `${padding.left},${padding.top + chartH} ${points} ${padding.left + chartW},${padding.top + chartH}`

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} style={{ display: 'block' }}>
      {yTicks.map((t, i) => (
        <g key={i}>
          <line
            x1={padding.left}
            y1={t.y}
            x2={padding.left + chartW}
            y2={t.y}
            stroke="currentColor"
            strokeOpacity="0.08"
            strokeWidth="1"
          />
          <text
            x={padding.left - 8}
            y={t.y + 4}
            textAnchor="end"
            fontSize="11"
            fill="currentColor"
            opacity="0.5"
          >
            {t.value.toLocaleString('de-AT')}
          </text>
        </g>
      ))}
      <polygon points={areaPoints} fill={color} opacity="0.12" />
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {data.map((d, i) => {
        const x = padding.left + i * stepX
        return (
          <text
            key={i}
            x={x}
            y={height - 12}
            textAnchor="middle"
            fontSize="11"
            fill="currentColor"
            opacity="0.55"
          >
            {d.label}
          </text>
        )
      })}
    </svg>
  )
}

export default LineChart
