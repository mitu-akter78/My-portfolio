import { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { EditorialAboutText } from './ui/magic-text';

const T = {
  borderFaint: 'rgba(200,198,193,0.06)',
  silver:      '#d2d3d4',
  platinum:    '#E8E6E1',
  mist:        '#a6a4a2',
} as const;

function FontLoader() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');
      .about-card-body {
        font-family: 'DM Sans', 'Helvetica Neue', sans-serif;
        font-size: clamp(0.875rem, 2.2vw, 1rem);
        line-height: 1.78;
        font-weight: 300;
        letter-spacing: 0.01em;
      }
      .about-card-body h1, .about-card-body h2, .about-card-body h3 {
        font-family: 'Cormorant Garamond', Georgia, serif;
        font-weight: 300;
        font-style: italic;
        letter-spacing: -0.01em;
        line-height: 1.2;
        margin: 0 0 1.15rem 0;
        font-size: clamp(1.6rem, 4.5vw, 2.1rem);
      }
      .about-card-body p { margin: 0 0 1.05rem 0; }
      .about-card-body p:last-child { margin-bottom: 0; }
      .about-card-body a { text-decoration: underline; text-underline-offset: 3px; transition: opacity 0.2s; }
      .about-card-body a:hover { opacity: 0.6; }
      @media (max-width: 480px) {
        .about-card-body { font-size: 0.88rem; line-height: 1.72; }
      }
    `}</style>
  );
}

function FloatShape({ children, x, y, delay = 0, duration = 5, amplitude = 10, rotate = 0, opacity = 0.18 }: {
  children: React.ReactNode; x: string; y: string;
  delay?: number; duration?: number; amplitude?: number; rotate?: number; opacity?: number;
}) {
  return (
    <motion.div aria-hidden="true"
      style={{ position: 'absolute', left: x, top: y, color: T.silver, opacity, userSelect: 'none', pointerEvents: 'none', fontSize: 'clamp(14px, 2.2vw, 26px)', rotate }}
      animate={{ y: [0, -amplitude, 0], rotate: [rotate, rotate + 8, rotate] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    >{children}</motion.div>
  );
}

function BgStar({ x, y, size = 40, opacity = 0.08, delay = 0 }: { x: string; y: string; size?: number; opacity?: number; delay?: number }) {
  return (
    <motion.div aria-hidden="true" style={{ position: 'absolute', left: x, top: y, pointerEvents: 'none', opacity }}
      animate={{ rotate: [0, 360] }} transition={{ duration: 18 + delay * 4, delay, repeat: Infinity, ease: 'linear' }}>
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <path d="M20 2 L21.5 18 L36 20 L21.5 22 L20 38 L18.5 22 L4 20 L18.5 18 Z" fill={T.silver} />
        <path d="M20 8 L21 18.5 L30 20 L21 21.5 L20 32 L19 21.5 L10 20 L19 18.5 Z" fill={T.silver} opacity="0.45" transform="rotate(45 20 20)" />
      </svg>
    </motion.div>
  );
}

function BgCircle({ x, y, size = 60, opacity = 0.07, delay = 0 }: { x: string; y: string; size?: number; opacity?: number; delay?: number }) {
  return (
    <motion.div aria-hidden="true"
      style={{ position: 'absolute', left: x, top: y, pointerEvents: 'none', opacity, borderRadius: '50%', border: `1px solid ${T.silver}`, width: size, height: size }}
      animate={{ scale: [1, 1.07, 1] }} transition={{ duration: 6 + delay, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

function CornerAccent({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) {
  const rotations = { tl: 0, tr: 90, br: 180, bl: 270 };
  const placements: Record<string, React.CSSProperties> = {
    tl: { top: 14, left: 14 }, tr: { top: 14, right: 14 }, br: { bottom: 14, right: 14 }, bl: { bottom: 14, left: 14 },
  };
  return (
    <div aria-hidden="true" style={{ position: 'absolute', width: 22, height: 22, opacity: 0.2, transform: `rotate(${rotations[position]}deg)`, ...placements[position] }}>
      <svg viewBox="0 0 28 28" fill="none">
        <path d="M2 26 L2 2 L26 2" stroke="#E8E6E1" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="2" cy="2" r="1.8" fill="#E8E6E1" />
      </svg>
    </div>
  );
}

function MetallicBorderRing() {
  return (
    <motion.div aria-hidden="true"
      style={{
        position: 'absolute', inset: '10px', borderRadius: 22, padding: 1,
        background: ['conic-gradient(from 0deg,', '  transparent 10%,', '  rgba(180,178,173,0.18) 15%,', '  rgba(232,230,225,0.4) 30%,', '  rgba(200,198,193,0.22) 45%,', '  transparent 60%,', '  rgba(150,148,143,0.12) 75%,', '  rgba(232,230,225,0.28) 85%,', '  transparent 100%', ')'].join(''),
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor', maskComposite: 'exclude', pointerEvents: 'none',
      }}
      animate={{ rotate: [0, 360] }} transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
    />
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────
//
// BG transition fix: instead of animating between a gradient string and a hex
// color (which framer-motion cannot interpolate), we stack two divs:
//   • bottom: silver gradient — always present, full opacity
//   • top:    solid black — fades from opacity 0 → 1 on hover
// That way the transition is a simple opacity cross-fade, which is perfectly smooth.
//
// Reveal region: increased mask radius to 160px with a longer soft falloff.
//
function TiltCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const rawX    = useMotionValue(0);
  const rawY    = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [8, -8]), { stiffness: 220, damping: 30 });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-8, 8]), { stiffness: 220, damping: 30 });

  const rawCursorX = useMotionValue(0);
  const rawCursorY = useMotionValue(0);
  const cursorX    = useSpring(rawCursorX, { stiffness: 400, damping: 35 });
  const cursorY    = useSpring(rawCursorY, { stiffness: 400, damping: 35 });

  // Mask: solid centre at cursor fading out at 160px
  const maskImage = useTransform(
    [cursorX, cursorY] as const,
    ([x, y]: number[]) =>
      `radial-gradient(circle 160px at ${x}px ${y}px, black 0%, black 40%, transparent 100%)`,
  );

  const [hovered, setHovered] = useState(false);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current; if (!el) return;
    const rect = el.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width  - 0.5);
    rawY.set((e.clientY - rect.top)  / rect.height - 0.5);
    rawCursorX.set(e.clientX - rect.left);
    rawCursorY.set(e.clientY - rect.top);
  };

  const onMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current; if (!el) return;
    const rect = el.getBoundingClientRect();
    rawCursorX.jump(e.clientX - rect.left);
    rawCursorY.jump(e.clientY - rect.top);
    setHovered(true);
  };

  const onMouseLeave = () => {
    rawX.set(0); rawY.set(0);
    setHovered(false);
  };

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

      {/* Outer clip container */}
      <div style={{ borderRadius: 20, position: 'relative', overflow: 'hidden', border: `1px solid ${T.borderFaint}` }}>

        {/* ── BG Layer 1: silver gradient — always underneath ── */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(150deg, #a6a4a2 0%, #d1d0cf 55%, #323233 100%)',
          borderRadius: 20,
        }} />

        {/* ── BG Layer 2: black — fades in on hover, simple opacity transition ── */}
        <div style={{
          position: 'absolute', inset: 0,
          background: '#0a0a0a',
          borderRadius: 20,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }} />

        {/* Card content wrapper (sits above both bg layers) */}
        <div style={{ position: 'relative', padding: pad }}>
          <CornerAccent position="tl" />
          <CornerAccent position="tr" />
          <CornerAccent position="bl" />
          <CornerAccent position="br" />

          {/* ── LAYER A: ghost — two sub-layers cross-fade for smooth color transition ── */}
          {/* Sub A1: original dark ink, visible on silver bg, fades OUT on hover  */}
          <div style={{ position: 'relative', zIndex: 2, opacity: hovered ? 0 : 1, transition: 'opacity 0.7s ease' }}>
            <div className="about-card-body">
              <EditorialAboutText inkColor="#0A0A0A" bodyOpacity={0.85} />
            </div>
          </div>
          {/* Sub A2: dim gray ink, barely visible on black bg, fades IN on hover */}
          <div style={{ position: 'absolute', top: pad, left: pad, right: pad, bottom: pad, zIndex: 3, opacity: hovered ? 1 : 0, transition: 'opacity 0.7s ease', pointerEvents: 'none' }}>
            <div className="about-card-body">
              <EditorialAboutText inkColor="#3a3a3a" bodyOpacity={1} />
            </div>
          </div>

          {/* ── LAYER B: white text, masked to cursor region ── */}
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
            <div className="about-card-body" style={{ color: '#f0ede8' }}>
              <EditorialAboutText inkColor="#f0ede8" bodyOpacity={1} />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null!);

  return (
    <section
      ref={sectionRef}
      style={{ position: 'relative', width: '100%', minHeight: '100svh', background: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center', overflowX: 'clip', overflowY: 'visible' }}
    >
      <FontLoader />

      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.022, backgroundImage: `radial-gradient(circle at 1px 1px, ${T.silver} 1px, transparent 0)`, backgroundSize: '28px 28px' }} />

      <BgStar x="28%" y="4%"  size={52} opacity={0.5}  delay={0}   />
      <BgStar x="82%" y="16%" size={38} opacity={0.6}  delay={0.8} />
      <BgCircle x="10%" y="70%" size={70} opacity={0.18} delay={1} />
      <BgCircle x="78%" y="78%" size={42} opacity={0.12} delay={2} />

      <FloatShape x="7%"  y="18%" delay={0}   duration={5.5} amplitude={12} opacity={0.16} rotate={0}>✳</FloatShape>
      <FloatShape x="84%" y="54%" delay={1}   duration={6}   amplitude={8}  opacity={0.13} rotate={15}>✚</FloatShape>
      <FloatShape x="14%" y="80%" delay={0.6} duration={5}   amplitude={10} opacity={0.11} rotate={-10}>◆</FloatShape>
      <FloatShape x="89%" y="19%" delay={1.8} duration={7}   amplitude={14} opacity={0.11} rotate={30}>✦</FloatShape>
      <FloatShape x="60%" y="5%"  delay={2.1} duration={7.5} amplitude={7}  opacity={0.18} rotate={10}>✦</FloatShape>
      <FloatShape x="35%" y="88%" delay={1.2} duration={6.5} amplitude={11} opacity={0.18} rotate={20}>✚</FloatShape>

      <div style={{ position: 'relative', zIndex: 10, width: '100%', maxWidth: '1200px', margin: '0 auto', padding: 'clamp(3rem, 8vw, 7rem) clamp(1rem, 5vw, 4rem)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        <motion.div
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ color: T.mist, fontSize: 'clamp(0.58rem, 1.1vw, 0.68rem)', fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", letterSpacing: '0.24em', textTransform: 'uppercase', marginBottom: 'clamp(1.25rem, 3vw, 2.25rem)', display: 'flex', alignItems: 'center', gap: '12px' }}
        >
          <span style={{ width: 22, height: '1px', background: T.mist, opacity: 0.38, display: 'inline-block' }} />
          About
          <span style={{ width: 22, height: '1px', background: T.mist, opacity: 0.38, display: 'inline-block' }} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: '100%', maxWidth: 'min(640px, 92vw)' }}
        >
          <TiltCard />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.55 }}
          style={{ marginTop: 'clamp(2rem, 5vw, 3.5rem)', display: 'flex', alignItems: 'center', gap: '8px', color: T.mist, opacity: 0.3, fontFamily: "'DM Sans', sans-serif", fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase' }}
        >
          <motion.span animate={{ y: [0, 4, 0] }} transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}>↓</motion.span>
          scroll
        </motion.div>
      </div>
    </section>
  );
}