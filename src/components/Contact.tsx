import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/Button';

const Contact = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const [ctaTilt, setCtaTilt] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        const ctaRect = ctaRef.current?.getBoundingClientRect();
        if (ctaRect) {
            const cx = ctaRect.left + ctaRect.width / 2;
            const cy = ctaRect.top + ctaRect.height / 2;
            const dx = (e.clientX - cx) / (ctaRect.width / 2);
            const dy = (e.clientY - cy) / (ctaRect.height / 2);
            const dist = Math.sqrt(dx * dx + dy * dy);
            setCtaTilt(dist < 2.5 ? { x: dy * 8, y: -dx * 8 } : { x: 0, y: 0 });
        }
    };

    const handleMouseLeave = () => setCtaTilt({ x: 0, y: 0 });

    const socials = [
        { label: 'GitHub',   url: '#', handle: '@yourhandle' },
        { label: 'LinkedIn', url: '#', handle: 'in/yourname'  },
        { label: 'Twitter',  url: '#', handle: '@yourhandle' },
    ];

    // Deterministic floating elements — fixed positions, no random
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

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');

                .contact-section * { box-sizing: border-box; }

                /* ── Reveal ── */
                .reveal-up {
                    opacity: 0;
                    transform: translateY(40px);
                    transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1),
                                transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .reveal-up.visible { opacity: 1; transform: translateY(0); }
                .delay-1 { transition-delay: 0.10s; }
                .delay-2 { transition-delay: 0.25s; }
                .delay-3 { transition-delay: 0.38s; }
                .delay-4 { transition-delay: 0.50s; }
                .delay-5 { transition-delay: 0.65s; }
                .delay-6 { transition-delay: 0.80s; }

                /* ── "remarkable" gradient ── */
                .remarkable-text {
                    font-family: 'Playfair Display', serif;
                    font-style: italic;
                    font-weight: 800;
                    font-size: clamp(3rem, 10vw, 6.2rem);
                    letter-spacing: -0.001em;
                    line-height: 1;
                    display: block;
                    background: linear-gradient(to right, #919190, #ffffff, #919190);
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                /* ── Divider ── */
                .line-accent {
                    width: 0;
                    height: 1px;
                    background: rgba(252, 245, 246, 0.12);
                    transition: width 1.4s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .line-accent.visible { width: 100%; }

                /* ── Mono labels ── */
                .tag-label {
                    font-family: 'DM Mono', monospace;
                    font-size: 10px;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    color: rgba(252, 245, 246, 0.3);
                }
                .number-tag {
                    font-family: 'DM Mono', monospace;
                    font-size: 10px;
                    color: rgba(252, 245, 246, 0.2);
                    letter-spacing: 0.1em;
                }

                /* ── Social links ── */
                .social-link {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    text-decoration: none;
                    position: relative;
                    padding: 10px 0;
                    width: 100%;
                }
                .social-link-name {
                    font-family: 'DM Mono', monospace;
                    font-size: 12px;
                    letter-spacing: 0.1em;
                    color: rgba(252, 245, 246, 0.45);
                    transition: color 0.3s ease;
                }
                .social-link-handle {
                    font-family: 'DM Mono', monospace;
                    font-size: 10px;
                    letter-spacing: 0.08em;
                    color: rgba(252, 245, 246, 0.18);
                    opacity: 0;
                    transform: translateY(4px);
                    transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.16,1,0.3,1);
                }
                .social-link-arrow {
                    margin-left: auto;
                    opacity: 0;
                    transform: translateX(-6px);
                    transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.16,1,0.3,1);
                    color: rgba(252, 245, 246, 0.6);
                    flex-shrink: 0;
                }
                .social-link::after {
                    content: '';
                    position: absolute;
                    bottom: 0; left: 0;
                    width: 0; height: 1px;
                    background: rgba(252,245,246,0.12);
                    transition: width 0.4s cubic-bezier(0.16,1,0.3,1);
                }
                .social-link:hover .social-link-name   { color: #F2F0EB; }
                .social-link:hover .social-link-handle { opacity: 1; transform: translateY(0); }
                .social-link:hover .social-link-arrow  { opacity: 1; transform: translateX(0); }
                .social-link:hover::after              { width: 100%; }

                /* ── Corner brackets ── */
                .corner-bracket {
                    position: absolute;
                    width: 20px; height: 20px;
                    opacity: 0.15;
                    transition: opacity 0.6s ease, width 0.6s ease, height 0.6s ease;
                }
                .contact-section:hover .corner-bracket { opacity: 0.3; width: 28px; height: 28px; }
                .corner-bracket-tl { top: 0; left: 0; border-top: 1px solid white; border-left: 1px solid white; }
                .corner-bracket-tr { top: 0; right: 0; border-top: 1px solid white; border-right: 1px solid white; }
                .corner-bracket-bl { bottom: 0; left: 0; border-bottom: 1px solid white; border-left: 1px solid white; }
                .corner-bracket-br { bottom: 0; right: 0; border-bottom: 1px solid white; border-right: 1px solid white; }

                /* ── CTA tilt ── */
                .cta-wrap {
                    transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
                    transform-style: preserve-3d;
                    will-change: transform;
                    align-self: flex-start;
                }

                /* ── Noise overlay ── */
                .noise-overlay {
                    position: absolute; inset: 0;
                    pointer-events: none;
                    opacity: 0.035;
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
                    background-size: 180px 180px;
                }

                /* ── Floating shape animations ── */
                @keyframes floatA {
                    0%, 100% { transform: translateY(0px)    rotate(0deg);   }
                    50%      { transform: translateY(-14px)  rotate(8deg);   }
                }
                @keyframes floatB {
                    0%, 100% { transform: translateY(0px)    rotate(0deg);   }
                    50%      { transform: translateY(-10px)  rotate(-6deg);  }
                }
                @keyframes twinkle {
                    0%, 100% { opacity: 0.14; transform: scale(1)    rotate(0deg);  }
                    50%      { opacity: 0.30; transform: scale(1.18) rotate(18deg); }
                }
                .float-shape { position: absolute; pointer-events: none; }

                /* ── Headlines ── */
                .headline-1 {
                    font-family: 'Playfair Display', serif;
                    font-size: clamp(1.9rem, 5.5vw, 5.5rem);
                    font-weight: 900;
                    font-style: normal;
                    line-height: 1;
                    letter-spacing: -0.02em;
                    margin: 0;
                    color: #fcf5f6;
                    word-break: break-word;
                    overflow-wrap: break-word;
                }
                .headline-3 {
                    font-family: 'Playfair Display', serif;
                    font-size: clamp(1.6rem, 3.5vw, 3.8rem);
                    font-weight: 700;
                    font-style: normal;
                    line-height: 1.15;
                    letter-spacing: -0.01em;
                    margin: 0;
                    color: rgba(252, 245, 246, 0.55);
                    word-break: break-word;
                    overflow-wrap: break-word;
                }

                /* ── Bottom row ── */
                .bottom-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    gap: 40px;
                    flex-wrap: wrap;
                }
                .bottom-row-left  { display: flex; flex-direction: column; gap: 32px; flex: 1; min-width: 220px; }
                .bottom-row-right { display: flex; flex-direction: column; gap: 4px; flex-shrink: 0; min-width: 140px; }

                /* ── Footer row ── */
                .footer-row {
                    margin-top: 72px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 8px;
                }

                /* ── Mobile overrides ── */
                @media (max-width: 600px) {
                    .side-label { display: none !important; }
                    .bottom-row { flex-direction: column; gap: 36px; flex-wrap: nowrap; }
                    .bottom-row-right { min-width: 0; width: 100%; }
                    .footer-row { flex-direction: column; align-items: flex-start; }
                }
            `}</style>

            <section
                id="contact-section"
                ref={sectionRef}
                className="contact-section"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    position: 'relative',
                    padding: 'clamp(80px, 12vh, 140px) 0',
                    background: '#0A0A0A',
                    color: 'white',
                    overflowX: 'clip',
                    overflowY: 'visible',
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                {/* Noise */}
                <div className="noise-overlay" />

                {/* Dot grid */}
                <div className="absolute inset-0 pointer-events-none" style={{
                    opacity: 0.022,
                    backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                    backgroundSize: '32px 32px',
                }} />

                {/* ── Floating shapes ── */}
                {floatingShapes.map((s, i) => {
                    const anim = i % 5 === 0 ? 'twinkle' : i % 3 === 0 ? 'floatB' : 'floatA';
                    const base: React.CSSProperties = {
                        left: `${s.x}%`,
                        top:  `${s.y}%`,
                        animation: `${anim} ${s.dur}s ease-in-out ${s.delay}s infinite`,
                        opacity: 0.14,
                    };

                    if (s.type === 'circle') return (
                        <div key={i} className="float-shape" style={{
                            ...base,
                            width: s.size, height: s.size,
                            borderRadius: '50%',
                            border: '1px solid rgba(255,255,255,0.55)',
                        }} />
                    );

                    if (s.type === 'square') return (
                        <div key={i} className="float-shape" style={{
                            ...base,
                            width: s.size, height: s.size,
                            border: '1px solid rgba(255,255,255,0.45)',
                            transform: 'rotate(45deg)',
                        }} />
                    );

                    if (s.type === 'diamond') return (
                        <div key={i} className="float-shape" style={{
                            ...base,
                            width: s.size, height: s.size,
                            border: '1px solid rgba(255,255,255,0.40)',
                            borderRadius: '1px',
                            transform: 'rotate(45deg)',
                        }} />
                    );

                    if (s.type === 'cross') return (
                        <svg key={i} className="float-shape" width={s.size + 4} height={s.size + 4}
                            viewBox="0 0 12 12" style={{ ...base, opacity: 0.18 }}>
                            <line x1="6" y1="0" x2="6" y2="12" stroke="white" strokeWidth="1" />
                            <line x1="0" y1="6" x2="12" y2="6" stroke="white" strokeWidth="1" />
                        </svg>
                    );

                    // 4-point star
                    return (
                        <svg key={i} className="float-shape" width={s.size + 4} height={s.size + 4}
                            viewBox="0 0 14 14" style={{ ...base, opacity: 0.22 }}>
                            <polygon
                                points="7,0 8.5,5.5 14,7 8.5,8.5 7,14 5.5,8.5 0,7 5.5,5.5"
                                fill="none" stroke="white" strokeWidth="0.8"
                            />
                        </svg>
                    );
                })}

                {/* Ghost number */}
                <div style={{
                    position: 'absolute', right: '-0.05em', bottom: '-0.15em',
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 900,
                    fontSize: 'clamp(180px, 28vw, 340px)',
                    lineHeight: 1,
                    color: 'transparent',
                    WebkitTextStroke: '1px rgba(255,255,255,0.04)',
                    pointerEvents: 'none', userSelect: 'none',
                    letterSpacing: '-0.04em',
                }}>05</div>

                {/* Top rule */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'rgba(255,255,255,0.06)' }} />

                {/* Side labels */}
                <div className="side-label" style={{ position: 'absolute', left: 32, top: '50%', transform: 'translateY(-50%) rotate(-90deg)', transformOrigin: 'center' }}>
                    <span className="tag-label">Contact</span>
                </div>
                <div className="side-label" style={{ position: 'absolute', right: 32, top: '50%', transform: 'translateY(-50%) rotate(90deg)', transformOrigin: 'center' }}>
                    <span className="number-tag">05 / 05</span>
                </div>

                <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 clamp(24px, 6vw, 80px)', width: '100%', position: 'relative', zIndex: 10 }}>

                    {/* Section label */}
                    <div className={`reveal-up delay-1 ${isVisible ? 'visible' : ''}`}
                        style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '56px' }}>
                        <div style={{ width: '32px', height: '1px', background: 'rgba(255,255,255,0.3)' }} />
                        <span className="tag-label">Available for work</span>
                    </div>

                    {/* Headlines */}
                    <div style={{ marginBottom: '44px' }}>
                        <h2 className={`headline-1 reveal-up delay-2 ${isVisible ? 'visible' : ''}`}>
                            Let's build something
                        </h2>
                        <h2 className={`reveal-up delay-3 ${isVisible ? 'visible' : ''}`} style={{ margin: 0 }}>
                            <span className="remarkable-text">remarkable</span>
                        </h2>
                        <h2 className={`headline-3 reveal-up delay-4 ${isVisible ? 'visible' : ''}`}>
                            together.
                        </h2>
                    </div>

                    {/* Divider */}
                    <div className={`line-accent ${isVisible ? 'visible' : ''}`} style={{ marginBottom: '44px', transitionDelay: '0.55s' }} />

                    {/* Bottom row */}
                    <div className={`bottom-row reveal-up delay-5 ${isVisible ? 'visible' : ''}`}>
                        <div className="bottom-row-left">
                            <p style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: '1rem', fontWeight: 300,
                                color: 'rgba(255,255,255,0.45)',
                                lineHeight: 1.8, letterSpacing: '0.01em',
                                maxWidth: '340px', margin: 0,
                            }}>
                                Whether it's a project, a role, or just a hello —
                                my inbox is always open.
                            </p>

                            <div
                                ref={ctaRef}
                                className="cta-wrap"
                                style={{ transform: `perspective(600px) rotateX(${ctaTilt.x}deg) rotateY(${ctaTilt.y}deg)` }}
                            >
                                <Button
                                    render={(props) => <a href="mailto:hello@example.com" {...props} />}
                                    className="group not-disabled:inset-shadow-none flex cursor-pointer items-center justify-center gap-0 rounded-full border-none bg-transparent px-0 py-5 font-normal shadow-none hover:bg-transparent [:hover,[data-pressed]]:bg-transparent"
                                >
                                    <span className="rounded-full bg-[#FCF5F6] px-6 py-3 text-black duration-500 ease-in-out group-hover:bg-zinc-800 group-hover:text-white group-hover:transition-colors">
                                        Get In Touch
                                    </span>
                                    <div className="relative flex h-fit cursor-pointer items-center overflow-hidden rounded-full bg-white p-5 text-black duration-500 ease-in-out group-hover:bg-zinc-800 group-hover:text-white group-hover:transition-colors">
                                        <ArrowUpRight className="absolute h-5 w-5 -translate-x-1/2 transition-all duration-500 ease-in-out group-hover:translate-x-10" />
                                        <ArrowUpRight className="absolute h-5 w-5 -translate-x-10 transition-all duration-500 ease-in-out group-hover:-translate-x-1/2" />
                                    </div>
                                </Button>
                            </div>
                        </div>

                        <div className="bottom-row-right">
                            <span className="tag-label" style={{ marginBottom: '8px' }}>Or find me on</span>
                            {socials.map(({ label, url, handle }) => (
                                <a key={label} href={url} className="social-link">
                                    <span className="social-link-name">{label}</span>
                                    <span className="social-link-handle">{handle}</span>
                                    <ArrowRight size={12} className="social-link-arrow" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className={`footer-row reveal-up delay-6 ${isVisible ? 'visible' : ''}`}>
                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', letterSpacing: '0.15em', color: 'rgba(252,245,246,0.18)' }}>
                            © 2026 · Made with passion
                        </span>
                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: '10px', letterSpacing: '0.15em', color: 'rgba(252,245,246,0.12)' }}>
                            Sadia.dev
                        </span>
                    </div>

                    {/* Corner brackets */}
                    <div style={{ position: 'absolute', inset: '-24px 20px', pointerEvents: 'none' }}>
                        <div className="corner-bracket corner-bracket-tl" />
                        <div className="corner-bracket corner-bracket-tr" />
                        <div className="corner-bracket corner-bracket-bl" />
                        <div className="corner-bracket corner-bracket-br" />
                    </div>

                </div>
            </section>
        </>
    );
};

export default Contact;