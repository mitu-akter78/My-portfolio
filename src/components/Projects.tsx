import { useEffect, useRef, useState, useCallback } from 'react';

const PROJECTS = [
    {
        num: '001',
        title: "Lori's Academy",
        category: 'Art Direction & Web Design',
        year: '2024',
        images: [
            'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1507838153414-b4b713384a76?q=80&w=1200&auto=format&fit=crop',
        ],
    },
    {
        num: '002',
        title: 'Lightwaves',
        category: 'Branding & Digital Experience',
        year: '2024',
        images: [
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop',
        ],
    },
    {
        num: '003',
        title: 'Meridian Studio',
        category: 'Identity & Web Development',
        year: '2023',
        images: [
            'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1200&auto=format&fit=crop',
        ],
    },
    {
        num: '004',
        title: 'Vault Finance',
        category: 'UI/UX & Product Design',
        year: '2023',
        images: [
            'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1200&auto=format&fit=crop',
        ],
    },
];

const ProjectCard = ({ project }: { project: typeof PROJECTS[0] }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [currentImageIdx, setCurrentImageIdx] = useState(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const startCycling = useCallback(() => {
        setCurrentImageIdx(0);
        intervalRef.current = setInterval(() => {
            setCurrentImageIdx(prev => (prev + 1) % project.images.length);
        }, 400);
    }, [project.images.length]);

    const stopCycling = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setCurrentImageIdx(0);
    }, []);

    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    return (
        <div
            className="project-card"
            onMouseEnter={() => { setIsHovered(true); startCycling(); }}
            onMouseLeave={() => { setIsHovered(false); stopCycling(); }}
            style={{
                position: 'relative',
                cursor: 'pointer',
                overflow: 'hidden',
                aspectRatio: '16/10',
                background: '#111',
            }}
        >
            {/* Images */}
            {project.images.map((src, i) => (
                <img
                    key={src}
                    src={src}
                    alt={project.title}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: isHovered && i === currentImageIdx ? 1 : 0,
                        transition: 'opacity 0.12s ease',
                        filter: 'grayscale(100%) brightness(0.7)',
                    }}
                />
            ))}

            {/* Overlay gradient */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)',
                zIndex: 2,
                opacity: isHovered ? 1 : 0,
                transition: 'opacity 0.4s ease',
            }} />

            {/* Default state: subtle grid texture */}
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)',
                backgroundSize: '28px 28px',
                opacity: isHovered ? 0 : 0.3,
                transition: 'opacity 0.4s ease',
            }} />

            {/* Year tag */}
            <span style={{
                position: 'absolute',
                top: 16,
                right: 16,
                fontFamily: "'Courier New', monospace",
                fontSize: '11px',
                color: '#888',
                letterSpacing: '0.15em',
                zIndex: 3,
                opacity: isHovered ? 1 : 0.5,
                transition: 'opacity 0.3s',
            }}>{project.year}</span>

            {/* Number */}
            <span style={{
                position: 'absolute',
                top: 16,
                left: 16,
                fontFamily: "'Courier New', monospace",
                fontSize: '11px',
                color: '#555',
                letterSpacing: '0.1em',
                zIndex: 3,
            }}>{project.num}</span>
        </div>
    );
};

const Projects = () => {
    const [ctaHovered, setCtaHovered] = useState(false);

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Libre+Baskerville:ital@0;1&family=Space+Mono:wght@400;700&display=swap');

                #projects-section *,
                #projects-section *::before,
                #projects-section *::after {
                    box-sizing: border-box;
                }

                #projects-section {
                    background: #0a0a0a;
                    min-height: 100vh;
                    padding: 80px 48px;
                    font-family: 'Space Mono', monospace;
                }

                .projects-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-end;
                    border-bottom: 1px solid #222;
                    padding-bottom: 24px;
                    margin-bottom: 60px;
                }

                .projects-title {
                    font-Family: 'Playfair Display', Georgia, serif;
                    font-size: clamp(48px, 7vw, 88px);
                    letter-spacing: -0.05em;
                    color: #fff;
                    line-height: 1;
                }

                .projects-title em {
                    font-family: 'Libre Baskerville', serif;
                    font-style: italic;
                    color: #888;
                    font-size: 0.65em;
                }

                .projects-count {
                    font-family: 'Space Mono', monospace;
                    font-size: 11px;
                    letter-spacing: 0.2em;
                    color: #444;
                    text-transform: uppercase;
                }

                .projects-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 2px;
                    margin-bottom: 2px;
                }

                .project-item {
                    display: flex;
                    flex-direction: column;
                    gap: 0;
                }

                .project-meta {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 18px 0 32px;
                    border-bottom: 1px solid #1a1a1a;
                }

                .project-name {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: clamp(22px, 2.5vw, 32px);
                    letter-spacing: 0.06em;
                    color: #e8e8e8;
                }

                .project-category {
                    font-family: 'Space Mono', monospace;
                    font-size: 10px;
                    letter-spacing: 0.15em;
                    color: #444;
                    text-transform: uppercase;
                }

                .project-card {
                    border: 1px solid #1a1a1a;
                }

                .project-card:hover {
                    border-color: #333;
                }

                /* CTA */
                .cta-section {
                    margin-top: 80px;
                    padding: 0;
                    position: relative;
                }

                .cta-wrapper {
                    border-top: 1px dashed #2a2a2a;
                    border-bottom: 1px dashed #2a2a2a;
                    padding: 28px 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    transition: background 0.3s ease;
                    position: relative;
                    overflow: hidden;
                }

                .cta-wrapper::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: #fff;
                    transform: scaleX(0);
                    transform-origin: left;
                    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .cta-wrapper:hover::before {
                    transform: scaleX(1);
                }

                .cta-text {
                    font-family: 'Bebas Neue', sans-serif;
                    font-size: clamp(22px, 3vw, 36px);
                    letter-spacing: 0.2em;
                    color: #e8e8e8;
                    position: relative;
                    z-index: 1;
                    transition: color 0.5s ease;
                    display: flex;
                    align-items: center;
                    gap: 20px;
                }

                .cta-wrapper:hover .cta-text {
                    color: #0a0a0a;
                }

                .cta-arrow {
                    display: inline-block;
                    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .cta-wrapper:hover .cta-arrow {
                    transform: translateX(8px);
                }

                @media (max-width: 768px) {
                    #projects-section { padding: 48px 20px; }
                    .projects-grid { grid-template-columns: 1fr; }
                }
            `}</style>

            <section id="projects-section">
                {/* Header */}
                <div className="projects-header">
                    <h2 className="projects-title">
                        SELECTED<em>Work</em>
                    </h2>
                    <span className="projects-count">[ 001 — {String(PROJECTS.length).padStart(3, '0')} ]</span>
                </div>

                {/* Grid */}
                <div className="projects-grid">
                    {PROJECTS.map((project) => (
                        <div key={project.num} className="project-item">
                            <ProjectCard project={project} />
                            <div className="project-meta">
                                <span className="project-name">{project.title}</span>
                                <span className="project-category">{project.category}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="cta-section">
                    <div className="cta-wrapper">
                        <span className="cta-text">
                            Start a Project
                            <span className="cta-arrow">→</span>
                        </span>
                    </div>
                </div>
                {/* Google Fonts import via style tag */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@900&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');
      `}</style>
            </section>
        </>
    );
};

export default Projects;