"use client"
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillsData = [
  {
    category: 'Frontend',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    tagline: 'Pixel-perfect interfaces',
    description: 'Crafting responsive, high-performance UIs with modern frameworks and fluid motion.',
    items: ['React & Next.js', 'TypeScript', 'Motion & Interaction', 'Responsive UI Systems'],
  },
  {
    category: 'Backend',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
      </svg>
    ),
    tagline: 'Scalable server systems',
    description: 'Building robust APIs, data layers, and secure auth flows that scale under pressure.',
    items: ['Node.js & Express', 'REST & GraphQL APIs', 'Database Architecture', 'Auth & Security'],
  },
  {
    category: 'Infrastructure',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>
      </svg>
    ),
    tagline: 'Ship with confidence',
    description: 'Automating deployment pipelines and containerizing apps for zero-downtime releases.',
    items: ['CI/CD Pipelines', 'Docker & Containers', 'Cloud Deployment'],
  },
  {
    category: 'AI & Emerging',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/>
      </svg>
    ),
    tagline: 'The frontier of tech',
    description: 'Integrating LLMs and AI APIs to build smart, adaptive product experiences rapidly.',
    items: ['AI Integration', 'LLM API Workflows', 'Rapid Prototyping'],
  },
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.headline-line',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.left-content',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Pre-set will-change for GPU compositing before animation
      gsap.set('.skill-card', { willChange: 'transform, opacity' });

      gsap.fromTo(
        '.skill-card',
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'expo.out',
          force3D: true,
          scrollTrigger: {
            trigger: rightRef.current,
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          },
          onComplete: () => gsap.set('.skill-card', { willChange: 'auto' }),
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#0A0A0A] text-[#F8D0D9]px-6 sm:px-10 md:px-16 lg:px-24 py-20 sm:py-28 lg:py-36 relative overflow-hidden"
    >
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px',
        }}
      />

      {/* Top label row */}
      <div className="mb-14 sm:mb-20 relative">
        <div className="flex items-center gap-5">
          <span className="text-[10px] sm:text-xs tracking-[0.3em] text-white/30 uppercase font-medium" style={{ fontFamily: "'DM Mono', monospace" }}>
            SKILLS — THAT MATTERS
          </span>
          <div className="headline-line flex-1 h-px bg-white/10 origin-left" />
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.7fr] gap-16 lg:gap-24 items-start relative">

        {/* LEFT */}
        <div className="left-content lg:sticky lg:top-24">
          <h2
            className="text-[#fcf5f6] text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter leading-[0.88] mb-8 sm:mb-10"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            SKILLS
          </h2>

          <p
            className="text-sm sm:text-base text-[#b54860]/45 leading-relaxed max-w-xs"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Building end-to-end products — from pixel-perfect interfaces to scalable server architecture.
            <span className="block mt-2 text-[#b54860]/25">
              Full-stack, production-ready, and always shipping.
            </span>
          </p>

          {/* Count badge */}
          <div className="mt-10 sm:mt-14 inline-flex items-center gap-3 border border-white/[0.08] bg-white/[0.02] px-5 py-3 backdrop-blur-sm">
            <span className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              {skillsData.reduce((acc, g) => acc + g.items.length, 0)}
            </span>
            <span className="text-[9px] sm:text-[10px] text-white/35 uppercase tracking-[0.2em] leading-tight" style={{ fontFamily: "'DM Mono', monospace" }}>
              Core<br />Skills
            </span>
          </div>

          {/* Emerald accent dot cluster */}
          <div className="mt-16 hidden lg:flex items-center gap-1.5">
            {[1,2,3].map(i => (
              <div
                key={i}
                className="rounded-full bg-[#fcf5f6]/60"
                style={{ width: i === 2 ? 6 : 4, height: i === 2 ? 6 : 4 }}
              />
            ))}
          </div>
        </div>

        {/* RIGHT — Cards */}
        <div ref={rightRef} className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
          {skillsData.map((group) => (
            <div
              key={group.category}
              className="skill-card relative group flex flex-col bg-white/[0.03] border border-white/[0.07] hover:border-[#F8D0D9]/30 p-4 sm:p-5 transition-all duration-500 hover:bg-white/[0.05] overflow-hidden"
              style={{ borderRadius: '2px' }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 0% 0%, rgba(252, 245, 256, 0.06) 0%, transparent 70%)' }}
              />

              {/* Top row: icon + category */}
              <div className="flex items-start justify-between mb-3.5">
                <div className="flex items-center justify-center w-8 h-8 rounded-sm bg-[#F8D0D9]/10 text-[#fcf5f6] border border-[#F8D0D9]/20 group-hover:[#F8D0D9]/15 group-hover:border-[#F8D0D9]/40 transition-all duration-300">
                  {group.icon}
                </div>
                <span
                  className="text-[8px] tracking-[0.28em] text-white/20 uppercase self-start pt-1"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  {String(skillsData.indexOf(group) + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Category name */}
              <h3
                className="text-sm sm:text-base font-bold text-white mb-1 tracking-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {group.category}
              </h3>

              {/* Tagline */}
              <p
                className="text-[9px] sm:text-[10px] text-[#c4586f]/70 uppercase tracking-[0.18em] mb-3 font-medium"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                {group.tagline}
              </p>

              {/* Description */}
              <p
                className="text-[11px] sm:text-xs text-white/40 leading-relaxed mb-3.5"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {group.description}
              </p>

              {/* Divider */}
              <div className="w-full h-px bg-white/[0.06] mb-3.5" />

              {/* Skill items */}
              <ul className="flex flex-col gap-2 mt-auto">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-[11px] sm:text-xs text-white/55 hover:text-white/80 transition-colors duration-200"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    <span className="w-[3px] h-[3px] rounded-full bg-[#c4586f]/50 shrink-0 group-hover:bg-[#b54860]/70 transition-colors duration-300" />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Bottom accent bar */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-[#c4586f]/60 to-[#c4586f]/0 transition-all duration-500 ease-out" />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');
      `}</style>
    </section>
  );
}