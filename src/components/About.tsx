import { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring, useMotionTemplate } from 'framer-motion';
import { EditorialAboutText } from './ui/magic-text';

// ─── CONTRAST-AUDITED PALETTE ────────────────────────────────────────────────
const T = {
  borderFaint:   'rgba(200,198,193,0.06)',
  silver:        '#D2D3D4',
  platinum:      '#E8E6E1',
  mist:          '#B4B2AF',
  label:         '#C0BEBB',
  hoverBody:     '#C8C5BF',
  spotlightBody: '#F0EDE8',
  bodyOnCard:    '#0A0A0A',
} as const;

// ─────────────────────────────────────────────────────────────────────────────

function FontLoader() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

      .about-card-body {
        font-family: 'DM Sans', 'Helvetica Neue', sans-serif;
        font-size: clamp(0.9rem, 2.2vw, 1rem);
        line-height: 1.78;
        font-weight: 300;
        letter-spacing: 0.01em;
      }
      .about-card-body h1,
      .about-card-body h2,
      .about-card-body h3 {
        font-family: 'Cormorant Garamond', Georgia, serif;
        font-weight: 300;
        font-style: italic;
        letter-spacing: -0.01em;
        line-height: 1.2;
        margin: 0 0 1.15rem 0;
        font-size: clamp(1.6rem, 4.5vw, 2.1rem);
      }
      .about-card-body p            { margin: 0 0 1.05rem 0; }
      .about-card-body p:last-child { margin-bottom: 0; }
      .about-card-body a {
        text-decoration: underline;
        text-underline-offset: 3px;
        transition: opacity 0.2s;
      }
      .about-card-body a:hover { opacity: 0.6; }

      @media (max-width: 480px) {
        .about-card-body { font-size: clamp(0.9rem, 3.5vw, 0.95rem); line-height: 1.72; }
      }

      /* ── Floating shape animations (matches Contact) ── */
      @keyframes about-floatA {
        0%, 100% { transform: translateY(0px)   rotate(0deg);  }
        50%      { transform: translateY(-14px) rotate(8deg);  }
      }
      @keyframes about-floatB {
        0%, 100% { transform: translateY(0px)   rotate(0deg);  }
        50%      { transform: translateY(-10px) rotate(-6deg); }
      }
      @keyframes about-twinkle {
        0%, 100% { opacity: 0.14; transform: scale(1)    rotate(0deg);  }
        50%      { opacity: 0.30; transform: scale(1.18) rotate(18deg); }
      }
      .about-float-shape { position: absolute; pointer-events: none; }
    `}</style>
  );
}

// ─── Floating shapes (identical logic to Contact) ─────────────────────────────

const floatingShapes = [
  { type: 'circle',  size: 6,  x: 8,  y: 14, dur: 9,  delay: 0   },
  { type: 'circle',  size: 4,  x: 18, y: 72, dur: 12, delay: 2   },
  { type: 'circle',  size: 5,  x: 88, y: 28, dur: 10, delay: 1   },
  { type: 'circle',  size: 3,  x: 76, y: 80, dur: 14, delay: 4   },
  { type: 'circle',  size: 4,  x: 52, y: 8,  dur: 11, delay: 3   },
  { type: 'circle',  size: 6,  x: 62, y: 90, dur: 8,  delay: 1.5 },
  { type: 'square',  size: 5,  x: 28, y: 20, dur: 13, delay: 0.5 },
  { type: 'square',  size: 4,  x: 92, y: 58, dur: 10, delay: 2.5 },
  { type: 'square',  size: 6,  x: 38, y: 85, dur: 15, delay: 1   },
  { type: 'diamond', size: 7,  x: 72, y: 15, dur: 11, delay: 0   },
  { type: 'diamond', size: 5,  x: 14, y: 50, dur: 9,  delay: 3   },
  { type: 'diamond', size: 6,  x: 48, y: 60, dur: 13, delay: 2   },
  { type: 'star',    size: 8,  x: 5,  y: 38, dur: 16, delay: 1   },
  { type: 'star',    size: 6,  x: 82, y: 45, dur: 12, delay: 0.5 },
  { type: 'star',    size: 7,  x: 35, y: 5,  dur: 10, delay: 3.5 },
  { type: 'star',    size: 5,  x: 65, y: 70, dur: 14, delay: 2   },
  { type: 'star',    size: 8,  x: 22, y: 92, dur: 11, delay: 0   },
  { type: 'cross',   size: 8,  x: 55, y: 32, dur: 18, delay: 1.5 },
  { type: 'cross',   size: 6,  x: 96, y: 18, dur: 12, delay: 4   },
  { type: 'cross',   size: 7,  x: 10, y: 78, dur: 15, delay: 0.5 },
];

function FloatingShapes() {
  return (
    <>
      {floatingShapes.map((s, i) => {
        const anim = i % 5 === 0 ? 'about-twinkle' : i % 3 === 0 ? 'about-floatB' : 'about-floatA';
        const base: React.CSSProperties = {
          left: `${s.x}%`,
          top:  `${s.y}%`,
          animation: `${anim} ${s.dur}s ease-in-out ${s.delay}s infinite`,
          opacity: 0.14,
        };

        if (s.type === 'circle') return (
          <div key={i} className="about-float-shape" aria-hidden="true" style={{
            ...base, width: s.size, height: s.size,
            borderRadius: '50%', border: '1px solid rgba(255,255,255,0.55)',
          }} />
        );

        if (s.type === 'square') return (
          <div key={i} className="about-float-shape" aria-hidden="true" style={{
            ...base, width: s.size, height: s.size,
            border: '1px solid rgba(255,255,255,0.45)', transform: 'rotate(45deg)',
          }} />
        );

        if (s.type === 'diamond') return (
          <div key={i} className="about-float-shape" aria-hidden="true" style={{
            ...base, width: s.size, height: s.size,
            border: '1px solid rgba(255,255,255,0.40)', borderRadius: '1px',
            transform: 'rotate(45deg)',
          }} />
        );

        if (s.type === 'cross') return (
          <svg key={i} className="about-float-shape" aria-hidden="true"
            width={s.size + 4} height={s.size + 4} viewBox="0 0 12 12"
            style={{ ...base, opacity: 0.18 }}>
            <line x1="6" y1="0" x2="6" y2="12" stroke="white" strokeWidth="1" />
            <line x1="0" y1="6" x2="12" y2="6" stroke="white" strokeWidth="1" />
          </svg>
        );

        // 4-point star
        return (
          <svg key={i} className="about-float-shape" aria-hidden="true"
            width={s.size + 4} height={s.size + 4} viewBox="0 0 14 14"
            style={{ ...base, opacity: 0.22 }}>
            <polygon
              points="7,0 8.5,5.5 14,7 8.5,8.5 7,14 5.5,8.5 0,7 5.5,5.5"
              fill="none" stroke="white" strokeWidth="0.8"
            />
          </svg>
        );
      })}
    </>
  );
}

// ─── Card ────────────────────────────────────────────────────────────────────

function CornerAccent({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) {
  const rotations = { tl: 0, tr: 90, br: 180, bl: 270 };
  const placements: Record<string, React.CSSProperties> = {
    tl: { top: 14, left: 14 }, tr: { top: 14, right: 14 },
    br: { bottom: 14, right: 14 }, bl: { bottom: 14, left: 14 },
  };
  return (
    <div aria-hidden="true" style={{ position: 'absolute', width: 22, height: 22, opacity: 0.22, transform: `rotate(${rotations[position]}deg)`, ...placements[position] }}>
      <svg viewBox="0 0 28 28" fill="none">
        <path d="M2 26 L2 2 L26 2" stroke={T.platinum} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="2" cy="2" r="1.8" fill={T.platinum} />
      </svg>
    </div>
  );
}

function MetallicBorderRing() {
  return (
    <motion.div aria-hidden="true"
      style={{
        position: 'absolute', inset: '10px', borderRadius: 22, padding: 1,
        background: [
          'conic-gradient(from 0deg,',
          '  transparent 10%,',
          '  rgba(180,178,173,0.18) 15%,',
          '  rgba(232,230,225,0.4) 30%,',
          '  rgba(200,198,193,0.22) 45%,',
          '  transparent 60%,',
          '  rgba(150,148,143,0.12) 75%,',
          '  rgba(232,230,225,0.28) 85%,',
          '  transparent 100%',
          ')',
        ].join(''),
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none',
      }}
      animate={{ rotate: [0, 360] }} transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
    />
  );
}

function TiltCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const rawX    = useMotionValue(0);
  const rawY    = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [8, -8]),  { stiffness: 220, damping: 30 });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-8, 8]),  { stiffness: 220, damping: 30 });

  const rawCursorX = useMotionValue(0);
  const rawCursorY = useMotionValue(0);
  const cursorX    = useSpring(rawCursorX, { stiffness: 400, damping: 35 });
  const cursorY    = useSpring(rawCursorY, { stiffness: 400, damping: 35 });

  const maskImage = useMotionTemplate`radial-gradient(circle 160px at ${cursorX}px ${cursorY}px, black 0%, black 40%, transparent 100%)`;

  const [hovered, setHovered] = useState(false);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current; if (!el) return;
    const rect = el.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width  - 0.5);
    rawY.set((e.clientY - rect.top)  / rect.height - 0.5);
    const paddingPx = parseFloat(getComputedStyle(el).paddingLeft);
    rawCursorX.set(e.clientX - rect.left - paddingPx);
    rawCursorY.set(e.clientY - rect.top  - paddingPx);
  };

  const onMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current; if (!el) return;
    const rect = el.getBoundingClientRect();
    const paddingPx = parseFloat(getComputedStyle(el).paddingLeft);
    rawCursorX.jump(e.clientX - rect.left - paddingPx);
    rawCursorY.jump(e.clientY - rect.top  - paddingPx);
    setHovered(true);
  };

  const onMouseLeave = () => { rawX.set(0); rawY.set(0); setHovered(false); };

  const pad = 'clamp(1.75rem, 5vw, 2.75rem)';

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000, borderRadius: 22, willChange: 'transform', position: 'relative', cursor: 'default' }}
      whileHover={{ scale: 1.012 }}
      transition={{ scale: { type: 'spring', stiffness: 280, damping: 30 } }}
    >
      <MetallicBorderRing />
      <div style={{ borderRadius: 20, position: 'relative', overflow: 'hidden', border: `1px solid ${T.borderFaint}` }}>

        <div style={{
          position: 'absolute', inset: 0, borderRadius: 20,
          background: 'linear-gradient(150deg, #a6a4a2 0%, #d1d0cf 55%, #323233 100%)',
        }} />

        <div style={{
          position: 'absolute', inset: 0, borderRadius: 20,
          background: 'rgba(4, 4, 6, 0.85)',
          backdropFilter: hovered ? 'blur(18px) saturate(160%)' : 'blur(0px)',
  WebkitBackdropFilter: hovered ? 'blur(18px) saturate(160%)' : 'blur(0px)',
  boxShadow: hovered ? 'inset 0 0 0 1px rgba(255,255,255,0.08)' : 'none',
  opacity: hovered ? 1 : 0,
  transition: 'opacity 0.4s ease, backdrop-filter 0.4s ease, -webkit-backdrop-filter 0.4s ease',
}} />

        <div style={{ position: 'relative', padding: pad }}>
          <CornerAccent position="tl" />
          <CornerAccent position="tr" />
          <CornerAccent position="bl" />
          <CornerAccent position="br" />

          <div style={{ position: 'relative', zIndex: 2, opacity: hovered ? 0 : 1, transition: 'opacity 0.7s ease' }}>
            <div className="about-card-body">
              <EditorialAboutText inkColor={T.bodyOnCard} bodyOpacity={0.85} />
            </div>
          </div>

          <div style={{
            position: 'absolute', top: pad, left: pad, right: pad, bottom: pad,
            zIndex: 3,
            opacity: hovered ? 1 : 0, transition: 'opacity 0.7s ease',
            pointerEvents: 'none',
          }}>
            <div className="about-card-body">
              <EditorialAboutText inkColor={T.hoverBody} bodyOpacity={0.55} />
            </div>
          </div>

          <motion.div
            style={{
              position: 'absolute',
              top: pad, left: pad, right: pad, bottom: pad,
              zIndex: 4,
              WebkitMaskImage: maskImage,
              maskImage,
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.5s ease',
              willChange: 'mask-image',
              pointerEvents: 'none',
            }}
          >
            <div className="about-card-body" style={{ color: T.spotlightBody }}>
              <EditorialAboutText inkColor={T.spotlightBody} bodyOpacity={1} />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function About() {
  const sectionRef = useRef<HTMLElement>(null!);

  return (
    <section
      id="about-section"
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100svh',
        background: '#0A0A0A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflowX: 'clip',
        overflowY: 'visible',
      }}
    >
      <FontLoader />

      {/* Noise overlay — matches Contact */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        pointerEvents: 'none',
        opacity: 0.035,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundSize: '180px 180px',
      }} />

      {/* Dot grid — matches Contact (32px, opacity 0.022) */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        opacity: 0.022,
        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
        backgroundSize: '32px 32px',
      }} />

      {/* Top rule — matches Contact */}
      <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'rgba(255,255,255,0.06)' }} />

      {/* Floating geometric shapes — identical to Contact */}
      <FloatingShapes />

      <div style={{
        position: 'relative', zIndex: 10,
        width: '100%', maxWidth: '1200px',
        margin: '0 auto',
        padding: 'clamp(3rem, 8vw, 7rem) clamp(1rem, 5vw, 4rem)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>

        {/* Section eyebrow label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            color: T.label,
            fontSize: 'clamp(0.58rem, 1.1vw, 0.68rem)',
            fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
            letterSpacing: '0.24em', textTransform: 'uppercase',
            marginBottom: 'clamp(1.25rem, 3vw, 2.25rem)',
            display: 'flex', alignItems: 'center', gap: '12px',
          }}
        >
          <span style={{ width: 22, height: '1px', background: T.mist, opacity: 0.5, display: 'inline-block' }} />
          About
          <span style={{ width: 22, height: '1px', background: T.mist, opacity: 0.5, display: 'inline-block' }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: '100%', maxWidth: 'min(640px, 92vw)' }}
        >
          <TiltCard />
        </motion.div>

      </div>
    </section>
  );
}