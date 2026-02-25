import { useRef } from 'react';
import VariableProximity from './VariableProximity';

const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0A0A0A]"
            id="home"
        >
            {/* Noise overlay - subtle grain */}
            <div className="noise-bg absolute inset-0 mix-blend-overlay opacity-30 pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'repeat',
                    backgroundSize: '128px 128px',
                }}
            />

            {/* Subtle radial glow behind the text */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(255,255,255,0.04) 0%, transparent 70%)',
                }}
            />

            <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-full">
                {/* Large Name - Variable Proximity Typography */}
                <h1 className="leading-none select-none flex flex-wrap justify-center text-white">
                    <VariableProximity
                        label="SADIA AKTER"
                        className="font-black"
                        fromFontVariationSettings="'wght' 400, 'opsz' 9"
                        toFontVariationSettings="'wght' 1000, 'opsz' 40"
                        containerRef={containerRef}
                        radius={200}
                        falloff="linear"
                        style={{
                            fontSize: 'clamp(3rem, 8vw, 10rem)',
                            letterSpacing: '-0.03em',
                            textTransform: 'uppercase',
                            lineHeight: 1,
                        }}
                    />
                </h1>

                {/* Subtitle - Variable Proximity Typography */}
                <div className="mt-1 flex flex-col items-center">
                    <div className="relative py-3 px-2 before:absolute before:left-0 before:top-0 before:w-full before:h-px before:bg-white/10 after:absolute after:left-0 after:bottom-0 after:w-full after:h-px after:bg-white/10">
                        <VariableProximity
                            label="CREATIVE FULL STACK DEVELOPER"
                            className="font-medium"
                            fromFontVariationSettings="'wght' 400, 'opsz' 9"
                            toFontVariationSettings="'wght' 800, 'opsz' 20"
                            containerRef={containerRef}
                            radius={100}
                            falloff="linear"
                            style={{
                                color: '#888',
                                fontSize: 'clamp(0.6rem, 1.1vw, 0.95rem)',
                                letterSpacing: '0.35em',
                                fontFamily: "'JetBrains Mono', monospace",
                                textTransform: 'uppercase'
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
