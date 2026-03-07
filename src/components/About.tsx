import { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring, MotionValue } from 'framer-motion';
import { EditorialAboutText } from './ui/magic-text';

// ─── Design tokens ────────────────────────────────────────────────────────────
// No solid black. Metallic whites. Dark charcoals.
const T = {
  bg:          '#0D0D0D',               // near-black charcoal
  cardMid:     '#131415',               // darker centre
  borderFaint: 'rgba(200,198,193,0.08)',
  silver:      '#d2d3d4',               // metallic silver
  platinum:    '#E8E6E1',               // warm platinum — primary text
  mist:        '#a6a4a2',               // mid-silver — secondary text
} as const;

// ─── Font loader + card typography cascade ────────────────────────────────────
function FontLoader() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

      .about-card-body {
        font-family: 'DM Sans', 'Helvetica Neue', sans-serif;
        font-size: clamp(0.875rem, 2.2vw, 1rem);
        line-height: 1.78;
        font-weight: 300;
        color: ${T.mist};
        letter-spacing: 0.01em;
      }
      .about-card-body h1,
      .about-card-body h2,
      .about-card-body h3 {
        font-family: 'Cormorant Garamond', Georgia, serif;
        font-weight: 300;
        font-style: italic;
        color: ${T.platinum};
        letter-spacing: -0.01em;
        line-height: 1.2;
        margin: 0 0 1.15rem 0;
        font-size: clamp(1.6rem, 4.5vw, 2.1rem);
      }
      .about-card-body p {
        margin: 0 0 1.05rem 0;
      }
      .about-card-body p:last-child { margin-bottom: 0; }
      .about-card-body a {
        color: ${T.platinum};
        text-decoration: underline;
        text-decoration-color: [rgba(200,198,193,0.3)];
        text-underline-offset: 3px;
        transition: text-decoration-color 0.2s;
      }
      .about-card-body a:hover { text-decoration-color: ${T.platinum}; }

      @media (max-width: 480px) {
        .about-card-body { font-size: 0.88rem; line-height: 1.72; }
      }
    `}</style>
  );
}

// ─── Floating decorative shapes ───────────────────────────────────────────────
function FloatShape({
  children, x, y, delay = 0, duration = 5, amplitude = 10, rotate = 0, opacity = 0.18,
}: {
  children: React.ReactNode; x: string; y: string;
  delay?: number; duration?: number; amplitude?: number; rotate?: number; opacity?: number;
}) {
  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'absolute', left: x, top: y, color: T.silver, opacity,
        userSelect: 'none', pointerEvents: 'none',
        fontSize: 'clamp(14px, 2.2vw, 26px)', rotate,
      }}
      animate={{ y: [0, -amplitude, 0], rotate: [rotate, rotate + 8, rotate] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}

function BgStar({ x, y, size = 40, opacity = 0.08, delay = 0 }: {
  x: string; y: string; size?: number; opacity?: number; delay?: number;
}) {
  return (
    <motion.div
      aria-hidden="true"
      style={{ position: 'absolute', left: x, top: y, pointerEvents: 'none', opacity }}
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 18 + delay * 4, delay, repeat: Infinity, ease: 'linear' }}
    >
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
        <path d="M20 2 L21.5 18 L36 20 L21.5 22 L20 38 L18.5 22 L4 20 L18.5 18 Z" fill={T.silver} />
        <path d="M20 8 L21 18.5 L30 20 L21 21.5 L20 32 L19 21.5 L10 20 L19 18.5 Z"
          fill={T.silver} opacity="0.45" transform="rotate(45 20 20)" />
      </svg>
    </motion.div>
  );
}

function BgCircle({ x, y, size = 60, opacity = 0.07, delay = 0 }: {
  x: string; y: string; size?: number; opacity?: number; delay?: number;
}) {
  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'absolute', left: x, top: y, pointerEvents: 'none',
        opacity, borderRadius: '50%', border: `1px solid ${T.silver}`,
        width: size, height: size,
      }}
      animate={{ scale: [1, 1.07, 1] }}
      transition={{ duration: 6 + delay, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

// ─── Corner accent ────────────────────────────────────────────────────────────
function CornerAccent({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) {
  const rotations = { tl: 0, tr: 90, br: 180, bl: 270 };
  const placements: Record<string, React.CSSProperties> = {
    tl: { top: 14, left: 14 },
    tr: { top: 14, right: 14 },
    br: { bottom: 14, right: 14 },
    bl: { bottom: 14, left: 14 },
  };
  return (
    <div aria-hidden="true" style={{
      position: 'absolute', width: 22, height: 22, opacity: 0.6,
      transform: `rotate(${rotations[position]}deg)`, ...placements[position],
    }}>
      <svg viewBox="0 0 28 28" fill="none">
        <path d="M2 26 L2 2 L26 2" stroke={`#0A0A0A`} strokeWidth="1"
          strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="2" cy="2" r="1.8" fill={`#0A0A0A`} />
      </svg>
    </div>
  );
}

// ─── Metallic silver rotating border ─────────────────────────────────────────
function MetallicBorderRing() {
  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'absolute', inset: 10, borderRadius: 22, padding: 1,
        background: [
          'conic-gradient(from 0deg,',
          '  transparent 10%,',
          '  rgba(180,178,173,0.35) 15%,',
          '  rgba(232,230,225,0.8) 30%,',
          '  rgba(200,198,193,0.45) 45%,',
          '  transparent 60%,',
          '  rgba(150,148,143,0.25) 75%,',
          '  rgba(232,230,225,0.55) 85%,',
          '  transparent 100%',
          ')',
        ].join(''),
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
        pointerEvents: 'none',
      }}
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
    />
  );
}


// ─── Metallic inner orbs ──────────────────────────────────────────────────────
function InnerOrbs() {
  return (
    <>
      <div aria-hidden="true" style={{
        position: 'absolute', top: -40, left: -30, width: 200, height: 200,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(200,198,193,0.06) 0%, transparent 70%)',
        filter: 'blur(14px)', pointerEvents: 'none',
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: -30, right: -20, width: 160, height: 160,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(232,230,225,0.04) 0%, transparent 90%)',
        filter: 'blur(18px)', pointerEvents: 'none',
      }} />
    </>
  );
}


// ─── 3D tilt card ─────────────────────────────────────────────────────────────
function TiltCard({ children }: { children: React.ReactNode }) {
  const cardRef    = useRef<HTMLDivElement>(null);
  const rawX       = useMotionValue(0);
  const rawY       = useMotionValue(0);
  const rotateX    = useSpring(useTransform(rawY, [-0.5, 0.5], [8, -8]),  { stiffness: 220, damping: 30 });
  const rotateY    = useSpring(useTransform(rawX, [-0.5, 0.5], [-8, 8]),  { stiffness: 220, damping: 30 });
  const glareOpacity = useSpring(0, { stiffness: 200, damping: 30 });
  const [hovered, setHovered] = useState(false);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current; if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    rawX.set((e.clientX - left) / width - 0.5);
    rawY.set((e.clientY - top) / height - 0.5);
  };
  const onMouseEnter = () => { glareOpacity.set(1); setHovered(true); };
  const onMouseLeave = () => { rawX.set(0); rawY.set(0); glareOpacity.set(0); setHovered(false); };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX, rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
        borderRadius: 22,
        willChange: 'transform',
        position: 'relative',
        cursor: 'default',
      }}
      whileHover={{ scale: 1.012 }}
      transition={{ scale: { type: 'spring', stiffness: 280, damping: 30 } }}
    >
      <MetallicBorderRing />

      {/* Card surface */}
      <div style={{
        background: 'linear-gradient(150deg, #a6a4a2 0%, #d1d0cf 55%, #323233 100%)',
        borderRadius: 20,
        padding: 'clamp(1.75rem, 5vw, 2.75rem)',
        
        border: `1px solid ${T.borderFaint}`,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <InnerOrbs />
        <CornerAccent position="tl" />
        <CornerAccent position="tr" />
        <CornerAccent position="bl" />
        <CornerAccent position="br" />

        {/* Top gleam */}
        <div aria-hidden="true" style={{
          position: 'absolute', top: 0, left: '20%', right: '20%', height: 1,
          background: 'linear-gradient(90deg, transparent, #0A0A0A, transparent)',
          pointerEvents: 'none',
        }} />

        {/* Typography-cascaded content */}
        <div className="about-card-body" style={{ position: 'relative', zIndex: 5 }}>
          {children}
        </div>
      </div>
    </motion.div>
  );
}

// ─── About section ────────────────────────────────────────────────────────────
export default function About() {
  const sectionRef = useRef<HTMLElement>(null!);

  return (
    <section
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

      {/* Dot grid */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.022,
        backgroundImage: `radial-gradient(circle at 1px 1px, ${T.silver} 1px, transparent 0)`,
        backgroundSize: '28px 28px',
      }} />

      {/* Background decorations */}
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

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 10,
        width: '100%', maxWidth: '1200px',
        margin: '0 auto',
        padding: 'clamp(3rem, 8vw, 7rem) clamp(1rem, 5vw, 4rem)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            color: T.mist,
            fontSize: 'clamp(0.58rem, 1.1vw, 0.68rem)',
            fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif",
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            marginBottom: 'clamp(1.25rem, 3vw, 2.25rem)',
            display: 'flex', alignItems: 'center', gap: '12px',
          }}
        >
          <span style={{ width: 22, height: '1px', background: T.mist, opacity: 0.38, display: 'inline-block' }} />
          About
          <span style={{ width: 22, height: '1px', background: T.mist, opacity: 0.38, display: 'inline-block' }} />
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: '100%', maxWidth: 'min(640px, 92vw)' }}
        >
          <TiltCard>
            <EditorialAboutText />
          </TiltCard>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.55 }}
          style={{
            marginTop: 'clamp(2rem, 5vw, 3.5rem)',
            display: 'flex', alignItems: 'center', gap: '8px',
            color: T.mist, opacity: 0.3,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase',
          }}
        >
          <motion.span
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          >↓</motion.span>
          scroll
        </motion.div>
      </div>
    </section>
  );
}