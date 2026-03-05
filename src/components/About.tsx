import { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { EditorialAboutText } from './ui/magic-text';


// ─── Floating decorative shape atoms ─────────────────────────────────────────
function FloatShape({
  children,
  x,
  y,
  delay = 0,
  duration = 5,
  amplitude = 10,
  rotate = 0,
  opacity = 0.18,
}: {
  children: React.ReactNode;
  x: string;
  y: string;
  delay?: number;
  duration?: number;
  amplitude?: number;
  rotate?: number;
  opacity?: number;
}) {
  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: x,
        top: y,
        color: '#F2F0EB',
        opacity,
        userSelect: 'none',
        pointerEvents: 'none',
        fontSize: 'clamp(20px, 3vw, 36px)',
        rotate,
      }}
      animate={{ y: [0, -amplitude, 0], rotate: [rotate, rotate + 8, rotate] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}

// ─── SVG burst star (large bg) ────────────────────────────────────────────────
function BgStar({ x, y, size = 40, opacity = 0.08, delay = 0 }: { x: string; y: string; size?: number; opacity?: number; delay?: number }) {
  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: x,
        top: y,
        pointerEvents: 'none',
        userSelect: 'none',
        opacity,
      }}
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 18 + delay * 4, delay, repeat: Infinity, ease: 'linear' }}
    >
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M20 2 L21.5 18 L36 20 L21.5 22 L20 38 L18.5 22 L4 20 L18.5 18 Z"
          fill="#F2F0EB"
        />
        <path
          d="M20 8 L21 18.5 L30 20 L21 21.5 L20 32 L19 21.5 L10 20 L19 18.5 Z"
          fill="#F2F0EB"
          opacity="0.5"
          transform="rotate(45 20 20)"
        />
      </svg>
    </motion.div>
  );
}

// ─── Circle outline shape ─────────────────────────────────────────────────────
function BgCircle({ x, y, size = 60, opacity = 0.07, delay = 0 }: { x: string; y: string; size?: number; opacity?: number; delay?: number }) {
  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: x,
        top: y,
        pointerEvents: 'none',
        userSelect: 'none',
        opacity,
        borderRadius: '50%',
        border: '1.5px solid #F2F0EB',
        width: size,
        height: size,
      }}
      animate={{ scale: [1, 1.08, 1] }}
      transition={{ duration: 6 + delay, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}

// ─── 3D tilt card ─────────────────────────────────────────────────────────────
function TiltCard({ children }: { children: React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 25 });
  const shine = useTransform(rawX, [-0.5, 0.5], ['rgba(255,255,255,0)', 'rgba(255,255,255,0.07)']);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    rawX.set((e.clientX - left) / width - 0.5);
    rawY.set((e.clientY - top) / height - 0.5);
  }

  function handleMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 900,
        borderRadius: '20px',
        willChange: 'transform',
        position: 'relative',
      }}
    >
      {/* Shine layer */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '20px',
          background: shine,
          pointerEvents: 'none',
          zIndex: 10,
        }}
      />

      {/* Card surface */}
      <div
        style={{
          background: '#F2F0EB',
          borderRadius: '20px',
          padding: 'clamp(2rem, 5vw, 3rem)',
          boxShadow: '0 4px 6px rgba(0,0,0,0.07), 0 10px 20px rgba(0,0,0,0.12), 0 30px 60px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.6)',
          border: '1px solid rgba(255,255,255,0.12)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Card inner top-left accent */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, transparent, rgba(10,10,10,0.08), transparent)',
            pointerEvents: 'none',
          }}
        />
        {children}
      </div>
    </motion.div>
  );
}

// ─── Main About section ───────────────────────────────────────────────────────
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
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}
    >

      {/* ── Dot grid texture ─────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: 0.025,
          backgroundImage: 'radial-gradient(circle at 1px 1px, #F2F0EB 1px, transparent 0)',
          backgroundSize: '28px 28px',
        }}
      />


      {/* ── Floating background shapes ────────────────────────────── */}
      <BgStar x="6%" y="12%" size={52} opacity={0.1} delay={0} />
      <BgStar x="88%" y="8%" size={38} opacity={0.08} delay={1.5} />
      <BgStar x="78%" y="78%" size={46} opacity={0.07} delay={0.8} />
      <BgStar x="3%" y="68%" size={30} opacity={0.07} delay={2} />

      <BgCircle x="12%" y="72%" size={80} opacity={0.07} delay={1} />
      <BgCircle x="82%" y="30%" size={55} opacity={0.06} delay={2.5} />
      <BgCircle x="50%" y="5%" size={40} opacity={0.05} delay={0.5} />

      <FloatShape x="8%" y="20%" delay={0} duration={5.5} amplitude={12} opacity={0.22} rotate={0}>✳</FloatShape>
      <FloatShape x="85%" y="55%" delay={1} duration={6} amplitude={8} opacity={0.18} rotate={15}>✚</FloatShape>
      <FloatShape x="15%" y="82%" delay={0.6} duration={5} amplitude={10} opacity={0.16} rotate={-10}>◆</FloatShape>
      <FloatShape x="90%" y="20%" delay={1.8} duration={7} amplitude={14} opacity={0.15} rotate={30}>✦</FloatShape>
      <FloatShape x="70%" y="88%" delay={0.3} duration={5.8} amplitude={9} opacity={0.2} rotate={-5}>✳</FloatShape>
      <FloatShape x="45%" y="90%" delay={1.2} duration={6.5} amplitude={11} opacity={0.14} rotate={20}>✚</FloatShape>
      <FloatShape x="2%" y="45%" delay={0.9} duration={5.2} amplitude={8} opacity={0.18} rotate={-20}>◆</FloatShape>
      <FloatShape x="60%" y="6%" delay={2.1} duration={7.5} amplitude={7} opacity={0.13} rotate={10}>✦</FloatShape>

      {/* ── Vignette gradient ────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 20%, #0A0A0A 60%)',
        }}
      />

      {/* ── Content ──────────────────────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: 'clamp(4rem, 8vw, 7rem) clamp(1.25rem, 5vw, 4rem)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            color: '#F2F0EB',
            fontSize: 'clamp(0.65rem, 1.2vw, 0.75rem)',
            fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            opacity: 0.45,
            marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <span style={{ width: 28, height: '1px', background: '#F2F0EB', opacity: 0.4, display: 'inline-block' }} />
          About Me
          <span style={{ width: 28, height: '1px', background: '#F2F0EB', opacity: 0.4, display: 'inline-block' }} />
        </motion.div>

        {/* Card — constrained width for editorial feel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: '100%', maxWidth: 640 }}
        >
          <TiltCard>
            <EditorialAboutText />
          </TiltCard>
        </motion.div>

        {/* Bottom scroll-hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{
            marginTop: 'clamp(2.5rem, 5vw, 4rem)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: '#F2F0EB',
            opacity: 0.25,
            fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
            fontSize: '0.7rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
          }}
        >
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            ↓
          </motion.span>
          scroll
        </motion.div>
      </div>
    </section>
  );
}