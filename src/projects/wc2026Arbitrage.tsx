import React from 'react';
import type { Writeup } from '../components/project/ProjectPage';
import AdvanceChart from '../components/project/AdvanceChart';
import {
  A,
  Bullet,
  Bullets,
  Code,
  Lead,
  P,
  Pre,
  StatRow,
  Step,
  Steps,
  Strong,
  Table,
  Verdict,
} from '../components/project/prose';

const PIPELINE = `match 1X2   ──devig──▶  P(home / draw / away)
            ──fit────▶  bivariate-Poisson goal rates (λ₁, λ₂, λ₃ shared)  ◀── + P(over 2.5)
            ──simulate▶  joint Monte-Carlo of all 12 groups (50k draws)
            ──rank────▶  top-2 auto + 8 best 3rd-place  ⇒  32 of 48 advance
            ──aggregate▶  model P(advance), P(win group)
            ──compare─▶  vs Polymarket's own aggregate markets
            ──validate▶  vs DraftKings (recreational)  vs Pinnacle (sharp)`;

const RESULT_ROWS = [
  { team: 'Saudi Arabia', model: '29.7', pm: '34.8', dk: '47.6', pin: '35.4' },
  { team: 'Qatar', model: '17.1', pm: '21.2', dk: '30.7', pin: '22.6' },
  { team: 'DR Congo', model: '39.9', pm: '43.4', dk: '51.9', pin: '44.3' },
  { team: 'Ghana', model: '49.9', pm: '51.4', dk: '57.8', pin: '49.6' },
  { team: 'New Zealand', model: '31.3', pm: '32.3', dk: '38.0', pin: '35.6' },
];

const FILES = [
  {
    file: 'wc2026_joint.py',
    role: 'Main artifact. Joint 12-group bivariate-Poisson Monte-Carlo fitted to live Polymarket 1X2 + totals, with model-vs-market comparison and noise bands.',
  },
  {
    file: 'sharp_compare.py',
    role: 'Cross-venue validation. Model vs Polymarket vs DraftKings, plus the Pinnacle tie-breaker. The decisive result.',
  },
  {
    file: 'polymarket_wc.py',
    role: 'Gamma API client, low-level fetchers, and a single-group worked demo.',
  },
  {
    file: 'wc2026_model.py',
    role: 'Standalone reference simulator on hand-set team ratings — the exploratory engine, not the calibrated result.',
  },
  {
    file: 'vm_profeten.py',
    role: 'Spin-off: turns the same joint score distribution into expected-points-optimal exact-score picks.',
  },
  {
    file: 'backtest.py',
    role: 'Scorecard: frozen picks vs actual results, benchmarked against the model’s pre-match expected points.',
  },
  {
    file: 'make_figure.py',
    role: 'Renders the headline result figure from the captured snapshot.',
  },
];

const writeup: Writeup = {
  thesis:
    'Can a structural model of the group stage find mispricings in Polymarket’s directly-priced aggregate markets? A well-falsified negative result — and the discipline used to get there is the point.',
  sections: [
    {
      id: 'verdict',
      navLabel: 'The verdict',
      content: (
        <>
          <Verdict>
            <Lead>
              An internal Monte-Carlo model flagged five tradeable “edges” against Polymarket.
              A three-venue comparison showed all five were a <Strong>modeling artifact</Strong>.
            </Lead>
            <P>
              The model was not discovering anything — it was re-expressing Polymarket’s own view,
              amplified about 5 percentage points by an independence assumption. The genuine,
              model-free divergence was between Polymarket and a <em>recreational</em> book,
              DraftKings. The tie-breaker — Pinnacle, the sharpest book in the world — sits on top
              of Polymarket at a mean 1.6pp and 7.7pp away from DraftKings.
            </P>
            <P>
              <Strong>
                Polymarket’s advance market is at fair value. There is no edge, and DraftKings
                carries the textbook favourite-longshot bias.
              </Strong>
            </P>
          </Verdict>
        </>
      ),
    },
    {
      id: 'question',
      navLabel: 'The question',
      content: (
        <>
          <P>
            Prediction markets are widely sharp on single match outcomes — enough arbitrage capital
            polices them that a lone modeller has no business expecting to beat one. The working
            hypothesis was that they might be <Strong>softer on long-range aggregates</Strong>:
            markets like “will this team advance from its group” or “who wins Group H”, which a
            casual crowd prices with sentiment and favourite-longshot bias rather than by
            propagating the underlying match odds.
          </P>
          <P>
            If that were true, the two layers would be mutually <em>inconsistent</em>. The match
            markets imply a set of aggregate probabilities; the aggregate markets state them
            directly. Any gap between the implied and the stated is, in principle, tradeable
            without taking a view on football at all.
          </P>
        </>
      ),
    },
    {
      id: 'data',
      navLabel: 'Data',
      heading: 'Data — single-source by design',
      content: (
        <>
          <P>
            Every model input comes from one place: Polymarket’s Gamma API (
            <Code>gamma-api.polymarket.com</Code>, no key required). That is a deliberate
            constraint, not a convenience — with a single source, any disagreement the model
            produces is <em>internal</em> and therefore interpretable.
          </P>
          <Bullets>
            <Bullet>
              <Strong>72 group fixtures</Strong> — moneyline (1X2) and Over/Under 2.5 goals per match.
            </Bullet>
            <Bullet>
              <Strong>Aggregate markets</Strong> — advance-to-knockout (48 binaries) and group
              winner (12 events).
            </Bullet>
          </Bullets>
          <P>
            External sportsbook odds — DraftKings, then Pinnacle — are introduced{' '}
            <Strong>only at the validation stage</Strong>, as independent second and third prices.
            Keeping them out of the model is what makes the later comparison meaningful.
          </P>
        </>
      ),
    },
    {
      id: 'method',
      navLabel: 'Method',
      content: (
        <>
          <Pre label="pipeline">{PIPELINE}</Pre>
          <Steps>
            <Step n={1} title="De-vig to risk-neutral probabilities">
              Strip the bookmaker overround from each market. Multi-outcome markets are rescaled to
              their known total — 1X2 sums to 1.0, and the 48-team advance field sums to exactly 32,
              since 32 of 48 teams go through. Two-way book markets use a symmetric two-way de-vig.
            </Step>
            <Step n={2} title="Fit a bivariate Poisson per match">
              For each fixture, fit goal rates <Code>(λ₁, λ₂, λ₃)</Code> by least-squares against
              three market targets: P(home win) and P(away win) from the moneyline, and P(over 2.5)
              from totals. The shared term <Code>λ₃</Code> introduces home/away goal correlation and
              pins the goal total — the third degree of freedom, which drives goal difference and
              therefore the third-place cut-off. The 1X2 is the priority signal; totals only set the
              goal level.
            </Step>
            <Step n={3} title="Simulate all twelve groups jointly">
              50,000 vectorised Monte-Carlo draws over every group at once, applying the real
              tie-break ladder (points → goal difference → goals scored → random). The 2026 format
              advances the top two of each group <em>plus the eight best third-placed teams</em>, so
              the twelve third-place finishers must be ranked <em>across</em> groups — which is why
              the groups cannot be simulated independently. The result is{' '}
              <Code>P(advance) = P(top-2) + P(3rd ∧ best-8)</Code>.
            </Step>
            <Step n={4} title="Guard against input noise">
              Perturb the fitted λ’s, re-simulate, and only flag a team when its edge exceeds{' '}
              <Strong>4pp and twice the input-noise standard deviation</Strong>. This kills spurious
              flags that come from uncertainty in the market prices themselves.
            </Step>
            <Step n={5} title="Validate across venues">
              Convert sportsbook American/decimal odds to implied probability, de-vig to the same
              basis, and lay model, Polymarket, DraftKings and Pinnacle side by side for the teams
              that diverge.
            </Step>
          </Steps>
        </>
      ),
    },
    {
      id: 'results',
      navLabel: 'Results',
      content: (
        <>
          <P>
            <Strong>The match → aggregate propagation is internally coherent.</Strong> The model
            reproduces Polymarket’s own group-winner market to within one or two points, and{' '}
            <Code>Σ P(advance) = 32</Code> exactly. There is no easy internal arbitrage between the
            match layer and the aggregate layer.
          </P>
          <P>
            Against the advance market, though, the model flagged five teams: Saudi Arabia, Croatia,
            Canada, Qatar and Ivory Coast. Taken at face value, that is the thesis confirmed. The
            question is whether a second and third real price agree.
          </P>

          <AdvanceChart />

          <Table
            columns={[
              { key: 'team', label: 'Team' },
              { key: 'model', label: 'Model', numeric: true },
              { key: 'pm', label: 'Polymarket', numeric: true },
              { key: 'dk', label: 'DraftKings', numeric: true },
              { key: 'pin', label: 'Pinnacle', numeric: true, emphasis: true },
            ]}
            rows={RESULT_ROWS}
            caption={
              <>
                P(advance to Round of 32), percent — the same figures plotted above. Pinnacle
                prices are direct “to qualify from group” markets, read manually off an account;
                true-sharp prices are not freely scrapable.
              </>
            }
          />

          <StatRow
            stats={[
              {
                value: '1.6',
                unit: 'pp',
                label: 'Polymarket',
                color: 'var(--viz-pm)',
                note: 'Mean distance from the sharp — effectively on top of it.',
              },
              {
                value: '4.0',
                unit: 'pp',
                label: 'Internal model',
                color: 'var(--viz-model)',
                note: 'Polymarket’s own view, amplified away from the sharp.',
              },
              {
                value: '7.7',
                unit: 'pp',
                label: 'DraftKings',
                color: 'var(--viz-dk)',
                note: 'The outlier. Systematically over-prices underdogs.',
              },
            ]}
          />
          <P>
            Pinnacle lands on top of Polymarket — Saudi Arabia differs by <Strong>0.6pp</Strong> —
            and roughly eight points from DraftKings. An independent proxy agrees: inverting
            Pinnacle’s “reach the Round of 16” market by <Code>P(reach R16) / P(advance)</Code> gives
            an implied single-knockout win rate of a realistic 29.5 ± 2.9% under Polymarket’s
            numbers, against an implausible 23.7 ± 4.2% under DraftKings’.
          </P>
        </>
      ),
    },
    {
      id: 'artifact',
      navLabel: 'Why the edge wasn’t real',
      content: (
        <>
          <P>
            The tell was the <em>shape</em> of the disagreement. Across all five flagged teams,{' '}
            <Code>|model − Polymarket|</Code> was a near-constant ~5pp, and it always pointed the
            same way: the model liked favourites more and underdogs less. A real inefficiency does
            not arrive as a clean monotonic tilt across every flagged name.
          </P>
          <P>
            That tilt is the fingerprint of the model’s own independence assumption. Treating a
            team’s three group games as independent throws away tournament-form correlation, and
            doing so <Strong>inflates strong teams’ survival probability</Strong> — the favourite-longshot
            direction, exactly as observed. The model doesn’t discover anything about Polymarket; it
            amplifies Polymarket.
          </P>
          <P>
            The noise band from step 4 cannot catch this, and it is worth being precise about why:
            perturbing the fitted λ’s measures sensitivity to <em>input</em> uncertainty. The problem
            here is <Strong>model-specification error</Strong> — a wrong assumption, held with
            perfect confidence, that shifts every output in the same direction. No amount of
            resampling your own inputs will surface it.
          </P>
          <P>
            What does surface it is a third price. The three-venue extremeness ordering{' '}
            <Code>MODEL &gt; POLYMARKET &gt; DRAFTKINGS</Code> exposed the real, model-free
            divergence: Polymarket prices underdogs lower than DraftKings does. That left two
            readings — Polymarket is soft (the thesis), or DraftKings is biased (the textbook) — and
            settling between them needed a venue known to be sharp. Pinnacle picked the textbook.
          </P>
        </>
      ),
    },
    {
      id: 'conclusion',
      navLabel: 'What it means',
      content: (
        <>
          <Bullets>
            <Bullet>
              <Strong>No edge.</Strong> Polymarket’s advance-to-knockout market is at sharp value.
            </Bullet>
            <Bullet>
              <Strong>DraftKings is the biased venue</Strong>, over-pricing underdogs — the classic
              recreational favourite-longshot bias, exactly as theory predicts.
            </Bullet>
            <Bullet>
              <Strong>The thesis is not supported</Strong> for liquid aggregate markets. Simple
              dependent-probability propagation cannot beat a market arbitrageurs already police.
            </Bullet>
          </Bullets>
          <Verdict>
            <P>
              <Strong>
                The durable lesson: a model calibrated <em>from</em> a market cannot detect edges{' '}
                <em>against</em> it.
              </Strong>{' '}
              It can only re-express that market’s view, with its own specification error layered on
              top. Real edge detection requires an independent second price — and “fair” has to be
              anchored to a true sharp, never to a recreational book.
            </P>
          </Verdict>
        </>
      ),
    },
    {
      id: 'limitations',
      navLabel: 'Limitations',
      content: (
        <>
          <Bullets>
            <Bullet>
              The model assumes a team’s three group games are <Strong>independent</Strong> and
              ignores <Strong>dead-rubber rotation</Strong> in the final group game — the two effects
              most likely behind any residual favourite tilt.
            </Bullet>
            <Bullet>
              The knockout bracket in <Code>wc2026_model.py</Code> is randomised rather than the
              official third-place map, so its win-the-cup numbers are illustrative only.
            </Bullet>
            <Bullet>
              All odds are <Strong>pre-tournament snapshots</Strong>. This is research tooling, not a
              live trading system.
            </Bullet>
          </Bullets>
        </>
      ),
    },
    {
      id: 'code',
      navLabel: 'The code',
      content: (
        <>
          <P>
            Everything runs off the public Gamma API with no key. Live runs re-fetch, so numbers
            shift slightly as the market moves; the DraftKings and Pinnacle prices are hard-coded
            June 2026 snapshots.
          </P>
          <Table
            columns={[
              { key: 'file', label: 'File', emphasis: true },
              { key: 'role', label: 'Role' },
            ]}
            rows={FILES.map((f) => ({
              file: <span className="font-mono text-sm">{f.file}</span>,
              role: f.role,
            }))}
          />
          <Pre label="run">{`pip install -r requirements.txt

python wc2026_joint.py           # full joint model vs Polymarket  (~1-2 min)
python sharp_compare.py          # model-free: Polymarket vs DraftKings
python sharp_compare.py --model  # three-way comparison
python sharp_compare.py --pinnacle   # the sharp tie-breaker  <- headline result`}</Pre>
          <P>
            Full source, including the fetchers and the figure script, is on{' '}
            <A href="https://github.com/mromundset/wc2026_arbitrage_exploration">GitHub</A>.
          </P>
        </>
      ),
    },
  ],
};

export default writeup;
