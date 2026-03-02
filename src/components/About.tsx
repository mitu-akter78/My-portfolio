import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MagicText } from './ui/magic-text';
import {Aboutme} from './ui/text-scroll'

// ─── 3D character reveal — used ONLY on the "ABOUT ME" watermark ──────────────
function RevealText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const chars = Array.from(text);

  const getInitial = (i: number) => {
    const seed = (i * 137 + 42) % 360;
    const rotX = ((seed % 3) - 1) * 90;
    const rotY = (((seed * 7) % 3) - 1) * 75;
    const rotZ = (((seed * 13) % 7) - 3) * 18;
    return { rotateX: rotX, rotateY: rotY, rotateZ: rotZ, opacity: 0, scale: 0.6 };
  };

  return (
    <span
      ref={ref}
      className={className}
      style={{ display: 'inline-flex', flexWrap: 'nowrap', perspective: '800px' }}
    >
      {chars.map((char, i) => (
        <motion.span
          key={i}
          style={{
            display: 'inline-block',
            whiteSpace: char === ' ' ? 'pre' : 'normal',
            transformStyle: 'preserve-3d',
            ...(char === ' ' ? { width: '0.3em' } : {}),
          }}
          initial={getInitial(i)}
          animate={
            isInView
              ? { rotateX: 0, rotateY: 0, rotateZ: 0, opacity: 0.1, scale: 1 }
              : getInitial(i)
          }
          transition={{
            duration: 0.6,
            delay: i * 0.04,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {char}
        </motion.span>
      ))}
      <span className="sr-only">{text}</span>
    </span>
  );
}

// ─── Floating character SVG ───────────────────────────────────────────────────
function Character() {
  return (
    <motion.div
      aria-hidden="true"
      className="w-[120px] h-[120px] md:w-[140px] md:h-[140px] rounded-full bg-[#E8E4DC] flex items-center justify-center shadow-lg border-4 border-[#0A0A0A]"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg width="60%" height="60%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="55" r="8" fill="#FFB6C1" opacity="0.6" />
        <circle cx="80" cy="55" r="8" fill="#FFB6C1" opacity="0.6" />
        <path d="M 25 45 Q 35 35 45 45" stroke="#1C1C1C" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M 55 45 Q 65 35 75 45" stroke="#1C1C1C" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M 42 65 Q 50 75 58 65" stroke="#1C1C1C" strokeWidth="4" strokeLinecap="round" fill="none" />
      </svg>
    </motion.div>
  );
}

// ─── Main About section ───────────────────────────────────────────────────────
export default function About() {
   const sectionRef = useRef<HTMLElement>(null);
  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#0A0A0A] flex items-center justify-center overflow-x-clip font-sans">

      {/* Subtle background texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Background watermark — THIS is where the 3D reveal effect lives */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-6 flex justify-center md:justify-end md:top-4 md:pr-12 lg:pr-50 pointer-events-none select-none"
      >
        <Aboutme containerRef={sectionRef} />  
      </div>

      {/* Content container — unchanged from your original */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-center">
        <motion.div
          className="relative w-full md:w-[80%] lg:w-[500px] mt-5 md:mt-0.5 lg:mt-32"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <div className="absolute -top-16 -left-6 md:-top-16 md:-left-16 z-20">
            <Character />
          </div>

          {/* Card — exactly as you had it, MagicText untouched */}
          <div className="bg-[#F2F0EB] rounded-xl p-8 md:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
            <div className="float-left w-[72px] h-[56px] md:w-[80px] md:h-[64px] [shape-outside:circle(50%_at_0%_0%)]" />
            <div className="text-[#5c1d2a] text-[15px] md:text-base leading-[1.7]">
              <MagicText text="  Hi there! I'm Sadia, a full stack developer from bangladesh. Passionate about building clean, performant, and user-friendly applications. I specialize in turning complex problems into elegant digital solutions. <br/> <br/> I work across the full stack — crafting responsive frontends with React and Next.js, building robust backends with Node.js and databases, and deploying scalable apps to the cloud. I care deeply about code quality, developer experience, and writing software that's as readable as it is functional." />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}