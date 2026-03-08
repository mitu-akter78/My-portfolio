import { useRef } from 'react';
import VariableProximity from './ui/VariableProximity';
import ColorBends from './ui/colorbendbg';
import { ShimmerButton } from './ui/shimmer-button';

const Hero = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#0A0A0A] border-b-1 border-[#2F3030]"
            id="home"
        >
            <div className="absolute inset-0 z-0">
                <ColorBends
                    colors={["#525252", "#727273"]}
                    rotation={0}
                    speed={0.2}
                    scale={1}
                    frequency={1}
                    warpStrength={1}
                    mouseInfluence={0}
                    parallax={0}
                    noise={0.1}
                    transparent
                    autoRotate={0}
                />
            </div>

            <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-full">
                {/* Name */}
                <h1 className="leading-none select-none flex flex-wrap justify-center text-[#F3F1EC] transition-all duration-300 ease-out hover:drop-shadow-[#AA3E56]">
                    <VariableProximity
                        label="SADIA AKTER"
                        className="font-black"
                        fromFontVariationSettings="'wght' 500, 'opsz' 9"
                        toFontVariationSettings="'wght' 900, 'opsz' 40"
                        containerRef={containerRef}
                        radius={50}
                        falloff="linear"
                        style={{
                            fontSize: 'clamp(2.3rem, 8vw, 10rem)',
                            letterSpacing: '-0.05em',
                            textTransform: 'uppercase',
                            lineHeight: 1,
                            
                        }}
                    />
                </h1>

                {/* Subtitle + CTA */}
                <div className="mt-0.4 flex flex-col items-center gap-[5px]">
                    <div className="w-full h-[2px] bg-[#F3F1EC] " />

                    <VariableProximity
                        label="CREATIVE FULL STACK DEVELOPER"
                        className="font-medium"
                        fromFontVariationSettings="'wght' 800, 'opsz' 10"
                        toFontVariationSettings="'wght' 900, 'opsz' 20"
                        containerRef={containerRef}
                        radius={50}
                        falloff="linear"
                        style={{
                            color: '#F3F1EC',
                            fontSize: 'clamp(0.45rem, 1.3vw, 1.3rem)',
                            letterSpacing: '0.1em',
                            fontFamily: "'Playfair Display', Georgia, serif",
                            textTransform: 'uppercase',
                            lineHeight: 1,
                            display: 'block',
                        }}
                    />

                    <div className="w-full h-[2px] bg-[#F3F1EC]" />

                    {/* CTA */}
                    <ShimmerButton
                        className="mt-12 shadow-2xl"
                        shimmerColor="#ffffff"
                        background="rgba(10, 10, 10, 1)"
                        onClick={() => document.getElementById('projects-section')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        <span className="whitespace-pre-wrap text-center text-base font-medium leading-none tracking-tight text-[#fcf5f6] dark:from-white dark:to-slate-900/10 lg:text-lg">
                            View work
                        </span>
                    </ShimmerButton>
                </div>
            </div>
        </section>
    );
};

export default Hero;