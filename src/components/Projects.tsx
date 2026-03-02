import React, { useEffect, useRef, useState, useCallback } from 'react';

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

/* ─── PREMIUM PROJECT CARD ──────────────────────────────────────────────── */

const ProjectCard = ({ project }: { project: typeof PROJECTS[0] }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [currentImageIdx, setCurrentImageIdx] = useState(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const startCycling = useCallback(() => {
        setCurrentImageIdx(0);
        intervalRef.current = setInterval(() => {
            setCurrentImageIdx(prev => (prev + 1) % project.images.length);
        }, 500);
    }, [project.images.length]);

    const stopCycling = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setCurrentImageIdx(0);
    }, []);

    useEffect(() => () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
    }, []);

    return (
        <>
            <style>{`
                .pc-root {
                    position: relative;
                    cursor: pointer;
                    aspect-ratio: 16/10;
                    background: #090909;
                    overflow: hidden;
                    transition: border-color 0.4s ease;
                }
                .pc-root:hover {
                    border-color: #303030 !important;
                }

                /* The image wrapper — full at rest, shrinks inward on hover */
                .pc-img-wrapper {
                    position: absolute;
                    overflow: hidden;
                    transition: inset 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                    inset: 0px;
                    z-index: 1;
                }
                .pc-root:hover .pc-img-wrapper {
                    inset: 20px;
                }

                .pc-img-wrapper img {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    filter: grayscale(100%) brightness(0.72) contrast(1.05);
                    display: block;
                }

                /* Bottom scrim inside wrapper */
                .pc-scrim {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 55%);
                    z-index: 2;
                    pointer-events: none;
                    opacity: 0;
                    transition: opacity 0.4s ease;
                }
                .pc-root:hover .pc-scrim { opacity: 1; }

                /* Corner brackets at card edges */
                .pc-corner {
                    position: absolute;
                    width: 13px;
                    height: 13px;
                    z-index: 6;
                    opacity: 0;
                    transition: opacity 0.35s ease;
                    pointer-events: none;
                }
                .pc-root:hover .pc-corner { opacity: 1; }
                .pc-corner--tl { top: 7px;    left: 7px;    border-top: 1px solid rgba(255,255,255,0.4); border-left: 1px solid rgba(255,255,255,0.4); }
                .pc-corner--tr { top: 7px;    right: 7px;   border-top: 1px solid rgba(255,255,255,0.4); border-right: 1px solid rgba(255,255,255,0.4); }
                .pc-corner--bl { bottom: 7px; left: 7px;    border-bottom: 1px solid rgba(255,255,255,0.4); border-left: 1px solid rgba(255,255,255,0.4); }
                .pc-corner--br { bottom: 7px; right: 7px;   border-bottom: 1px solid rgba(255,255,255,0.4); border-right: 1px solid rgba(255,255,255,0.4); }

                /* Progress dots */
                .pc-dots {
                    position: absolute;
                    bottom: 9px;
                    left: 50%;
                    transform: translateX(-50%);
                    display: flex;
                    gap: 5px;
                    z-index: 7;
                    opacity: 0;
                    transition: opacity 0.3s ease 0.15s;
                    pointer-events: none;
                }
                .pc-root:hover .pc-dots { opacity: 1; }
                .pc-dot {
                    width: 4px;
                    height: 4px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.2);
                    transition: background 0.2s ease, transform 0.2s ease;
                }
                .pc-dot--active {
                    background: rgba(255,255,255,0.85);
                    transform: scale(1.35);
                }

                /* Number + year tags */
                .pc-num, .pc-year {
                    position: absolute;
                    font-family: 'Space Mono', monospace;
                    font-size: 10px;
                    letter-spacing: 0.12em;
                    z-index: 8;
                    pointer-events: none;
                    transition: color 0.3s ease;
                }
                .pc-num  { top: 13px; left: 15px; }
                .pc-year { top: 13px; right: 15px; letter-spacing: 0.15em; }
            `}</style>

            <div
                className="pc-root project-card"
                onMouseEnter={() => { setIsHovered(true); startCycling(); }}
                onMouseLeave={() => { setIsHovered(false); stopCycling(); }}
            >
                {/* ── Image wrapper: full at rest → shrinks on hover ── */}
                <div className="pc-img-wrapper">
                    {project.images.map((src, i) => (
                        <img
                            key={src}
                            src={src}
                            alt={project.title}
                            style={{
                                opacity: isHovered
                                    ? (i === currentImageIdx ? 1 : 0)
                                    : (i === 0 ? 1 : 0),
                                transition: 'opacity 0.2s ease',
                            }}
                        />
                    ))}
                    <div className="pc-scrim" />
                </div>

                {/* ── Corner brackets ── */}
                <div className="pc-corner pc-corner--tl" />
                <div className="pc-corner pc-corner--tr" />
                <div className="pc-corner pc-corner--bl" />
                <div className="pc-corner pc-corner--br" />

                {/* ── Tags ── */}
                <span className="pc-num"  style={{ color: isHovered ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.2)' }}>{project.num}</span>
                <span className="pc-year" style={{ color: isHovered ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.18)' }}>{project.year}</span>

                {/* ── Cycle progress dots ── */}
                <div className="pc-dots">
                    {project.images.map((_, i) => (
                        <div
                            key={i}
                            className={`pc-dot${isHovered && i === currentImageIdx ? ' pc-dot--active' : ''}`}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

/* ─── REST IS IDENTICAL ─────────────────────────────────────────────────── */

const Projects = () => {
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
                    background: #0A0A0A;
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
                    font-family: 'Playfair Display', Georgia, serif;
                    font-size: clamp(48px, 7vw, 88px);
                    letter-spacing: -0.05em;
                    color: #fcf5f6;
                    line-height: 1;
                }

                .projects-title em {
                    font-family: 'Libre Baskerville', serif;
                    font-style: italic;
                    color: #A93D54;
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

                /* CTA */
                .cta-section {
                    margin-top: 80px;
                    padding: 0;
                    position: relative;
                }

                .cta-wrapper {
                    border-top: 1px dashed #2a2a2a;
                    border-bottom: 1px dashed #2a2a2a;
                    padding: 20px 0;
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
                    font-size: clamp(22px, 2vw, 36px);
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
                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.02]"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                        backgroundSize: '32px 32px',
                    }}
                />

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

                <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@900&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');
                `}</style>
            </section>
        </>
    );
};

export default Projects;