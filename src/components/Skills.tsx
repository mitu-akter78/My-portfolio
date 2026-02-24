import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { clsx } from 'clsx';
import { Target, Server, Database, Wrench } from 'lucide-react';

const SKILL_ROWS = [
    {
        category: 'Frontend',
        icon: Target,
        items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'Zustand', 'HTML5', 'CSS3', 'REST']
    },
    {
        category: 'Backend',
        icon: Server,
        items: ['Node.js', 'Express', 'Django', 'REST APIs', 'GraphQL', 'Python', 'WebSockets', 'TRPC', 'JWT', 'OAuth']
    },
    {
        category: 'Database & Cloud',
        icon: Database,
        items: ['PostgreSQL', 'MongoDB', 'Redis', 'AWS', 'Docker', 'Prisma', 'Supabase', 'Vercel', 'Firebase', 'Nginx']
    },
    {
        category: 'Tools',
        icon: Wrench,
        items: ['Git', 'Figma', 'VS Code', 'Postman', 'Linux', 'Jest', 'Cypress', 'Vite', 'Webpack', 'Jira']
    }
];

const Skills = () => {
    const containerRef = useRef<HTMLElement>(null);
    const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            rowsRef.current.forEach((row, index) => {
                if (!row) return;

                // Determine direction: even rows go right, odd go left
                const direction = index % 2 === 0 ? '-100%' : '100%';
                const startPos = index % 2 === 0 ? '0%' : '-100%';

                // The inner elements should be duplicated enough to allow seamless looping
                gsap.fromTo(row,
                    { x: startPos },
                    {
                        x: direction,
                        ease: 'none',
                        duration: 30 + (index * 5), // vary duration slightly per row
                        repeat: -1
                    }
                );
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} id="skills" className="relative py-24 bg-ink overflow-hidden border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16">
                <h2 className="font-mono text-2xl md:text-3xl text-white flex items-center gap-1">
                    <span className="text-muted">&gt;</span> tech_stack.exe<span className="animate-pulse">|</span>
                </h2>
            </div>

            <div className="flex flex-col gap-6 relative z-10">
                {SKILL_ROWS.map((row, rowIndex) => (
                    <div key={rowIndex} className="relative flex whitespace-nowrap overflow-hidden py-2" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>

                        {/* The animated track */}
                        <div
                            ref={el => { rowsRef.current[rowIndex] = el; }}
                            className="flex items-center gap-4 w-max hover:[animation-play-state:paused]"
                        >
                            {/* Duplicate array for seamless infinite scroll */}
                            {[...row.items, ...row.items, ...row.items].map((skill, index) => (
                                <div
                                    key={index}
                                    className="group relative flex items-center gap-3 px-6 py-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.08] hover:border-white/20 transition-all cursor-crosshair mx-2"
                                >
                                    <span className="font-mono text-sm text-white/80 group-hover:text-white transition-colors">{skill}</span>

                                    {/* Hover Tooltip Popover */}
                                    <div className="absolute opacity-0 group-hover:opacity-100 pointer-events-none bottom-full left-1/2 -translate-x-1/2 mb-4 bg-paper text-ink px-4 py-3 rounded-lg shadow-xl w-max transition-all translate-y-2 group-hover:translate-y-0 z-50">
                                        <div className="font-mono text-xs font-bold mb-1 flex justify-between items-center gap-4">
                                            {row.category}
                                            <row.icon size={12} className="text-ink/60" />
                                        </div>
                                        <div className="flex gap-1 mt-2">
                                            {/* Proficiency dots mockup */}
                                            {[1, 2, 3, 4, 5].map(dot => (
                                                <div key={dot} className={clsx("w-1.5 h-1.5 rounded-full", dot <= 4 ? "bg-ink" : "bg-ink/20")}></div>
                                            ))}
                                        </div>
                                        {/* Small arrow triangle */}
                                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-paper rotate-45"></div>
                                    </div>

                                </div>
                            ))}
                        </div>

                    </div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
