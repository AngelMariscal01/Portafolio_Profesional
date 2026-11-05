import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { JourneyChapter, JourneyLayer } from '../../content/journey';
import type { L10n, Lang } from '../../content/types';

/** Every label the island needs, already resolved to one language. */
export interface JourneyLabels {
  chapters: string;
  prev: string;
  next: string;
  play: string;
  pause: string;
  present: string;
  exitPresent: string;
  learned: string;
  bring: string;
  stack: string;
  concepts: string;
  illustrative: string;
  keysHint: string;
  ctaContact: string;
  ctaProjects: string;
}

interface Props {
  chapters: JourneyChapter[];
  acts: L10n[];
  layers: Record<JourneyLayer, L10n>;
  lang: Lang;
  labels: JourneyLabels;
}

/** How long autoplay stays on a chapter. Long enough to read the lesson aloud. */
const DWELL_MS = 11000;

const LAYER_ORDER: JourneyLayer[] = ['software', 'data', 'cloud', 'models', 'agents'];

/** Inline bilingual string for diagram labels, which are too small to live in content/. */
const T = (lang: Lang, es: string, en: string) => (lang === 'es' ? es : en);

const pad = (n: number) => String(n).padStart(2, '0');

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// ------------------------------------------------------------------ glyphs

const glyphPaths = {
  left: '<path d="m15 18-6-6 6-6"/>',
  right: '<path d="m9 18 6-6-6-6"/>',
  play: '<path d="M7 4.5v15l12-7.5Z"/>',
  pause: '<path d="M8 5v14"/><path d="M16 5v14"/>',
  expand: '<path d="M15 3h6v6"/><path d="M9 21H3v-6"/><path d="M21 3l-7 7"/><path d="M3 21l7-7"/>',
  shrink: '<path d="M4 14h6v6"/><path d="M20 10h-6V4"/><path d="M14 10l7-7"/><path d="M3 21l7-7"/>',
  lock: '<rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  spark:
    '<path d="M9.94 14.06 12 20l2.06-5.94L20 12l-5.94-2.06L12 4l-2.06 5.94L4 12l5.94 2.06Z"/>',
  shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1Z"/>',
  server:
    '<rect width="20" height="8" x="2" y="2" rx="2"/><rect width="20" height="8" x="2" y="14" rx="2"/><path d="M6 6h.01"/><path d="M6 18h.01"/>',
} as const;

function Glyph({ name, size = 16, className = '' }: { name: keyof typeof glyphPaths; size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      dangerouslySetInnerHTML={{ __html: glyphPaths[name] }}
    />
  );
}

// ------------------------------------------------------------------ hooks

/** Animates a number from 0 to `target` once, on mount. */
function useCountUp(target: number, ms = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (prefersReducedMotion()) {
      setValue(target);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const step = (now: number) => {
      const k = Math.min(1, (now - t0) / ms);
      setValue(target * (1 - Math.pow(1 - k, 3)));
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return value;
}

/** Cycles through `length` states on a timer until the visitor picks one by hand. */
function useCycle(length: number, ms: number) {
  const [index, setIndex] = useState(0);
  const [auto, setAuto] = useState(true);
  useEffect(() => {
    if (!auto) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % length), ms);
    return () => window.clearInterval(id);
  }, [auto, length, ms]);
  const pick = useCallback((i: number) => {
    setAuto(false);
    setIndex(i);
  }, []);
  return [index, pick] as const;
}

// ------------------------------------------------------------------ shared bits

function Node({ children, active = false, className = '' }: { children: React.ReactNode; active?: boolean; className?: string }) {
  return (
    <div
      className={`rounded-md border px-3 py-2 text-xs transition-colors duration-300 ${
        active ? 'border-accent bg-accent-soft text-ink' : 'border-line-strong bg-surface-2 text-muted'
      } ${className}`}
    >
      {children}
    </div>
  );
}

/** A connector with a dashed current running along it. Horizontal from `sm`, vertical below. */
function Wire({ active = true }: { active?: boolean }) {
  return (
    <>
      <span
        aria-hidden="true"
        className={`mx-auto block h-5 w-px sm:hidden ${active ? 'j-wire-v' : 'bg-line-strong'}`}
      />
      <span
        aria-hidden="true"
        className={`hidden h-px w-full min-w-6 self-center sm:block ${active ? 'j-wire' : 'bg-line-strong'}`}
      />
    </>
  );
}

// ------------------------------------------------------------------ visuals

function ChipArt({ mode }: { mode: 'ref' | 'sample' | 'diff' }) {
  const pins = [18, 32, 46, 60, 74];
  const faint = mode === 'diff';
  const body = faint ? 'fill-transparent stroke-line' : 'fill-surface-2 stroke-line-strong';
  const pin = faint ? 'fill-line' : 'fill-subtle';
  return (
    <svg viewBox="0 0 100 100" className="h-auto w-full" aria-hidden="true">
      {pins.map((p, i) => (
        <g key={p}>
          {!(mode !== 'ref' && i === 3) && <rect x={p} y="4" width="7" height="10" rx="1" className={pin} />}
          <rect x={p} y="86" width="7" height="10" rx="1" className={pin} />
          <rect x="4" y={p} width="10" height="7" rx="1" className={pin} />
          <rect x="86" y={p} width="10" height="7" rx="1" className={pin} />
        </g>
      ))}
      <rect x="14" y="14" width="72" height="72" rx="5" strokeWidth="1.2" className={body} />
      <rect x="30" y="30" width="40" height="40" rx="2" strokeWidth="1" className={faint ? 'fill-transparent stroke-line' : 'fill-surface stroke-line-strong'} />
      {[0, 1, 2, 3].map((r) =>
        [0, 1, 2, 3].map((col) => (
          <rect
            key={`${r}-${col}`}
            x={34 + col * 9}
            y={34 + r * 9}
            width="6"
            height="6"
            rx="0.8"
            className={
              mode !== 'ref' && r === 2 && col === 1
                ? 'fill-accent'
                : faint
                  ? 'fill-transparent'
                  : 'fill-line-strong'
            }
          />
        ))
      )}
      {mode !== 'ref' && <path d="M20 66 L 34 56" strokeWidth="2" strokeLinecap="round" className="stroke-accent" />}
      {mode === 'diff' && (
        <>
          <circle cx="64.5" cy="9" r="8" strokeWidth="1" className="fill-accent-soft stroke-accent" />
          <circle cx="27" cy="61" r="11" strokeWidth="1" className="fill-accent-soft stroke-accent" />
          <circle cx="46" cy="55" r="7" strokeWidth="1" className="fill-accent-soft stroke-accent" />
        </>
      )}
    </svg>
  );
}

function VisionVisual({ lang }: { lang: Lang }) {
  const pct = useCountUp(96.4, 1800);
  const panels = [
    { mode: 'ref' as const, label: T(lang, 'Referencia ideal', 'Ideal reference') },
    { mode: 'sample' as const, label: T(lang, 'Pieza evaluada', 'Inspected part') },
    { mode: 'diff' as const, label: T(lang, 'Diferencias', 'Differences') },
  ];
  return (
    <div className="flex h-full flex-col">
      <div className="grid grid-cols-3 gap-3">
        {panels.map((p) => (
          <div key={p.mode}>
            <div className="relative overflow-hidden rounded-md border border-line bg-bg p-2.5">
              <ChipArt mode={p.mode} />
              {p.mode === 'sample' && (
                <span aria-hidden="true" className="j-scan absolute inset-x-0 h-px bg-accent shadow-[0_0_12px_2px_var(--accent)]" />
              )}
            </div>
            <p className="eyebrow mt-2 text-center">{p.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="tnum font-serif text-5xl leading-none text-ink">{pct.toFixed(1)}%</p>
          <p className="mt-2 text-xs text-subtle">{T(lang, 'de parecido con la referencia', 'similarity to the reference')}</p>
        </div>
        <span className="chip">Raspberry Pi · Python</span>
      </div>

      <ul className="mt-auto space-y-2 pt-6 text-sm">
        <li className="flex items-start gap-2.5 text-subtle">
          <Glyph name="x" size={15} className="mt-0.5 shrink-0" />
          <span>
            <span className="line-through">{T(lang, 'Modelo de visión en el dispositivo', 'On-device vision model')}</span>
            {' — '}
            {T(lang, 'demasiado pesado para la Pi', 'too heavy for the Pi')}
          </span>
        </li>
        <li className="flex items-start gap-2.5 text-ink">
          <Glyph name="check" size={15} className="mt-0.5 shrink-0 text-accent" />
          <span>
            {T(lang, 'Diferencias en escalas de color', 'Colour-scale differences')}
            <span className="text-muted"> — {T(lang, 'ligero y suficiente', 'light and sufficient')}</span>
          </span>
        </li>
      </ul>
    </div>
  );
}

function PipelineVisual({ lang }: { lang: Lang }) {
  const nodes = [
    { id: 'src', x: 6, y: 92, label: T(lang, 'Fuentes', 'Sources'), sub: 'ERP · CSV · APIs' },
    { id: 'etl', x: 104, y: 92, label: 'ETL', sub: 'EDA' },
    { id: 'lake', x: 202, y: 30, label: 'Data lake', sub: T(lang, 'crudo', 'raw') },
    { id: 'dw', x: 202, y: 154, label: 'Warehouse', sub: T(lang, 'modelado', 'modelled') },
    { id: 'api', x: 300, y: 30, label: 'API', sub: T(lang, 'contenedor', 'container') },
    { id: 'dash', x: 300, y: 154, label: 'Dashboard', sub: T(lang, 'indicadores', 'metrics') },
  ];
  const W = 92;
  const H = 46;
  const at = (id: string) => nodes.find((n) => n.id === id)!;
  const edge = (a: string, b: string) => {
    const s = at(a);
    const e = at(b);
    const x1 = s.x + W;
    const y1 = s.y + H / 2;
    const x2 = e.x;
    const y2 = e.y + H / 2;
    const mx = (x1 + x2) / 2;
    return `M${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
  };
  const edges = [edge('src', 'etl'), edge('etl', 'lake'), edge('etl', 'dw'), edge('lake', 'api'), edge('dw', 'api'), edge('dw', 'dash')];
  const steps = [
    T(lang, 'Captura', 'Capture'),
    T(lang, 'Limpieza', 'Cleaning'),
    T(lang, 'Almacenamiento', 'Storage'),
    T(lang, 'Consumo', 'Consumption'),
  ];

  return (
    <div className="flex h-full flex-col">
      <svg viewBox="0 0 398 232" className="h-auto w-full" role="img" aria-label={T(lang, 'Pipeline de datos', 'Data pipeline')}>
        {edges.map((d) => (
          <g key={d}>
            <path d={d} fill="none" strokeWidth="1" className="stroke-line-strong" />
            <path d={d} fill="none" strokeWidth="1.6" className="j-flow stroke-accent" />
          </g>
        ))}
        {nodes.map((n) => (
          <g key={n.id}>
            <rect x={n.x} y={n.y} width={W} height={H} rx="6" strokeWidth="1" className="fill-surface-2 stroke-line-strong" />
            <text x={n.x + W / 2} y={n.y + 20} textAnchor="middle" fontSize="13" className="fill-ink">
              {n.label}
            </text>
            <text x={n.x + W / 2} y={n.y + 35} textAnchor="middle" fontSize="9.5" className="fill-subtle">
              {n.sub}
            </text>
          </g>
        ))}
      </svg>

      <ol className="mt-auto grid grid-cols-4 gap-2 border-t border-line pt-4">
        {steps.map((s, i) => (
          <li key={s} className="j-pop" style={{ animationDelay: `${300 + i * 140}ms` }}>
            <span className="eyebrow eyebrow-accent tnum">{pad(i + 1)}</span>
            <p className="mt-1 text-xs text-muted">{s}</p>
          </li>
        ))}
      </ol>
      <p className="mt-3 text-xs text-subtle">{T(lang, 'Ciclo de vida del dato', 'Data lifecycle')}</p>
    </div>
  );
}

function SamplingVisual({ lang }: { lang: Lang }) {
  const tokens = useMemo(
    () => [
      { t: T(lang, 'ventas', 'sales'), logit: 3.1 },
      { t: T(lang, 'inventario', 'inventory'), logit: 2.6 },
      { t: T(lang, 'clientes', 'customers'), logit: 2.0 },
      { t: T(lang, 'rutas', 'routes'), logit: 1.3 },
      { t: T(lang, 'clima', 'weather'), logit: 0.2 },
      { t: T(lang, 'pingüinos', 'penguins'), logit: -1.0 },
    ],
    [lang]
  );
  const [temperature, setTemperature] = useState(0.8);
  const [topK, setTopK] = useState(4);
  const [topP, setTopP] = useState(0.9);
  const [sampled, setSampled] = useState<string | null>(null);

  const rows = useMemo(() => {
    const scaled = tokens.map((x) => Math.exp(x.logit / temperature));
    const sum = scaled.reduce((a, b) => a + b, 0);
    let cumulative = 0;
    return tokens.map((x, rank) => {
      const p = scaled[rank] / sum;
      // Tokens are pre-sorted by logit, so rank order is probability order.
      const eligible = rank < topK && cumulative < topP;
      cumulative += p;
      return { ...x, p, eligible };
    });
  }, [tokens, temperature, topK, topP]);

  const eligible = rows.filter((r) => r.eligible);

  const sample = () => {
    const mass = eligible.reduce((a, r) => a + r.p, 0);
    let roll = Math.random() * mass;
    for (const r of eligible) {
      roll -= r.p;
      if (roll <= 0) return setSampled(r.t);
    }
    setSampled(eligible[eligible.length - 1].t);
  };

  const sliders = [
    { id: 'temp', label: T(lang, 'Temperatura', 'Temperature'), value: temperature, min: 0.1, max: 2, step: 0.1, set: setTemperature, fmt: (v: number) => v.toFixed(1) },
    { id: 'k', label: 'Top-k', value: topK, min: 1, max: 6, step: 1, set: setTopK, fmt: (v: number) => String(v) },
    { id: 'p', label: 'Top-p', value: topP, min: 0.1, max: 1, step: 0.05, set: setTopP, fmt: (v: number) => v.toFixed(2) },
  ];

  return (
    <div className="flex h-full flex-col">
      <p className="eyebrow eyebrow-accent">{T(lang, 'Pruébalo · siguiente token', 'Try it · next token')}</p>
      <p className="mt-2 font-mono text-sm text-ink">
        “{T(lang, 'Genera un reporte de', 'Generate a report of')}{' '}
        <span key={sampled ?? 'blank'} className="j-pop inline-block border-b border-accent text-accent">
          {sampled ?? '____'}
        </span>
        ”
      </p>

      <ul className="mt-4 space-y-1.5" aria-live="polite">
        {rows.map((r) => (
          <li key={r.t} className={`grid grid-cols-[5.5rem_1fr_2.75rem] items-center gap-3 text-xs transition-opacity duration-300 ${r.eligible ? '' : 'opacity-35'}`}>
            <span className={r.eligible ? 'text-ink' : 'text-subtle line-through'}>{r.t}</span>
            <span className="h-1.5 overflow-hidden rounded-full bg-surface-2">
              <span
                className={`block h-full rounded-full transition-[width] duration-300 ${r.eligible ? 'bg-accent' : 'bg-line-strong'}`}
                style={{ width: `${Math.max(1, r.p * 100)}%` }}
              />
            </span>
            <span className="tnum text-right text-subtle">{(r.p * 100).toFixed(0)}%</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 grid gap-3">
        {sliders.map((s) => (
          <label key={s.id} className="grid grid-cols-[5.5rem_1fr_2.75rem] items-center gap-3 text-xs">
            <span className="text-muted">{s.label}</span>
            <input
              type="range"
              min={s.min}
              max={s.max}
              step={s.step}
              value={s.value}
              onChange={(e) => s.set(Number(e.target.value))}
              className="w-full accent-[var(--accent)]"
            />
            <span className="tnum text-right text-ink">{s.fmt(s.value)}</span>
          </label>
        ))}
      </div>

      <div className="mt-auto flex items-center justify-between gap-3 pt-5">
        <span className="text-xs text-subtle">
          {eligible.length} {T(lang, 'tokens elegibles', 'eligible tokens')}
        </span>
        <button type="button" onClick={sample} className="btn btn-ghost !px-3 !py-2 !text-xs">
          <Glyph name="spark" size={13} />
          {T(lang, 'Muestrear', 'Sample')}
        </button>
      </div>
    </div>
  );
}

function CloudVisual({ lang }: { lang: Lang }) {
  const steps = [
    T(lang, 'reconocimiento', 'recon'),
    T(lang, 'enumeración', 'enumeration'),
    T(lang, 'explotación', 'exploitation'),
    T(lang, 'escalamiento', 'privilege escalation'),
  ];
  return (
    <div className="grid flex-1 gap-4 sm:grid-cols-[1.35fr_1fr]">
      <div className="flex flex-col rounded-md border border-dashed border-line-strong p-3">
        <p className="eyebrow">AWS · {T(lang, 'región', 'region')}</p>
        <div className="mt-2 flex flex-1 flex-col rounded-md border border-accent/40 p-3">
          <p className="eyebrow eyebrow-accent">VPC</p>
          <div className="mt-2 grid flex-1 grid-cols-2 gap-2">
            <div className="j-pop rounded border border-line p-2" style={{ animationDelay: '150ms' }}>
              <p className="text-[0.65rem] text-subtle">{T(lang, 'Subred pública', 'Public subnet')}</p>
              <div className="mt-2 flex gap-1.5">
                <Node className="!px-2 !py-1.5">EC2</Node>
                <Node className="!px-2 !py-1.5">EC2</Node>
              </div>
            </div>
            <div className="j-pop rounded border border-line p-2" style={{ animationDelay: '300ms' }}>
              <p className="text-[0.65rem] text-subtle">{T(lang, 'Subred privada', 'Private subnet')}</p>
              <div className="mt-2 flex gap-1.5">
                <Node className="!px-2 !py-1.5">
                  <span className="inline-flex items-center gap-1">
                    <Glyph name="server" size={12} /> DB
                  </span>
                </Node>
              </div>
            </div>
          </div>
        </div>
        <div className="j-pop mt-3 flex items-center gap-2 text-xs text-muted" style={{ animationDelay: '450ms' }}>
          <Glyph name="shield" size={15} className="text-accent" />
          IAM · {T(lang, 'políticas, roles y permisos', 'policies, roles and permissions')}
        </div>
      </div>

      <div className="flex flex-col rounded-md border border-line bg-bg p-3 font-mono text-xs">
        <p className="eyebrow">Hack The Box · Red Team</p>
        <ul className="mt-3 space-y-1.5">
          {steps.map((s, i) => (
            <li key={s} className="j-type flex items-center gap-2 text-muted" style={{ animationDelay: `${400 + i * 380}ms` }}>
              <span className="text-accent">$</span> {s}
              <Glyph name="check" size={12} className="ml-auto text-accent" />
            </li>
          ))}
        </ul>
        <p className="j-type mt-auto pt-4 text-subtle" style={{ animationDelay: '2000ms' }}>
          ~3 {T(lang, 'meses', 'months')}
          <span className="j-caret ml-0.5 inline-block h-3 w-1.5 translate-y-0.5 bg-accent" />
        </p>
      </div>
    </div>
  );
}

function CertVisual({ lang }: { lang: Lang }) {
  const months = [1, 2, 3, 4, 5, 6];
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-5">
        <img src="/images/aws.webp" alt="" width="112" height="112" className="j-pop h-24 w-24 shrink-0 object-contain sm:h-28 sm:w-28" />
        <div>
          <p className="font-serif text-2xl leading-tight text-ink">AWS Certified AI Practitioner</p>
          <p className="mt-1 text-sm text-muted">Amazon Web Services · 2025</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <span className="chip chip-accent">{T(lang, 'Examen en inglés', 'Exam in English')}</span>
            <span className="chip">{T(lang, '< 6 meses', '< 6 months')}</span>
          </div>
        </div>
      </div>

      <div className="mt-7">
        <p className="eyebrow">{T(lang, 'Preparación', 'Preparation')}</p>
        <div className="relative mt-3 h-1.5 rounded-full bg-surface-2">
          <span className="j-fill absolute inset-y-0 left-0 w-[88%] rounded-full bg-accent" />
        </div>
        <div className="mt-2 grid grid-cols-6 text-[0.65rem] text-subtle">
          {months.map((m) => (
            <span key={m} className="tnum text-right">
              {T(lang, 'mes', 'mo')} {m}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-auto grid grid-cols-[1fr_auto_1fr] items-center gap-3 pt-7">
        <Node>
          <p className="text-[0.65rem] text-subtle">{T(lang, 'Antes', 'Before')}</p>
          <p className="mt-0.5">{T(lang, 'Desarrollador de aplicaciones', 'Application developer')}</p>
        </Node>
        <Glyph name="right" size={18} className="text-accent" />
        <Node active className="j-pop" >
          <p className="text-[0.65rem] text-accent">{T(lang, 'Puesto nuevo', 'New role')}</p>
          <p className="mt-0.5">{T(lang, 'Ingeniero de IA Generativa', 'Generative AI Engineer')}</p>
        </Node>
      </div>
    </div>
  );
}

const BUILDER_JSON: Record<string, string[]> = {
  list: [
    '{',
    '  "type": "list",',
    '  "entity": "products",',
    '  "columns": [',
    '    { "field": "name" },',
    '    { "field": "stock",',
    '      "format": "number" }',
    '  ],',
    '  "filters": ["category"],',
    '  "pageSize": 25',
    '}',
  ],
  form: [
    '{',
    '  "type": "form",',
    '  "entity": "orders",',
    '  "fields": [',
    '    { "field": "customer", "control": "lookup",',
    '      "required": true },',
    '    { "field": "date", "control": "date" },',
    '    { "field": "total", "control": "currency" }',
    '  ]',
    '}',
  ],
  entity: [
    '{',
    '  "type": "entity",',
    '  "name": "supplier",',
    '  "properties": [',
    '    { "name": "taxId", "type": "string",',
    '      "unique": true },',
    '    { "name": "creditDays", "type": "int" },',
    '    { "name": "active", "type": "bool" }',
    '  ]',
    '}',
  ],
  profile: [
    '{',
    '  "type": "profile",',
    '  "name": "supervisor",',
    '  "permissions": {',
    '    "orders": ["read", "approve"],',
    '    "products": ["read"]',
    '  }',
    '}',
  ],
};

function BuilderV1Visual({ lang }: { lang: Lang }) {
  const components = [
    { id: 'list', label: T(lang, 'Lista', 'List') },
    { id: 'form', label: T(lang, 'Formulario', 'Form') },
    { id: 'entity', label: T(lang, 'Entidad', 'Entity') },
    { id: 'profile', label: T(lang, 'Perfil', 'Profile') },
  ];
  const [active, pick] = useCycle(components.length, 3600);
  const current = components[active];

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="grid items-center gap-2 sm:grid-cols-[auto_1fr_auto_1fr_auto]">
        <Node active>{current.label}</Node>
        <Wire />
        <Node>
          Amazon Bedrock
          <span className="block text-[0.65rem] text-subtle">{T(lang, 'system prompt = framework documentado', 'system prompt = documented framework')}</span>
        </Node>
        <Wire />
        <Node active>JSON</Node>
      </div>

      <div className="grid min-h-0 flex-1 gap-3 sm:grid-cols-[8.5rem_1fr]">
        <ul className="grid grid-cols-2 gap-1.5 sm:grid-cols-1 sm:content-start">
          {components.map((comp, i) => (
            <li key={comp.id}>
              <button
                type="button"
                onClick={() => pick(i)}
                aria-pressed={i === active}
                className={`flex w-full flex-col items-start gap-0.5 rounded-md border px-2.5 py-2 text-left text-xs transition-colors ${
                  i === active ? 'border-accent text-ink' : 'border-line text-muted hover:border-line-strong'
                }`}
              >
                {comp.label}
                <span className={`inline-flex items-center gap-1 whitespace-nowrap text-[0.6rem] ${i === active ? 'text-accent' : 'text-subtle'}`}>
                  <Glyph name="spark" size={11} />
                  {T(lang, 'Crear con IA', 'Create with AI')}
                </span>
              </button>
            </li>
          ))}
        </ul>

        <pre key={current.id} className="overflow-x-auto rounded-md border border-line bg-bg p-3 font-mono text-[0.7rem] leading-relaxed text-muted">
          {BUILDER_JSON[current.id].map((line, i) => (
            <span key={i} className="j-type block" style={{ animationDelay: `${i * 70}ms` }}>
              {line.split(/("[^"]*")/g).map((part, j, parts) =>
                part.startsWith('"') ? (
                  // A string followed by a colon is a key; anything else is a value.
                  <span key={j} className={parts[j + 1]?.trimStart().startsWith(':') ? 'text-ink' : 'text-accent'}>
                    {part}
                  </span>
                ) : (
                  part
                )
              )}
            </span>
          ))}
        </pre>
      </div>
    </div>
  );
}

function InsightVisual({ lang }: { lang: Lang }) {
  const tenants = [
    {
      name: T(lang, 'Espacio A', 'Workspace A'),
      domain: T(lang, 'Acuicultura', 'Aquaculture'),
      docs: T(lang, 'tanques de peces', 'fish tanks'),
      question: T(lang, '¿Qué tanque tuvo el oxígeno más bajo esta semana?', 'Which tank had the lowest oxygen this week?'),
    },
    {
      name: T(lang, 'Espacio B', 'Workspace B'),
      domain: T(lang, 'Venta en ruta', 'Route sales'),
      docs: T(lang, 'ventas en ruta', 'route sales'),
      question: T(lang, '¿Qué ruta vendió más ayer?', 'Which route sold the most yesterday?'),
    },
  ];
  const [active, pick] = useCycle(tenants.length, 4200);
  const tenant = tenants[active];
  const parts = [
    T(lang, 'Memoria', 'Memory'),
    'Tools',
    'Gateway',
    'System prompt',
    T(lang, 'Observabilidad', 'Observability'),
    'Guardrails',
  ];
  const servers = [tenants[0].name, tenants[1].name, '+ N'];

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label={T(lang, 'Espacio de trabajo', 'Workspace')}>
        {tenants.map((t, i) => (
          <button
            key={t.name}
            type="button"
            onClick={() => pick(i)}
            aria-pressed={i === active}
            className={`rounded-md border px-2.5 py-1.5 text-xs transition-colors ${
              i === active ? 'border-accent bg-accent-soft text-ink' : 'border-line text-muted hover:border-line-strong'
            }`}
          >
            {t.name} · {t.domain}
          </button>
        ))}
      </div>

      <p key={tenant.name} className="j-pop mt-3 self-start rounded-md rounded-bl-none border border-line bg-surface-2 px-3 py-2 text-sm text-ink">
        {tenant.question}
      </p>

      <div className="mt-3 rounded-md border border-line-strong p-3">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="eyebrow eyebrow-accent">AgentCore Runtime · {T(lang, 'compartido', 'shared')}</p>
          <p key={tenant.docs} className="j-pop font-mono text-[0.65rem] text-subtle">
            config(api) → docs: <span className="text-accent">“{tenant.docs}”</span>
          </p>
        </div>
        <ul className="mt-2.5 grid grid-cols-3 gap-1.5">
          {parts.map((p) => (
            <li key={p} className="rounded border border-line px-2 py-1 text-center text-[0.68rem] text-muted">
              {p}
            </li>
          ))}
        </ul>
      </div>

      <svg viewBox="0 0 300 34" preserveAspectRatio="none" className="h-8 w-full" aria-hidden="true">
        {[50, 150, 250].map((x, i) => (
          <path
            key={x}
            d={`M150 0 C 150 18, ${x} 14, ${x} 34`}
            fill="none"
            strokeWidth="1.4"
            vectorEffect="non-scaling-stroke"
            className={i === active ? 'j-flow stroke-accent' : 'stroke-line'}
          />
        ))}
      </svg>

      <ul className="grid grid-cols-3 gap-2">
        {servers.map((s, i) => (
          <li
            key={s}
            className={`flex items-center justify-center gap-1.5 rounded-md border px-2 py-2 text-[0.7rem] transition-colors duration-300 ${
              i === active ? 'border-accent text-ink' : 'border-line text-subtle'
            }`}
          >
            <Glyph name={i === active ? 'server' : 'lock'} size={12} className={i === active ? 'text-accent' : ''} />
            {s}
          </li>
        ))}
      </ul>
      <p className="mt-auto pt-3 text-xs text-subtle">
        {T(lang, 'Un runtime para todos; cada cliente con su propio servidor de datos.', 'One runtime for everyone; each client with its own data server.')}
      </p>
    </div>
  );
}

function MultiAgentVisual({ lang }: { lang: Lang }) {
  const agents = [
    { id: 'apps', label: T(lang, 'Aplicaciones', 'Apps') },
    { id: 'lists', label: T(lang, 'Listas', 'Lists') },
    { id: 'entities', label: T(lang, 'Entidades', 'Entities') },
    { id: 'profiles', label: T(lang, 'Perfiles', 'Profiles') },
    { id: 'flows', label: T(lang, 'Flujos', 'Workflows') },
  ];
  const requests = useMemo(
    () => [
      {
        text: T(lang, 'Crea una app de inventario con lista de productos y aprobación de compras', 'Build an inventory app with a product list and purchase approval'),
        targets: ['apps', 'lists', 'flows'],
      },
      {
        text: T(lang, 'Agrega la entidad Proveedor y un perfil para supervisores', 'Add a Supplier entity and a profile for supervisors'),
        targets: ['entities', 'profiles'],
      },
      {
        text: T(lang, 'Agrega un flujo de autorización a la lista de pedidos', 'Add an authorization workflow to the orders list'),
        targets: ['flows', 'lists'],
      },
    ],
    [lang]
  );

  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setTick((t) => t + 1), 850);
    return () => window.clearInterval(id);
  }, []);

  // Each request plays as: arrive → light each target in turn → consolidate → hold.
  const spans = requests.map((r) => r.targets.length + 3);
  const total = spans.reduce((a, b) => a + b, 0);
  let t = tick % total;
  let r = 0;
  while (t >= spans[r]) {
    t -= spans[r];
    r += 1;
  }
  const req = requests[r];
  const lit = new Set(req.targets.slice(0, Math.max(0, t)));
  const done = t >= req.targets.length + 1;

  const cx = 180;
  const cy = 122;
  const R = 92;
  const pos = agents.map((_, i) => {
    const a = (-90 + i * 72) * (Math.PI / 180);
    return { x: cx + R * Math.cos(a), y: cy + R * Math.sin(a) };
  });

  return (
    <div className="flex h-full flex-col">
      <p key={r} className="j-pop self-start rounded-md rounded-bl-none border border-line bg-surface-2 px-3 py-2 text-sm text-ink">
        {req.text}
      </p>

      <svg viewBox="0 0 360 244" className="mx-auto mt-2 h-auto w-full max-w-md" role="img" aria-label={T(lang, 'Orquestador y subagentes', 'Orchestrator and sub-agents')}>
        {agents.map((a, i) => (
          <line
            key={a.id}
            x1={cx}
            y1={cy}
            x2={pos[i].x}
            y2={pos[i].y}
            strokeWidth={lit.has(a.id) ? 1.8 : 1}
            className={lit.has(a.id) ? 'j-flow stroke-accent' : 'stroke-line-strong'}
          />
        ))}
        <circle cx={cx} cy={cy} r="44" className="j-ring fill-none stroke-accent" strokeWidth="1" />
        <circle cx={cx} cy={cy} r="36" strokeWidth="1.4" className="fill-surface stroke-accent" />
        <text x={cx} y={cy - 2} textAnchor="middle" fontSize="11.5" className="fill-ink">
          {T(lang, 'Orquestador', 'Orchestrator')}
        </text>
        <text x={cx} y={cy + 12} textAnchor="middle" fontSize="9" className="fill-subtle">
          {done ? T(lang, 'consolida', 'consolidates') : T(lang, 'delega', 'delegates')}
        </text>
        {agents.map((a, i) => {
          const on = lit.has(a.id);
          return (
            <g key={a.id}>
              <circle cx={pos[i].x} cy={pos[i].y} r="25" strokeWidth={on ? 1.6 : 1} className={`transition-colors duration-300 ${on ? 'fill-accent-soft stroke-accent' : 'fill-surface-2 stroke-line-strong'}`} />
              <text x={pos[i].x} y={pos[i].y + 3.5} textAnchor="middle" fontSize="9.5" className={on ? 'fill-ink' : 'fill-muted'}>
                {a.label}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-2">
        <p className={`flex items-center gap-1.5 text-xs transition-opacity duration-300 ${done ? 'text-accent opacity-100' : 'opacity-0'}`} aria-hidden={!done}>
          <Glyph name="check" size={13} />
          {T(lang, 'Respuesta consolidada', 'Consolidated answer')}
        </p>
        <div className="flex flex-wrap gap-1.5">
          <span className="chip">{T(lang, 'Replicable por espacio', 'Per-workspace replica')}</span>
          <span className="chip">{T(lang, 'Licenciamiento', 'Licensing')}</span>
        </div>
      </div>
    </div>
  );
}

function Phone({ children, dim = false, label }: { children: React.ReactNode; dim?: boolean; label: React.ReactNode }) {
  return (
    <div className={`flex flex-col items-center ${dim ? 'opacity-60' : ''}`}>
      <div className="flex h-60 w-36 flex-col rounded-[1.4rem] border border-line-strong bg-bg p-2 sm:h-72 sm:w-44">
        <span className="mx-auto mb-2 h-1 w-8 rounded-full bg-line-strong" />
        <div className="flex flex-1 flex-col gap-1.5 overflow-hidden rounded-[0.9rem] bg-surface-2 p-2">{children}</div>
      </div>
      <div className="mt-3 text-center text-xs">{label}</div>
    </div>
  );
}

function MobileVisual({ lang }: { lang: Lang }) {
  const bubbles = [
    { me: true, text: T(lang, '¿Qué pendientes tengo hoy?', 'What is on my list today?') },
    { me: false, text: T(lang, 'Tres visitas y un reporte por enviar.', 'Three visits and one report to send.') },
    { me: true, text: T(lang, 'Ordénalas por ruta', 'Sort them by route') },
  ];
  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 items-center justify-center gap-4 sm:gap-8">
        <Phone dim label={<><p className="text-muted">Java</p><p className="text-subtle">{T(lang, 'solo Android', 'Android only')}</p></>}>
          {[70, 90, 55, 80, 65].map((w) => (
            <span key={w} className="h-2 rounded bg-line" style={{ width: `${w}%` }} />
          ))}
        </Phone>

        <Glyph name="right" size={22} className="shrink-0 text-accent" />

        <Phone label={<><p className="text-ink">React Native</p><p className="text-accent">Android + iOS</p></>}>
          {bubbles.map((b, i) => (
            <span
              key={i}
              className={`j-pop max-w-[88%] rounded-md px-2 py-1 text-[0.68rem] leading-snug ${
                b.me ? 'self-end bg-accent text-accent-contrast' : 'self-start border border-line bg-surface text-ink'
              }`}
              style={{ animationDelay: `${400 + i * 700}ms` }}
            >
              {!b.me && <Glyph name="spark" size={9} className="mr-1 inline text-accent" />}
              {b.text}
            </span>
          ))}
        </Phone>
      </div>
      <p className="mt-4 text-center text-xs text-subtle">{T(lang, 'Menos de un año hasta una versión estable', 'Under a year to a stable release')}</p>
    </div>
  );
}

function EcosystemVisual({ lang }: { lang: Lang }) {
  const original = [T(lang, 'Aplicaciones', 'Apps'), T(lang, 'Listas', 'Lists'), T(lang, 'Entidades', 'Entities'), T(lang, 'Perfiles', 'Profiles'), T(lang, 'Flujos', 'Workflows')];
  const added = [T(lang, 'Usuarios', 'Users'), 'Roles', T(lang, 'Base de datos', 'Database'), T(lang, 'Config. Insight', 'Insight config')];

  return (
    <div className="flex h-full flex-col gap-5">
      <div>
        <p className="eyebrow">Builder</p>
        <div className="mt-2 grid items-center gap-2 sm:grid-cols-[minmax(0,1fr)_1.5rem_minmax(0,1fr)_1.5rem_minmax(0,1.6fr)]">
          <Node>
            Hermes
            <span className="block text-[0.65rem] text-subtle">Microsoft Teams</span>
          </Node>
          <Wire />
          <Node active>MCP Builder</Node>
          <Wire />
          <div className="rounded-md border border-line-strong p-2">
            <p className="flex items-center justify-between text-xs text-ink">
              {T(lang, 'Orquestador', 'Orchestrator')}
              <span className="chip !px-1.5 !py-0 !text-[0.6rem]">{T(lang, 'caché', 'cache')}</span>
            </p>
            <ul className="mt-1.5 flex flex-wrap gap-1">
              {original.map((a) => (
                <li key={a} className="rounded border border-line px-1.5 py-0.5 text-[0.6rem] text-muted">
                  {a}
                </li>
              ))}
              {added.map((a, i) => (
                <li key={a} className="j-pop rounded border border-accent/50 px-1.5 py-0.5 text-[0.6rem] text-accent" style={{ animationDelay: `${300 + i * 160}ms` }}>
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-2 text-[0.68rem] text-subtle">
          {T(lang, 'Varios espacios de trabajo a la vez, por medio del orquestador.', 'Several workspaces at once, through the orchestrator.')}
        </p>
      </div>

      <div>
        <p className="eyebrow">Insight</p>
        <div className="mt-2 grid items-center gap-2 sm:grid-cols-[minmax(0,1fr)_1.5rem_minmax(0,1fr)_1.5rem_minmax(0,1.6fr)]">
          <div className="grid gap-1.5">
            <Node>Claude</Node>
            <Node>Copilot</Node>
          </div>
          <Wire />
          <Node active>MCP Insight</Node>
          <Wire />
          <div className="rounded-md border border-line-strong p-2">
            <p className="text-xs text-ink">Tools Insight</p>
            <p className="mt-1 text-[0.65rem] text-subtle">
              {T(lang, 'Sin pasar por el agente: solo las tools, con el mismo aislamiento por espacio.', 'No agent in between: just the tools, with the same per-workspace isolation.')}
            </p>
          </div>
        </div>
      </div>

      <p className="mt-auto text-[0.68rem] text-subtle">
        {T(lang, 'Hermes lo construyó el líder de plataforma; yo construí los MCP de Builder e Insight.', 'Hermes was built by our platform lead; I built the Builder and Insight MCP servers.')}
      </p>
    </div>
  );
}

function Stat({ value, label, delay }: { value: number; label: string; delay: number }) {
  const v = useCountUp(value, 1200 + delay);
  return (
    <li className="j-pop border-t border-line pt-3" style={{ animationDelay: `${delay}ms` }}>
      <span className="tnum block font-serif text-4xl leading-none text-ink sm:text-5xl">{Math.round(v)}</span>
      <span className="mt-2 block text-xs leading-snug text-subtle">{label}</span>
    </li>
  );
}

function ClosingVisual({ lang, labels, onLeave }: { lang: Lang; labels: JourneyLabels; onLeave: () => void }) {
  const stats = [
    { value: 10, label: T(lang, 'agentes en Builder, de 6 iniciales', 'agents in Builder, up from 6') },
    { value: 2, label: T(lang, 'servidores MCP en producción', 'MCP servers in production') },
    { value: 1, label: T(lang, 'runtime multi-tenant para todos los clientes', 'multi-tenant runtime for every client') },
    { value: 3, label: T(lang, 'años de una Raspberry Pi a sistemas multiagente', 'years from a Raspberry Pi to multi-agent systems') },
  ];
  return (
    <div className="flex h-full flex-col">
      <ul className="grid grid-cols-2 gap-x-6 gap-y-6">
        {stats.map((s, i) => (
          <Stat key={s.label} value={s.value} label={s.label} delay={i * 150} />
        ))}
      </ul>
      <div className="mt-auto flex flex-wrap gap-2.5 pt-8">
        <a href="#contacto" onClick={onLeave} className="btn btn-primary">
          {labels.ctaContact}
          <Glyph name="right" size={15} />
        </a>
        <a href="#proyectos" onClick={onLeave} className="btn btn-ghost">
          {labels.ctaProjects}
        </a>
      </div>
    </div>
  );
}

// ------------------------------------------------------------------ stage

export default function JourneyStage({ chapters, acts, layers, lang, labels }: Props) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [canFullscreen, setCanFullscreen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const touch = useRef<{ x: number; y: number } | null>(null);

  const last = chapters.length - 1;
  const chapter = chapters[index];

  const go = useCallback(
    (next: number) => {
      const clamped = Math.max(0, Math.min(last, next));
      setIndex(clamped);
      // Keep roving focus on the rail when the visitor is driving it from the keyboard.
      if (rootRef.current?.querySelector('[role="tablist"]')?.contains(document.activeElement)) {
        tabRefs.current[clamped]?.focus();
      }
    },
    [last]
  );

  // Autoplay advances one chapter per dwell and stops on the last one.
  useEffect(() => {
    if (!playing) return;
    if (index >= last) {
      setPlaying(false);
      return;
    }
    const id = window.setTimeout(() => setIndex((i) => Math.min(i + 1, last)), DWELL_MS);
    return () => window.clearTimeout(id);
  }, [playing, index, last]);

  useEffect(() => {
    setCanFullscreen(Boolean(document.fullscreenEnabled));
    const onChange = () => setFullscreen(document.fullscreenElement === rootRef.current);
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
      return;
    }
    rootRef.current
      ?.requestFullscreen()
      .then(() => rootRef.current?.focus())
      .catch(() => {});
  }, []);

  const leaveFullscreen = useCallback(() => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  }, []);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      // Sliders and other inputs own their arrow keys.
      if ((event.target as HTMLElement).closest('input, textarea, select')) return;
      const keys: Record<string, () => void> = {
        ArrowRight: () => go(index + 1),
        ArrowLeft: () => go(index - 1),
        PageDown: () => go(index + 1),
        PageUp: () => go(index - 1),
        Home: () => go(0),
        End: () => go(last),
      };
      const action = keys[event.key];
      if (!action) return;
      event.preventDefault();
      action();
    },
    [go, index, last]
  );

  const onTouchStart = useCallback((event: React.TouchEvent) => {
    if ((event.target as HTMLElement).closest('input')) return;
    const t = event.touches[0];
    touch.current = { x: t.clientX, y: t.clientY };
  }, []);

  const onTouchEnd = useCallback(
    (event: React.TouchEvent) => {
      const start = touch.current;
      touch.current = null;
      if (!start) return;
      const t = event.changedTouches[0];
      const dx = t.clientX - start.x;
      const dy = t.clientY - start.y;
      if (Math.abs(dx) < 56 || Math.abs(dx) < Math.abs(dy) * 1.4) return;
      go(index + (dx < 0 ? 1 : -1));
    },
    [go, index]
  );

  /** Every concept with the chapter that taught it, in order of appearance. */
  const concepts = useMemo(
    () => chapters.flatMap((ch, ci) => ch.learned.map((concept) => ({ ...concept, chapter: ci }))),
    [chapters]
  );
  const unlocked = concepts.filter((x) => x.chapter <= index).length;

  /** Column spans for the act labels above the rail. */
  const actSpans = useMemo(
    () =>
      acts.map((label, a) => {
        const members = chapters.map((ch, i) => (ch.act === a ? i : -1)).filter((i) => i >= 0);
        return { label: label[lang], from: members[0], to: members[members.length - 1], a };
      }),
    [acts, chapters, lang]
  );

  const n = chapters.length;
  const inset = 100 / (2 * n);
  const progress = last === 0 ? 0 : index / last;

  const visual = (() => {
    switch (chapter.visual) {
      case 'vision':
        return <VisionVisual lang={lang} />;
      case 'pipeline':
        return <PipelineVisual lang={lang} />;
      case 'sampling':
        return <SamplingVisual lang={lang} />;
      case 'cloud':
        return <CloudVisual lang={lang} />;
      case 'cert':
        return <CertVisual lang={lang} />;
      case 'builder-v1':
        return <BuilderV1Visual lang={lang} />;
      case 'insight':
        return <InsightVisual lang={lang} />;
      case 'multi-agent':
        return <MultiAgentVisual lang={lang} />;
      case 'mobile':
        return <MobileVisual lang={lang} />;
      case 'ecosystem':
        return <EcosystemVisual lang={lang} />;
      case 'closing':
        return <ClosingVisual lang={lang} labels={labels} onLeave={leaveFullscreen} />;
    }
  })();

  const illustrative = ['vision', 'builder-v1', 'insight', 'multi-agent', 'mobile', 'sampling'].includes(chapter.visual);

  return (
    <div
      ref={rootRef}
      tabIndex={-1}
      onKeyDown={onKeyDown}
      className={`journey outline-none ${fullscreen ? 'overflow-y-auto bg-bg px-5 py-8 sm:px-10 lg:px-16 lg:py-12' : ''}`}
    >
      <div className={fullscreen ? 'mx-auto flex min-h-full max-w-[84rem] flex-col' : ''}>
        {/* ---- act labels */}
        <div className="mb-3 hidden sm:grid" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }} aria-hidden="true">
          {actSpans.map((s) => (
            <div
              key={s.a}
              className="px-1"
              style={{ gridColumn: `${s.from + 1} / ${s.to + 2}` }}
            >
              <div className={`border-b pb-1.5 text-center eyebrow transition-colors duration-300 ${chapter.act === s.a ? 'border-accent eyebrow-accent' : 'border-line'}`}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* ---- rail */}
        <div className="relative">
          <div className="absolute top-3 h-px bg-line sm:top-[0.875rem]" style={{ left: `${inset}%`, right: `${inset}%` }} aria-hidden="true">
            <div
              className="h-full origin-left bg-accent transition-transform duration-500 ease-out"
              style={{ transform: `scaleX(${progress})` }}
            />
          </div>
          <div role="tablist" aria-label={labels.chapters} className="relative grid" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
            {chapters.map((ch, i) => {
              const selected = i === index;
              const passed = i < index;
              return (
                <button
                  key={ch.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`journey-tab-${ch.id}`}
                  aria-selected={selected}
                  aria-controls="journey-panel"
                  aria-label={`${ch.period[lang]} · ${ch.title[lang]}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => go(i)}
                  className="group flex flex-col items-center gap-2 outline-offset-4"
                >
                  <span
                    className={`tnum grid h-6 w-6 place-items-center rounded-full border text-[0.55rem] transition-all duration-300 sm:h-7 sm:w-7 sm:text-[0.62rem] ${
                      selected
                        ? 'scale-110 border-accent bg-accent text-accent-contrast'
                        : passed
                          ? 'border-accent bg-bg text-accent'
                          : 'border-line-strong bg-bg text-subtle group-hover:border-ink group-hover:text-ink'
                    }`}
                  >
                    {i === last ? <Glyph name="spark" size={11} /> : pad(i + 1)}
                  </span>
                  <span className={`hidden text-[0.65rem] leading-tight transition-colors md:block ${selected ? 'text-ink' : 'text-subtle'}`}>
                    {ch.period[lang]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ---- controls */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => go(index - 1)}
              disabled={index === 0}
              aria-label={labels.prev}
              className="grid h-9 w-9 place-items-center rounded border border-line text-muted transition-colors hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-35"
            >
              <Glyph name="left" />
            </button>
            <span className="tnum w-16 text-center text-sm text-subtle" aria-live="polite">
              <span className="text-ink">{pad(index + 1)}</span> / {pad(n)}
            </span>
            <button
              type="button"
              onClick={() => go(index + 1)}
              disabled={index === last}
              aria-label={labels.next}
              className="grid h-9 w-9 place-items-center rounded border border-line text-muted transition-colors hover:border-accent hover:text-accent disabled:pointer-events-none disabled:opacity-35"
            >
              <Glyph name="right" />
            </button>
            <span className="ml-3 hidden text-xs text-subtle lg:inline">{labels.keysHint}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => {
                if (!playing && index === last) setIndex(0);
                setPlaying((p) => !p);
              }}
              aria-pressed={playing}
              className="btn btn-ghost !px-3 !py-2 !text-xs"
            >
              <Glyph name={playing ? 'pause' : 'play'} size={13} />
              {playing ? labels.pause : labels.play}
            </button>
            {canFullscreen && (
              <button type="button" onClick={toggleFullscreen} className="btn btn-primary !px-3 !py-2 !text-xs">
                <Glyph name={fullscreen ? 'shrink' : 'expand'} size={13} />
                {fullscreen ? labels.exitPresent : labels.present}
              </button>
            )}
          </div>
        </div>

        <div className="mt-3 h-px bg-line" aria-hidden="true">
          {playing && <div key={index} className="j-progress h-full bg-accent" style={{ animationDuration: `${DWELL_MS}ms` }} />}
        </div>

        {/* ---- chapter */}
        <div
          id="journey-panel"
          role="tabpanel"
          aria-labelledby={`journey-tab-${chapter.id}`}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className={`mt-8 grid gap-8 lg:grid-cols-2 lg:gap-12 ${fullscreen ? 'flex-1 lg:items-center' : 'lg:min-h-[31rem]'}`}
        >
          <article key={chapter.id} className="j-enter flex min-w-0 flex-col">
            <p className="eyebrow">
              <span className="eyebrow-accent tnum">{chapter.period[lang]}</span>
              <span className="mx-2">·</span>
              {chapter.place[lang]}
            </p>
            <h3 className={`mt-3 font-serif leading-[1.1] tracking-[-0.012em] text-ink ${fullscreen ? 'text-4xl lg:text-[3.25rem]' : 'text-[1.9rem] md:text-[2.4rem]'}`}>
              {chapter.title[lang]}
            </h3>
            <div className={`mt-5 space-y-3 leading-relaxed text-muted ${fullscreen ? 'text-base lg:text-lg' : 'text-[0.9375rem]'}`}>
              {chapter.story[lang].map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            {chapter.points && (
              <>
                <h4 className="eyebrow mt-6">{labels.bring}</h4>
                <ul className="mt-3 space-y-2.5">
                  {chapter.points[lang].map((p, i) => (
                    <li key={p} className="j-pop flex gap-3 text-sm leading-relaxed text-ink" style={{ animationDelay: `${200 + i * 120}ms` }}>
                      <Glyph name="check" size={15} className="mt-0.5 shrink-0 text-accent" />
                      {p}
                    </li>
                  ))}
                </ul>
              </>
            )}

            {chapter.learned.length > 0 && (
              <>
                <h4 className="eyebrow mt-6">{labels.learned}</h4>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {chapter.learned.map((concept, i) => (
                    <li key={concept.label.en} className="chip chip-accent j-pop" style={{ animationDelay: `${150 + i * 70}ms` }}>
                      {concept.label[lang]}
                    </li>
                  ))}
                </ul>
              </>
            )}

            <blockquote className="mt-auto border-l-2 border-accent pl-4 pt-1 font-serif text-lg italic leading-snug text-ink max-lg:mt-7 lg:mt-8">
              {chapter.lesson[lang]}
            </blockquote>
          </article>

          <figure key={`v-${chapter.id}`} className="card j-enter relative flex min-h-[20rem] min-w-0 flex-col p-4 sm:p-6 lg:min-h-[28rem]" style={{ animationDelay: '80ms' }}>
            {visual}
            {illustrative && (
              <figcaption className="pointer-events-none absolute right-3 top-3 text-[0.6rem] uppercase tracking-[0.12em] text-subtle">
                {labels.illustrative}
              </figcaption>
            )}
          </figure>
        </div>

        {/* ---- accumulated stack */}
        <div className="mt-12 border-t border-line pt-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h4 className="eyebrow">{labels.stack}</h4>
            <p className="tnum text-sm text-subtle">
              <span className="text-ink">{unlocked}</span> / {concepts.length} {labels.concepts}
            </p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
            {LAYER_ORDER.map((layer) => {
              const items = concepts.filter((x) => x.layer === layer);
              const have = items.filter((x) => x.chapter <= index).length;
              return (
                <div key={layer} className="min-w-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-xs text-ink">{layers[layer][lang]}</p>
                    <p className="tnum text-[0.65rem] text-subtle">
                      {have}/{items.length}
                    </p>
                  </div>
                  <div className="mt-1.5 h-0.5 rounded-full bg-surface-2">
                    <div className="h-full rounded-full bg-accent transition-[width] duration-500" style={{ width: `${(have / items.length) * 100}%` }} />
                  </div>
                  <ul className="mt-2.5 flex flex-wrap gap-1">
                    {items.map((x) =>
                      x.chapter <= index ? (
                        <li key={x.label.en}>
                          <button
                            type="button"
                            onClick={() => {
                              setPlaying(false);
                              go(x.chapter);
                            }}
                            className={`rounded border px-1.5 py-0.5 text-[0.68rem] transition-colors ${
                              x.chapter === index && chapter.learned.length > 0
                                ? 'j-pop border-accent/50 text-accent'
                                : 'border-line text-muted hover:border-line-strong hover:text-ink'
                            }`}
                          >
                            {x.label[lang]}
                          </button>
                        </li>
                      ) : (
                        <li key={x.label.en} aria-hidden="true" className="h-[1.3rem] w-10 rounded border border-dashed border-line" />
                      )
                    )}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
