import React, { useState } from 'react';

/**
 * P(advance to Round of 32) for the five most-divergent underdogs, across the
 * three venues plus the internal model. Rebuilt natively from the numbers in
 * make_figure.py rather than embedding assets/results.png, so it inherits the
 * site theme and reflows on narrow screens.
 *
 * Colors come from --viz-* custom properties (see index.css); the three venue
 * hues are validated categorical slots 1-3 and the model is a deliberate
 * neutral, since it is a derived quantity rather than a real venue.
 */

interface Series {
  key: string;
  label: string;
  short: string;
  color: string;
  values: number[];
}

const TEAMS = ['Saudi Arabia', 'Qatar', 'DR Congo', 'Ghana', 'New Zealand'];

const SERIES: Series[] = [
  { key: 'model', label: 'Internal model', short: 'Model', color: 'var(--viz-model)', values: [29.7, 17.1, 39.9, 49.9, 31.3] },
  { key: 'pm', label: 'Polymarket', short: 'Polymarket', color: 'var(--viz-pm)', values: [34.8, 21.2, 43.4, 51.4, 32.3] },
  { key: 'dk', label: 'DraftKings (recreational)', short: 'DraftKings', color: 'var(--viz-dk)', values: [47.6, 30.7, 51.9, 57.8, 38.0] },
  { key: 'pin', label: 'Pinnacle (sharp)', short: 'Pinnacle', color: 'var(--viz-pin)', values: [35.4, 22.6, 44.3, 49.6, 35.6] },
];

// Geometry, in viewBox units.
const VB_W = 700;
const PAD_L = 116;
const PLOT_W = 486;
const AXIS_H = 30;
const BAR_H = 15;
const BAR_GAP = 2; // 2px surface gap between adjacent bars
const GROUP_PAD = 26;
const GROUP_H = SERIES.length * BAR_H + (SERIES.length - 1) * BAR_GAP + GROUP_PAD;
const VB_H = AXIS_H + TEAMS.length * GROUP_H + 8;
const X_MAX = 60;
const TICKS = [0, 15, 30, 45, 60];
const R = 4; // rounded data-end

const x = (v: number) => PAD_L + (v / X_MAX) * PLOT_W;

/** Bar with a square baseline end and a rounded data-end. */
const barPath = (x0: number, x1: number, y: number, h: number) => {
  const w = x1 - x0;
  if (w <= R) return `M${x0},${y} h${Math.max(w, 0.5)} v${h} h${-Math.max(w, 0.5)} Z`;
  return [
    `M${x0},${y}`,
    `H${x1 - R}`,
    `A${R},${R} 0 0 1 ${x1},${y + R}`,
    `V${y + h - R}`,
    `A${R},${R} 0 0 1 ${x1 - R},${y + h}`,
    `H${x0}`,
    'Z',
  ].join(' ');
};

interface Hovered {
  team: string;
  series: Series;
  value: number;
  bx: number;
  by: number;
}

const AdvanceChart: React.FC = () => {
  const [hovered, setHovered] = useState<Hovered | null>(null);

  return (
    <figure className="viz-root space-y-4">
      <figcaption className="space-y-1">
        <h4 className="text-lg font-bold text-gray-900 dark:text-white">
          Four venues, same market: the five most-divergent underdogs
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-500">
          P(advance to Round of 32), percent. Pre-tournament snapshot, June 2026.
        </p>
      </figcaption>

      {/* Legend — identity is never carried by color alone */}
      <ul className="flex flex-wrap gap-x-5 gap-y-2">
        {SERIES.map((s) => (
          <li key={s.key} className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="w-3 h-3 rounded-sm flex-shrink-0"
              style={{ backgroundColor: s.color }}
            />
            <span className="text-sm text-gray-700 dark:text-gray-400">{s.label}</span>
          </li>
        ))}
      </ul>

      <div className="overflow-x-auto -mx-2 px-2">
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="w-full h-auto min-w-[520px]"
          role="img"
          aria-label="Grouped bar chart comparing probability of advancing to the Round of 32 across the internal model, Polymarket, DraftKings and Pinnacle for Saudi Arabia, Qatar, DR Congo, Ghana and New Zealand. The full figures are in the table below."
        >
          {/* Recessive gridlines + axis */}
          {TICKS.map((t) => (
            <g key={t}>
              <line
                x1={x(t)}
                y1={AXIS_H - 8}
                x2={x(t)}
                y2={VB_H - 8}
                stroke="var(--viz-grid)"
                strokeWidth={1}
              />
              <text
                x={x(t)}
                y={AXIS_H - 16}
                textAnchor="middle"
                className="font-mono"
                fontSize={11}
                fill="var(--viz-muted)"
              >
                {t}
                {t === X_MAX ? '%' : ''}
              </text>
            </g>
          ))}

          {TEAMS.map((team, ti) => {
            const groupTop = AXIS_H + ti * GROUP_H + GROUP_PAD / 2;
            return (
              <g key={team}>
                <text
                  x={PAD_L - 12}
                  y={groupTop + (GROUP_H - GROUP_PAD) / 2 + 4}
                  textAnchor="end"
                  fontSize={13}
                  fontWeight={700}
                  fill="var(--viz-ink)"
                >
                  {team}
                </text>
                {SERIES.map((s, si) => {
                  const v = s.values[ti];
                  const y = groupTop + si * (BAR_H + BAR_GAP);
                  const isHovered =
                    hovered?.team === team && hovered.series.key === s.key;
                  return (
                    <g key={s.key}>
                      <path
                        d={barPath(x(0), x(v), y, BAR_H)}
                        fill={s.color}
                        opacity={hovered && !isHovered ? 0.45 : 1}
                        style={{ transition: 'opacity 0.15s ease' }}
                      />
                      <text
                        x={x(v) + 7}
                        y={y + BAR_H - 3}
                        fontSize={11}
                        className="font-mono"
                        fill="var(--viz-muted)"
                      >
                        {v.toFixed(1)}
                      </text>
                      {/* Hit target spans the full plot width, taller than the mark */}
                      <rect
                        x={PAD_L}
                        y={y - 1}
                        width={PLOT_W}
                        height={BAR_H + 2}
                        fill="transparent"
                        onMouseEnter={() =>
                          setHovered({ team, series: s, value: v, bx: x(v), by: y })
                        }
                        onMouseLeave={() => setHovered(null)}
                      >
                        <title>{`${team} — ${s.label}: ${v.toFixed(1)}%`}</title>
                      </rect>
                    </g>
                  );
                })}
              </g>
            );
          })}

          {hovered && (() => {
            const text = `${hovered.team} · ${hovered.series.short} ${hovered.value.toFixed(1)}%`;
            const w = text.length * 6.1 + 26;
            const flip = hovered.bx + 12 + w > VB_W;
            const tx = flip ? hovered.bx - 12 - w : hovered.bx + 12;
            const ty = hovered.by - 11;
            return (
              <g pointerEvents="none">
                <rect
                  x={tx}
                  y={ty}
                  width={w}
                  height={24}
                  rx={4}
                  fill="var(--viz-surface)"
                  stroke="var(--viz-grid)"
                  strokeWidth={1}
                />
                <rect
                  x={tx + 8}
                  y={ty + 8}
                  width={8}
                  height={8}
                  rx={2}
                  fill={hovered.series.color}
                />
                <text
                  x={tx + 22}
                  y={ty + 16}
                  fontSize={11}
                  fill="var(--viz-ink)"
                  className="font-mono"
                >
                  {text}
                </text>
              </g>
            );
          })()}
        </svg>
      </div>
    </figure>
  );
};

export default AdvanceChart;
export { SERIES as ADVANCE_SERIES, TEAMS as ADVANCE_TEAMS };
