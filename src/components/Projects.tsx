import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ExternalLink, Github } from 'lucide-react';
import { clsx } from 'clsx';

const PROJECTS = [
    {
        num: '001',
        title: 'E-Commerce Platform',
        description: 'A high-performance headless commerce storefront built with Next.js App Router and Shopify.',
        tags: ['Next.js', 'React', 'Tailwind', 'Shopify Storefront API'],
        liveStr: '#',
        githubStr: '#',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop',
    },
    {
        num: '002',
        title: 'AI Dashboard',
        description: 'An analytics dashboard for monitoring machine learning model performance and data drift.',
        tags: ['React', 'TypeScript', 'Tremor', 'Python FastApi'],
        liveStr: '#',
        githubStr: '#',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
    },
    {
        num: '003',
        title: 'Fintech Mobile App',
        description: 'A cross-platform personal finance tracker with real-time syncing and budgeting tools.',
        tags: ['React Native', 'Expo', 'Supabase', 'Zustand'],
        liveStr: '#',
        githubStr: '#',
        image: 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=1000&auto=format&fit=crop',
    }
];

const Projects = () => {
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Image slide-up stagger on scroll
            gsap.utils.toArray<HTMLElement>('.project-image-wrapper').forEach((wrapper) => {
                const img = wrapper.querySelector('img');
                if (!img) return;

                gsap.fromTo(img,
                    { y: '20%', scale: 1.1, opacity: 0 },
                    {
                        y: '0%',
                        scale: 1,
                        opacity: 1,
                        duration: 1.2,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: wrapper,
                            start: 'top 85%',
                        }
                    }
                );
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} id="projects" className="py-24 bg-paper text-ink">
            <div className="max-w-7xl mx-auto px-6 md:px-12">

                {/* Header */}
                <div className="flex justify-between items-end mb-16 border-b border-border-light pb-6">
                    <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">Selected Work</h2>
                    <span className="font-mono text-sm tracking-widest text-[#555]">[001 — {String(PROJECTS.length).padStart(3, '0')}]</span>
                </div>

                {/* Project List */}
                <div className="space-y-16">
                    {PROJECTS.map((project, idx) => {
                        const isEven = idx % 2 !== 0; // 0-indexed, so index 1 is the 2nd item (even physically if we treat 1st as odd)

                        return (
                            <div
                                key={project.num}
                                className="group relative flex flex-col md:flex-row bg-white border border-border-light rounded-[1.5rem] overflow-hidden hover:-translate-y-1 transition-all duration-500 shadow-sm hover:shadow-xl"
                            >
                                {/* Content Side */}
                                <div className={clsx("w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center", isEven ? "md:order-2" : "md:order-1")}>
                                    <div className="bg-paper border border-border-light text-[#555] font-mono text-xs px-3 py-1 rounded-full w-max mb-6">
                                        {project.num}
                                    </div>

                                    <h3 className="font-display text-3xl font-bold tracking-tight mb-4 group-hover:text-black transition-colors">{project.title}</h3>
                                    <p className="text-[#555] leading-relaxed mb-8 max-w-md">{project.description}</p>

                                    <div className="flex flex-wrap gap-2 mb-10">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="font-mono text-xs px-3 py-1.5 bg-paper rounded-md border border-border-light text-[#555]">{tag}</span>
                                        ))}
                                    </div>

                                    <div className="mt-auto flex gap-4">
                                        <a href={project.liveStr} className="flex items-center gap-2 px-6 py-3 bg-ink text-white rounded-full font-medium text-sm hover:bg-black transition-colors">
                                            Live <ExternalLink size={16} />
                                        </a>
                                        <a href={project.githubStr} className="flex items-center gap-2 px-6 py-3 bg-paper border border-border-light text-ink rounded-full font-medium text-sm hover:bg-[#eee] transition-colors">
                                            GitHub <Github size={16} />
                                        </a>
                                    </div>
                                </div>

                                {/* Image Side */}
                                <div className={clsx("w-full md:w-1/2 bg-[#f0f0f0] overflow-hidden project-image-wrapper min-h-[300px] md:min-h-[400px] relative", isEven ? "md:order-1" : "md:order-2")}>
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] filter grayscale-[20%] group-hover:grayscale-0"
                                    />
                                    {/* Subtle inner shadow overlay */}
                                    <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(0,0,0,0.05)] pointer-events-none"></div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* See All Work CTA */}
                <div className="mt-16 text-center">
                    <a href="#" className="inline-flex items-center gap-2 group font-medium text-ink hover:text-black">
                        <span className="border-b border-ink/30 pb-1 group-hover:border-ink transition-colors">See All Work</span>
                        <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                    </a>
                </div>

            </div>
        </section>
    );
};

export default Projects;
