import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const About = () => {
    const containerRef = useRef<HTMLElement>(null);
    const leftRef = useRef<HTMLDivElement>(null);
    const rightRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Slide-in animation triggered on scroll
            gsap.fromTo(leftRef.current,
                { x: '-10%', opacity: 0 },
                {
                    x: '0%',
                    opacity: 1,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 70%',
                    }
                }
            );

            gsap.fromTo(rightRef.current,
                { x: '10%', opacity: 0 },
                {
                    x: '0%',
                    opacity: 1,
                    duration: 1.2,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 70%',
                    }
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} id="about" className="relative min-h-screen w-full flex flex-col md:flex-row overflow-hidden">

            {/* Center Divider */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10 hidden md:block z-20">
                <div className="absolute top-1/2 -translate-y-1/2 -ml-[3px] w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
            </div>

            {/* Left Side (Dark) */}
            <div ref={leftRef} className="w-full md:w-1/2 bg-ink text-white p-12 md:p-24 flex flex-col justify-center relative">
                <div className="absolute top-12 left-12 text-[15rem] font-serif leading-none text-white/[0.03] select-none pointer-events-none">
                    &ldquo;
                </div>

                <div className="relative z-10 max-w-xl ml-auto">
                    <p className="font-serif text-3xl md:text-4xl leading-snug tracking-tight text-white/90">
                        I'm a developer who believes great software is equal parts logic and empathy. I care deeply about the gap between what a product does and how it makes someone feel. When I'm not writing code, I'm probably redesigning something in my head.
                    </p>
                    <div className="mt-8 flex items-center gap-4">
                        <div className="w-12 h-px bg-white/20"></div>
                        <span className="font-mono text-sm tracking-wider text-muted uppercase">Sadia, Full Stack Developer</span>
                    </div>
                </div>
            </div>

            {/* Right Side (Light) */}
            <div ref={rightRef} className="w-full md:w-1/2 bg-paper text-ink p-12 md:p-24 flex flex-col justify-center border-t border-border-light md:border-t-0">
                <div className="max-w-xl mr-auto w-full space-y-16">

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-8 md:gap-12">
                        <div className="space-y-2">
                            <div className="font-display text-5xl font-bold tracking-tighter">02+</div>
                            <div className="font-mono text-xs uppercase tracking-widest text-[#555]">Years of experience</div>
                        </div>
                        <div className="space-y-2">
                            <div className="font-display text-5xl font-bold tracking-tighter">20+</div>
                            <div className="font-mono text-xs uppercase tracking-widest text-[#555]">Projects shipped</div>
                        </div>
                        <div className="space-y-2">
                            <div className="font-display text-5xl font-bold tracking-tighter">&infin;</div>
                            <div className="font-mono text-xs uppercase tracking-widest text-[#555]">Cups of tea</div>
                        </div>
                    </div>

                    {/* Pillars */}
                    <div className="space-y-6">
                        <h3 className="font-mono text-sm tracking-wider text-[#555] uppercase">Core Focus</h3>
                        <div className="flex flex-wrap gap-3">
                            {['Frontend Engineering', 'Backend Architecture', 'UI/UX Thinking', 'API Design'].map((skill, i) => (
                                <div key={i} className="px-5 py-3 rounded-full bg-ink text-white text-sm font-medium shadow-sm hover:-translate-y-1 transition-transform">
                                    {skill}
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

        </section>
    );
};

export default About;
