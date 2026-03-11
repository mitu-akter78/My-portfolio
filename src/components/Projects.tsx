import { useEffect, useRef, useState, useCallback } from 'react';

const PROJECTS = [
    {
        num: '001',
        title: "Fizzy landing page",
        category: 'Next.js, Tailwind CSS, GSAP',
        year: '2025',
        githubUrl: 'https://github.com/mitu-akter78/Fizzy-landing-page',
        images: [
            '/fizzy/img1.png',
            '/fizzy/img2.png',
            '/fizzy/img3.png',
            '/fizzy/img4.png',
        ],
        // Change 'left center' below to 'right center' or 'top left' etc. if still cut off
        imagePositions: ['center', '20% center', 'center', 'center'],
    },
    {
        num: '002',
        title: 'Lightwaves',
        category: 'Branding & Digital Experience',
        year: '2024',
        githubUrl: 'https://github.com/yourusername/lightwaves',
        images: [
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop',
        ],
        imagePositions: ['center', 'center', 'center', 'center'],
    },
    {
        num: '003',
        title: 'Meridian Studio',
        category: 'Identity & Web Development',
        year: '2023',
        githubUrl: 'https://github.com/yourusername/meridian-studio',
        images: [
            'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1200&auto=format&fit=crop',
        ],
        imagePositions: ['center', 'center', 'center', 'center'],
    },
    {
        num: '004',
        title: 'Vault Finance',
        category: 'UI/UX & Product Design',
        year: '2023',
        githubUrl: 'https://github.com/yourusername/vault-finance',
        images: [
            'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1200&auto=format&fit=crop',
        ],
        imagePositions: ['center', 'center', 'center', 'center'],
    },
];

/* ─── GITHUB ICON SVG ───────────────────────────────────────────────────── */
const GitHubIcon = () => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
);

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
                    aspect-ratio: 18/10;
                    background: #090909;
                    overflow: hidden;
                    transition: border-color 0.4s ease;
                }
                .pc-root:hover {
                    border-color: #303030 !important;
                }

                .pc-img-wrapper {
                    position: absolute;
                    inset: 0;
                    overflow: hidden;
                    z-index: 1;
                    transform: scale(1);
                    transition: transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
                    will-change: transform;
                }
                .pc-root:hover .pc-img-wrapper {
                    transform: scale(0.94);
                }

                .pc-img-wrapper img {
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    filter: grayscale(100%) brightness(0.72) contrast(1.05);
                    display: block;
                    transition: opacity 0.22s ease;
                }

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

                .pc-github {
                    position: absolute;
                    bottom: 14px;
                    right: 14px;
                    z-index: 10;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 6px 10px;
                    background: rgba(10, 10, 10, 0.75);
                    backdrop-filter: blur(6px);
                    -webkit-backdrop-filter: blur(6px);
                    border: 1px solid rgba(255, 255, 255, 0.12);
                    border-radius: 4px;
                    color: rgba(255, 255, 255, 0.55);
                    font-family: 'Space Mono', monospace;
                    font-size: 9px;
                    letter-spacing: 0.14em;
                    text-decoration: none;
                    text-transform: uppercase;
                    cursor: pointer;
                    opacity: 0;
                    transform: translateY(6px);
                    transition:
                        opacity 0.3s ease 0.05s,
                        transform 0.35s cubic-bezier(0.16, 1, 0.3, 1) 0.05s,
                        color 0.2s ease,
                        border-color 0.2s ease,
                        background 0.2s ease;
                    pointer-events: none;
                }
                .pc-root:hover .pc-github {
                    opacity: 1;
                    transform: translateY(0);
                    pointer-events: auto;
                }
                .pc-github:hover {
                    color: rgba(255, 255, 255, 0.9) !important;
                    border-color: rgba(255, 255, 255, 0.3) !important;
                    background: rgba(255, 255, 255, 0.08) !important;
                }
            `}</style>

            <div
                className="pc-root project-card"
                onMouseEnter={() => { setIsHovered(true); startCycling(); }}
                onMouseLeave={() => { setIsHovered(false); stopCycling(); }}
            >
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
                                objectPosition: project.imagePositions?.[i] ?? 'center',
                            }}
                        />
                    ))}
                    <div className="pc-scrim" />
                </div>

                <div className="pc-corner pc-corner--tl" />
                <div className="pc-corner pc-corner--tr" />
                <div className="pc-corner pc-corner--bl" />
                <div className="pc-corner pc-corner--br" />

                <span className="pc-num"  style={{ color: isHovered ? 'rgba(255,255,255,0.5)'  : 'rgba(255,255,255,0.2)'  }}>{project.num}</span>
                <span className="pc-year" style={{ color: isHovered ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.18)' }}>{project.year}</span>

                <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pc-github"
                    onClick={e => e.stopPropagation()}
                    aria-label={`View ${project.title} on GitHub`}
                >
                    <GitHubIcon />
                    <span>Repo</span>
                </a>
            </div>
        </>
    );
};

/* ─── PROJECTS SECTION ──────────────────────────────────────────────────── */

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
                    font-size: clamp(32px, 5vw, 88px);
                    letter-spacing: -0.05em;
                    color: #fcf5f6;
                    line-height: 1;
                    word-break: break-word;
                }

                .projects-title em {
                    font-family: 'Libre Baskerville', serif;
                    font-style: italic;
                    color: rgba(242,240,235,0.55);
                    font-size: 0.65em;
                }

                .projects-count {
                    font-family: 'Space Mono', monospace;
                    font-size: 11px;
                    letter-spacing: 0.2em;
                    color: rgba(242,240,235,0.3);
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
                    color: #F2F0EB;
                }

                .project-category {
                    font-family: 'Space Mono', monospace;
                    font-size: 10px;
                    letter-spacing: 0.15em;
                    color: rgba(242,240,235,0.3);
                    text-transform: uppercase;
                }

                .project-card {
                    border: 1px solid #1a1a1a;
                }

                @media (max-width: 768px) {
                    #projects-section { padding: 48px 20px; }
                    .projects-grid { grid-template-columns: 1fr; }
                    .projects-header { 
                        flex-direction: column; 
                        align-items: flex-start; 
                        gap: 16px; 
                    }
                }
            `}</style>

            <section id="projects-section" style={{ position: 'relative', overflowX: 'clip' }}>
                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.02]"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                        backgroundSize: '32px 32px',
                    }}
                />

                <div className="projects-header">
                    <h2 className="projects-title">
                        SELECTED<em>Work</em>
                    </h2>
                    <span className="projects-count">[ 001 — {String(PROJECTS.length).padStart(3, '0')} ]</span>
                </div>

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

                <style>{`
                    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@900&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap');
                `}</style>
            </section>
        </>
    );
};

export default Projects;