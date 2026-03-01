"use client"
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillsData = [
  {
    category: 'FRONTEND',
    items: [
      'React & Next.js',
      'TypeScript',
      'Motion & Interaction',
      'Responsive UI Systems',
    ],
  },
  {
    category: 'BACKEND',
    items: [
      'Node.js & Express',
      'REST & GraphQL APIs',
      'Database Architecture',
      'Auth & Security',
    ],
  },
  {
    category: 'INFRA',
    items: [
      'CI/CD Pipelines',
      'Docker & Containers',
      'Cloud Deployment',
    ],
  },
  {
    category: 'EMERGING',
    items: [
      'AI Integration',
      'LLM API Workflows',
      'Rapid Prototyping',
    ],
  },
];

export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline line draw
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

      // Left content fade in
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

      // Skill groups stagger in
      gsap.fromTo(
        '.skill-group',
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rightRef.current,
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Individual skill items
      gsap.fromTo(
        '.skill-item',
        { opacity: 0, x: -8 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.04,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: rightRef.current,
            start: 'top 72%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#0a0a0a] text-white px-6 sm:px-10 md:px-16 lg:px-24 py-20 sm:py-28 lg:py-36"
    >
      {/* Top label row */}
      <div ref={headlineRef} className="mb-14 sm:mb-20">
        <div className="flex items-center gap-5">
          <span className="text-[10px] sm:text-xs tracking-[0.3em] text-white/40 uppercase font-medium">
            02 — Capabilities
          </span>
          <div
            className="headline-line flex-1 h-px bg-white/15 origin-left"
          />
        </div>
      </div>

      {/* Main grid: left column + right column */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-16 lg:gap-24 items-start">

        {/* LEFT — Headline + paragraph */}
        <div className="left-content lg:sticky lg:top-24">
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-8xl font-black tracking-tighter leading-[0.9] mb-8 sm:mb-10"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            SKILLS
          </h2>

          {/* Thin horizontal accent */}
          <div className="w-10 h-px bg-white mb-8 sm:mb-10" />

          <p
            className="text-sm sm:text-base text-white/50 leading-relaxed max-w-xs"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Building end-to-end products — from pixel-perfect interfaces to
            scalable server architecture.
            <br className="hidden sm:block" />
            <span className="block mt-2 text-white/35">
              Full-stack, production-ready, and always shipping.
            </span>
          </p>

          {/* Skill count badge */}
          <div className="mt-10 sm:mt-14 inline-flex items-center gap-3 border border-white/10 px-4 py-2">
            <span className="text-2xl sm:text-3xl font-black tracking-tight">
              {skillsData.reduce((acc, g) => acc + g.items.length, 0)}
            </span>
            <span className="text-[10px] sm:text-xs text-white/40 uppercase tracking-widest leading-tight">
              Core<br />Skills
            </span>
          </div>
        </div>

        {/* RIGHT — Skill groups */}
        <div ref={rightRef} className="flex flex-col divide-y divide-white/[0.07]">
          {skillsData.map((group, i) => (
            <div
              key={group.category}
              className="skill-group grid grid-cols-[80px_1fr] sm:grid-cols-[100px_1fr] gap-6 sm:gap-10 py-8 sm:py-10 group"
            >
              {/* Category label */}
              <div className="pt-0.5">
                <span
                  className="text-[9px] sm:text-[10px] font-bold tracking-[0.25em] text-white/30 uppercase group-hover:text-white/60 transition-colors duration-300"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  {group.category}
                </span>
              </div>

              {/* Items */}
              <ul className="flex flex-col gap-2.5 sm:gap-3">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="skill-item flex items-center gap-3 text-sm sm:text-base text-white/60 hover:text-white transition-colors duration-200 cursor-default"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    <span className="w-1 h-1 rounded-full bg-white/20 shrink-0 group-hover:bg-white/50 transition-colors duration-200" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Google Fonts import via style tag */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@900&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');
      `}</style>
    </section>
  );
}