import React from 'react';

/**
 * Shared building blocks for project write-ups. Every project page composes
 * these, so a new write-up is content only — no layout work.
 */

export const Lead: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-xl md:text-2xl leading-relaxed text-gray-800 dark:text-gray-200 font-light">
    {children}
  </p>
);

export const P: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-400">
    {children}
  </p>
);

export const Strong: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <strong className="font-bold text-gray-900 dark:text-white">{children}</strong>
);

/** Inline code / symbols — used heavily for λ, API slugs, filenames. */
export const Code: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <code className="font-mono text-[0.9em] px-1.5 py-0.5 rounded bg-gray-200/70 dark:bg-white/10 text-gray-900 dark:text-gray-200">
    {children}
  </code>
);

/** Callout for a load-bearing claim — the verdict up top, the lesson at the end. */
export const Verdict: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="border-l-2 border-gray-900 dark:border-white pl-6 py-1 space-y-4">
    {children}
  </div>
);

export const Steps: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ol className="space-y-6">{children}</ol>
);

export const Step: React.FC<{ n: number; title: string; children: React.ReactNode }> = ({
  n,
  title,
  children,
}) => (
  <li className="flex gap-4 md:gap-6">
    <span className="font-mono text-lg font-bold text-gray-400 dark:text-gray-600 flex-shrink-0 w-8 pt-0.5">
      {String(n).padStart(2, '0')}
    </span>
    <div className="min-w-0 space-y-2">
      <h4 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h4>
      <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-400">{children}</p>
    </div>
  </li>
);

/** Monospace block for the pipeline diagram / commands. Scrolls, never overflows the page. */
export const Pre: React.FC<{ children: React.ReactNode; label?: string }> = ({
  children,
  label,
}) => (
  <figure className="not-prose">
    {label && (
      <figcaption className="font-mono text-xs uppercase tracking-widest text-gray-500 dark:text-gray-500 mb-2">
        {label}
      </figcaption>
    )}
    <div className="overflow-x-auto rounded-md border border-gray-300 dark:border-gray-800 bg-gray-100/60 dark:bg-white/[0.03]">
      <pre className="font-mono text-sm leading-relaxed text-gray-800 dark:text-gray-300 p-5 whitespace-pre">
        {children}
      </pre>
    </div>
  </figure>
);

export interface TableColumn {
  key: string;
  label: string;
  numeric?: boolean;
  /** Renders in full ink rather than muted — for the reference column. */
  emphasis?: boolean;
}

/**
 * Data table. Doubles as the accessible table view for the chart above it,
 * which is what lets the chart's lighter hues clear the contrast relief rule.
 */
export const Table: React.FC<{
  columns: TableColumn[];
  rows: Record<string, React.ReactNode>[];
  caption?: React.ReactNode;
}> = ({ columns, rows, caption }) => (
  <figure className="space-y-3">
    <div className="overflow-x-auto -mx-2 px-2">
      <table className="w-full border-collapse text-left min-w-[520px]">
        <thead>
          <tr className="border-b border-gray-400 dark:border-gray-700">
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className={`py-3 pr-4 font-mono text-xs uppercase tracking-widest font-bold ${
                  col.numeric ? 'text-right' : ''
                } ${
                  col.emphasis
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-gray-200 dark:border-gray-800/70 last:border-b-0"
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={`py-3 pr-4 text-base ${col.numeric ? 'text-right font-mono tabular-nums' : ''} ${
                    col.emphasis
                      ? 'text-gray-900 dark:text-white font-bold'
                      : 'text-gray-700 dark:text-gray-400'
                  }`}
                >
                  {row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    {caption && (
      <figcaption className="text-sm text-gray-600 dark:text-gray-500 leading-relaxed">
        {caption}
      </figcaption>
    )}
  </figure>
);

/** Three-up headline numbers. Used where a 3-bar chart would be overkill. */
export const StatRow: React.FC<{
  stats: { value: string; unit?: string; label: string; color?: string; note?: string }[];
}> = ({ stats }) => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-gray-300 dark:bg-gray-800 border border-gray-300 dark:border-gray-800 rounded-md overflow-hidden">
    {stats.map((stat) => (
      <div
        key={stat.label}
        className="bg-[#F7F3ED] dark:bg-black p-5 flex flex-col gap-1.5"
      >
        <div className="flex items-center gap-2">
          {stat.color && (
            <span
              aria-hidden="true"
              className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
              style={{ backgroundColor: stat.color }}
            />
          )}
          <span className="font-mono text-xs uppercase tracking-widest text-gray-600 dark:text-gray-400">
            {stat.label}
          </span>
        </div>
        <div className="font-mono text-3xl font-bold text-gray-900 dark:text-white tabular-nums">
          {stat.value}
          {stat.unit && (
            <span className="text-lg font-normal text-gray-600 dark:text-gray-400 ml-1">
              {stat.unit}
            </span>
          )}
        </div>
        {stat.note && (
          <span className="text-sm text-gray-600 dark:text-gray-500 leading-snug">
            {stat.note}
          </span>
        )}
      </div>
    ))}
  </div>
);

export const Bullets: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ul className="space-y-3">{children}</ul>
);

export const Bullet: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="flex gap-3 text-lg leading-relaxed text-gray-700 dark:text-gray-400">
    <span aria-hidden="true" className="text-gray-400 dark:text-gray-600 flex-shrink-0">
      —
    </span>
    <span className="min-w-0">{children}</span>
  </li>
);

export const A: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="underline text-gray-900 dark:text-white !bg-none"
  >
    {children}
  </a>
);
