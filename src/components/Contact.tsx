import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/Button';

const Contact = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
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
        const rect = sectionRef.current?.getBoundingClientRect();
        if (!rect) return;
        setMousePos({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
        });
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');

                .contact-section * { box-sizing: border-box; }

                .reveal-up {
                    opacity: 0;
                    transform: translateY(40px);
                    transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .reveal-up.visible { opacity: 1; transform: translateY(0); }
                .delay-1 { transition-delay: 0.1s; }
                .delay-2 { transition-delay: 0.25s; }
                .delay-3 { transition-delay: 0.4s; }
                .delay-4 { transition-delay: 0.55s; }
                .delay-5 { transition-delay: 0.7s; }

                .cta-arrow {
                    display: inline-block;
                    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .line-accent {
                    width: 0;
                    height: 1px;
                    background: rgba(252, 245, 246, 0.15);
                    transition: width 1.2s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .line-accent.visible { width: 100%; }

                .tag-label {
                    font-family: 'DM Mono', monospace;
                    font-size: 10px;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    color: rgba(252, 245, 246,0.3);
                }

                .social-link {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-family: 'DM Mono', monospace;
                    font-size: 12px;
                    letter-spacing: 0.1em;
                    color: rgba(252, 245, 246,0.4);
                    text-decoration: none;
                    transition: color 0.3s ease;
                    position: relative;
                }
                .social-link::after {
                    content: '';
                    position: absolute;
                    bottom: -2px;
                    left: 0;
                    width: 0;
                    height: 1px;
                    background: rgba(252, 245, 246, 1);
                    transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .social-link:hover { color: #F2F0EB; }
                .social-link:hover::after { width: 100%; }
                .social-link .social-arrow {
                    opacity: 0;
                    transform: translateX(-6px) rotate(-45deg);
                    transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .social-link:hover .social-arrow {
                    opacity: 1;
                    transform: translateX(0) rotate(-45deg);
                }

                .corner-bracket {
                    position: absolute;
                    width: 20px;
                    height: 20px;
                    opacity: 0.2;
                }
                .corner-bracket-tl { top: 0; left: 0; border-top: 1px solid white; border-left: 1px solid white; }
                .corner-bracket-tr { top: 0; right: 0; border-top: 1px solid white; border-right: 1px solid white; }
                .corner-bracket-bl { bottom: 0; left: 0; border-bottom: 1px solid white; border-left: 1px solid white; }
                .corner-bracket-br { bottom: 0; right: 0; border-bottom: 1px solid white; border-right: 1px solid white; }

                .number-tag {
                    font-family: 'DM Mono', monospace;
                    font-size: 10px;
                    color: rgba(252, 245, 246,0.2);
                    letter-spacing: 0.1em;
                }

                @media (max-width: 640px) {
                    .side-label { display: none !important; }
                    .contact-headline { 
                        font-size: clamp(2rem, 10vw, 3.5rem) !important;
                        line-height: 1.1 !important;
                    }
                }
                .contact-headline {
                    word-break: break-word;
                    overflow-wrap: break-word;
                }
            `}</style>

            <section
                id="contact"
                ref={sectionRef}
                className="contact-section"
                onMouseMove={handleMouseMove}
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
                {/* Subtle background texture */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.02]"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                        backgroundSize: '32px 32px',
                    }}
                />

                {/* Top horizontal rule */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'rgba(255,255,255,0.06)' }} />

                {/* Vertical side tags */}
                <div
                    className="side-label"
                    style={{ position: 'absolute', left: 32, top: '50%', transform: 'translateY(-50%) rotate(-90deg)', transformOrigin: 'center' }}
                >
                    <span className="tag-label">Contact</span>
                </div>
                <div
                    className="side-label"
                    style={{ position: 'absolute', right: 32, top: '50%', transform: 'translateY(-50%) rotate(90deg)', transformOrigin: 'center' }}
                >
                    <span className="number-tag">05 / 05</span>
                </div>

                <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 clamp(24px, 6vw, 80px)', width: '100%', position: 'relative', zIndex: 10 }}>

                    {/* Section label */}
                    <div
                        className={`reveal-up delay-1 ${isVisible ? 'visible' : ''}`}
                        style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '56px' }}
                    >
                        <div style={{ width: '32px', height: '1px', background: 'rgba(255,255,255,0.3)' }} />
                        <span className="tag-label">Available for work</span>
                    </div>

                    {/* Main headline */}
                    <div style={{ marginBottom: '40px' }}>

                        {/* Line 1 */}
                        <h2
                            className={`reveal-up delay-2 contact-headline ${isVisible ? 'visible' : ''}`}
                            style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: 'clamp(2rem, 4.2vw, 5.5rem)',
                                fontWeight: 900,
                                fontStyle: 'normal',
                                lineHeight: 1,
                                letterSpacing: '-0.02em',
                                margin: 0,
                                color: '#fcf5f6',
                            }}
                        >
                            Let's build something
                        </h2>

                        {/* Line 2 */}
                        <h2>
                            <span
                                style={{
                                    fontFamily: "'Playfair Display', serif",
                                    fontStyle: 'italic',
                                    fontWeight: 800,
                                    fontSize: 'clamp(3.9rem, 6vw, 6.2rem)',
                                    letterSpacing: '-0.001em',
                                    lineHeight: 1,
                                    // Add these three lines:
                                    background: 'linear-gradient(to right, #F2F0EB, #A8A6A1)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                remarkable
                            </span>
                        </h2>

                        {/* Line 3 */}
                        <h2
                            className={`reveal-up delay-4 contact-headline ${isVisible ? 'visible' : ''}`}
                            style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: 'clamp(2rem, 4.3vw, 5.5rem)',
                                fontWeight: 900,
                                fontStyle: 'normal',
                                lineHeight: 1.08,
                                letterSpacing: '-0.02em',
                                margin: 0,
                                color: '#fcf5f6',
                            }}
                        >
                            together.
                        </h2>
                    </div>

                    {/* Divider */}
                    <div
                        className={`line-accent ${isVisible ? 'visible' : ''}`}
                        style={{ marginBottom: '40px', transitionDelay: '0.5s' }}
                    />

                    {/* Bottom row */}
                    <div
                        className={`reveal-up delay-5 ${isVisible ? 'visible' : ''}`}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-end',
                            flexWrap: 'wrap',
                            gap: 'clamp(32px, 5vw, 48px)',
                        }}
                    >
                        {/* Left: copy + CTA */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                            <p style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: '1.05rem',
                                fontWeight: 300,
                                color: 'rgba(255,255,255,0.5)',
                                lineHeight: 1.75,
                                letterSpacing: '0.01em',
                                maxWidth: '340px',
                                margin: 0,
                            }}>
                                Whether it's a project, a role, or just a hello —<br />
                                my inbox is always open.
                            </p>

                            <Button 
                                render={(props) => <a href="mailto:hello@example.com" {...props} />}
                                className="group not-disabled:inset-shadow-none flex cursor-pointer items-center justify-center gap-0 rounded-full border-none bg-transparent px-0 py-5 font-normal shadow-none hover:bg-transparent [:hover,[data-pressed]]:bg-transparent"
                                style={{ alignSelf: 'flex-start' }}
                            >
                                <span className="rounded-full bg-[#FCF5F6] px-6 py-3 text-black duration-500 ease-in-out group-hover:bg-zinc-800 group-hover:text-white group-hover:transition-colors">
                                    Start a Project
                                </span>
                                <div className="relative flex h-fit cursor-pointer items-center overflow-hidden rounded-full bg-white p-5 text-black duration-500 ease-in-out group-hover:bg-zinc-800 group-hover:text-white group-hover:transition-colors">
                                    <ArrowUpRight className="absolute h-5 w-5 -translate-x-1/2 transition-all duration-500 ease-in-out group-hover:translate-x-10" />
                                    <ArrowUpRight className="absolute h-5 w-5 -translate-x-10 transition-all duration-500 ease-in-out group-hover:-translate-x-1/2" />
                                </div>
                            </Button>
                        </div>

                        {/* Right: socials */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'flex-start' }}>
                            <span className="tag-label" style={{ marginBottom: '4px' }}>Or find me on</span>
                            {['GitHub', 'LinkedIn', 'Twitter'].map(social => (
                                <a key={social} href="#" className="social-link">
                                    <span>{social}</span>
                                    <ArrowRight size={12} className="social-arrow" />
                                </a>
                            ))}
                        </div>
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