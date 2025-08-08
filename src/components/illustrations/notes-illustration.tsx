import * as React from "react"
import { cn } from "@/lib/utils"

export function NotesIllustration({ className }: { className?: string }) {
  const titleId = React.useId()
  return (
    <div className={cn("w-full max-w-md mx-auto", className)}>
      <svg
        role="img"
        aria-labelledby={titleId}
        viewBox="0 0 400 260"
        width="100%"
        height="auto"
      >
        <title id={titleId}>{'Nuvio notes illustration: a spiral notebook with sticky notes and pencil'}</title>
        <desc>{'Playful 2D notebook scene suited for a notes/Tuts app, with dark tones and neon accents.'}</desc>

        {/* Background sparkles */}
        <g opacity="0.35">
          {Array.from({ length: 12 }).map((_, i) => {
            const x = 20 + (i * 31) % 360
            const y = 20 + ((i * 53) % 200)
            const r = 1.5 + (i % 3)
            return (
              <circle key={i} cx={x} cy={y} r={r} fill="#94a3b8" fillOpacity="0.25" />
            )
          })}
        </g>

        {/* Notebook shadow */}
        <ellipse cx="200" cy="225" rx="130" ry="12" fill="#000000" opacity="0.35" />

        {/* Notebook body */}
        <g transform="translate(80,30)">
          <rect
            x="0"
            y="0"
            width="240"
            height="200"
            rx="14"
            fill="#ffffff"
            fillOpacity="0.04"
            stroke="#ffffff"
            strokeOpacity="0.12"
          />

          {/* Margin line */}
          <line x1="40" y1="0" x2="40" y2="200" stroke="#22d3ee" strokeOpacity="0.85" strokeWidth="2" />

          {/* Ruled lines */}
          {Array.from({ length: 8 }).map((_, i) => {
            const y = 30 + i * 20
            return (
              <line
                key={i}
                x1="16"
                y1={y}
                x2="224"
                y2={y}
                stroke="#ffffff"
                strokeOpacity="0.08"
                strokeWidth="1"
              />
            )
          })}

          {/* Spiral rings */}
          {Array.from({ length: 8 }).map((_, i) => {
            const y = 22 + i * 24
            return (
              <g key={i}>
                <circle cx="8" cy={y} r="5" fill="#111827" stroke="#94a3b8" strokeOpacity="0.35" />
                <rect x="12" y={y - 1.5} width="6" height="3" fill="#94a3b8" fillOpacity="0.35" />
              </g>
            )
          })}
          {/* Subtle animated highlight (pulse) */}
          <rect
            x="50"
            y="44"
            width="140"
            height="10"
            rx="4"
            fill="#22d3ee"
            fillOpacity="0.18"
          />
          <rect
            x="50"
            y="64"
            width="100"
            height="10"
            rx="4"
            fill="#a78bfa"
            fillOpacity="0.18"
          />
        </g>

        {/* Sticky note 1 (teal) */}
        <g transform="translate(250,62) rotate(8)">
          <rect
            x="-36"
            y="-26"
            width="96"
            height="80"
            rx="8"
            fill="#22d3ee"
            fillOpacity="0.16"
            stroke="#22d3ee"
            strokeOpacity="0.6"
          />
          {/* doodle lines */}
          <line x1="-24" y1="-6" x2="44" y2="-6" stroke="#22d3ee" strokeOpacity="0.7" strokeWidth="2" />
          <line x1="-24" y1="10" x2="24" y2="10" stroke="#22d3ee" strokeOpacity="0.5" strokeWidth="2" />
          {/* smiley for a fun vibe */}
          <circle cx="-2" cy="24" r="10" fill="none" stroke="#22d3ee" strokeOpacity="0.6" />
          <circle cx="-6" cy="22" r="1.8" fill="#22d3ee" fillOpacity="0.8" />
          <circle cx="2" cy="22" r="1.8" fill="#22d3ee" fillOpacity="0.8" />
          <path d="M -7 27 Q -2 31 3 27" stroke="#22d3ee" strokeOpacity="0.7" fill="none" strokeWidth="1.5" />
        </g>

        {/* Sticky note 2 (purple) */}
        <g transform="translate(116,148) rotate(-10)">
          <rect
            x="-20"
            y="-18"
            width="84"
            height="68"
            rx="8"
            fill="#a78bfa"
            fillOpacity="0.14"
            stroke="#a78bfa"
            strokeOpacity="0.55"
          />
          <line x1="-8" y1="-2" x2="50" y2="-2" stroke="#a78bfa" strokeOpacity="0.7" strokeWidth="2" />
          <line x1="-8" y1="12" x2="32" y2="12" stroke="#a78bfa" strokeOpacity="0.5" strokeWidth="2" />
        </g>

        {/* Pencil */}
        <g transform="translate(282,178) rotate(-22)">
          <rect x="-60" y="-5" width="110" height="10" rx="5" fill="#334155" />
          <rect x="20" y="-5" width="30" height="10" rx="5" fill="#22d3ee" fillOpacity="0.6" />
          <polygon points="50,-5 68,0 50,5" fill="#fbbf24" />
          <polygon points="68,0 76,0 70,-6" fill="#1f2937" />
        </g>

        {/* Caption chip */}
        <g transform="translate(200,232)">
          <rect x="-60" y="-12" width="120" height="24" rx="12" fill="#111827" stroke="#334155" />
          <text
            x="0"
            y="5"
            textAnchor="middle"
            fontFamily="Inter, ui-sans-serif, system-ui, -apple-system"
            fontSize="12"
            fill="#cbd5e1"
          >
            {'· Nuvio ·'}
          </text>
        </g>
      </svg>
      <span className="sr-only">{'Illustration of a notebook page with sticky notes and a pencil for Nuvio Tuts.'}</span>
    </div>
  )
}

export default NotesIllustration
