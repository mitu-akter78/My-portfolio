import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const Navigation = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#' },
        { name: 'About', href: '#about' },
        { name: 'Skills', href: '#skills' },
        { name: 'Projects', href: '#projects' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <>
            <header
                className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ paddingTop: isScrolled ? '1rem' : '0' }}
            >
                <div
                    className={cn(
                        "w-full flex items-center justify-between border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                        isScrolled
                            ? "max-w-4xl mx-4 rounded-full glass-strong py-3 px-6 shadow-[0_8px_32px_rgba(0,0,0,0.3)] border-white/5"
                            : "max-w-[1400px] mx-6 md:mx-12 rounded-none py-6 px-0 bg-transparent border-transparent shadow-none"
                    )}
                >
                    <div className="font-display font-bold text-xl tracking-tight text-white">
                        Sadia.
                    </div>

                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link, i) => (
                            <a
                                key={i}
                                href={link.href}
                                className="text-sm font-medium text-muted hover:text-white transition-colors duration-200"
                            >
                                {link.name}
                            </a>
                        ))}
                    </nav>

                    <button
                        className="md:hidden text-white"
                        onClick={() => setIsMobileMenuOpen(true)}
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                className={cn(
                    "fixed inset-0 z-[60] bg-ink/95 backdrop-blur-md flex flex-col items-center justify-center transition-opacity duration-300",
                    isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                )}
            >
                <button
                    className="absolute top-6 right-6 text-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    <X size={32} />
                </button>
                <nav className="flex flex-col items-center gap-8">
                    {navLinks.map((link, i) => (
                        <a
                            key={i}
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="font-display text-4xl font-medium text-white hover:text-white/70 transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                </nav>
            </div>
        </>
    );
};

export default Navigation;