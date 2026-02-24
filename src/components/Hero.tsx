import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Hero = () => {
    const containerRef = useRef<HTMLElement>(null);

    const name = "SADIA AKTER";
    const subtitle = "Creative Developer & Designer";
    const duration = 1;
    const total = name.length + subtitle.length;
    const stagger = duration / total;

    // Pre-build words with correct flat indices — calculated once, used directly
    const nameWords = name.split(' ').map((word, wi) => {
        const startIdx = name.split(' ').slice(0, wi).reduce((acc, w) => acc + w.length + 1, 0);
        return {
            word,
            chars: word.split('').map((char, ci) => ({
                char,
                index: startIdx + ci  // exact position in full string
            }))
        };
    });

    const subtitleChars = subtitle.split('').map((char, i) => ({
        char,
        index: name.length + i  // continues exactly after name
    }));

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.hero-content',
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out' }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0A0A0A]"
            id="home"
        >
            <div className="noise-bg absolute inset-0 mix-blend-overlay"></div>

            <div className="hero-content relative z-10 flex flex-col items-center text-center px-4 max-w-full">

                {/* Name — rendered directly from pre-built array */}
                <h1 className="font-display font-black text-white leading-none tracking-[-0.02em] select-none
                    text-[clamp(2.5rem,7vw,8rem)] flex flex-wrap justify-center gap-x-[0.2em]">
                    {nameWords.map(({ word, chars }, wi) => (
                        <span key={wi} className="inline-flex">
                            {chars.map(({ char, index }) => (
                                <span
                                    key={index}
                                    className="letter-wave inline-block"
                                    style={{ animationDelay: `-${index * stagger}s` }}
                                >
                                    {char}
                                </span>
                            ))}
                        </span>
                    ))}
                </h1>

                {/* Subtitle — rendered directly from pre-built array */}
                <div className="mt-3 md:mt-4 flex flex-col items-center">
                    <p className="font-mono text-[#888] tracking-[0.2em] uppercase text-xs md:text-sm relative py-2 px-4
                        before:absolute before:left-0 before:top-0 before:w-full before:h-px before:bg-white/10
                        after:absolute after:left-0 after:bottom-0 after:w-full after:h-px after:bg-white/10
                        flex flex-wrap justify-center">
                        {subtitleChars.map(({ char, index }) => (
                            <span
                                key={index}
                                className="letter-wave inline-block"
                                style={{
                                    animationDelay: `-${index * stagger}s`,
                                    whiteSpace: char === ' ' ? 'pre' : 'normal'
                                }}
                            >
                                {char}
                            </span>
                        ))}
                    </p>
                </div>

            </div>
        </section>
    );
};

export default Hero;