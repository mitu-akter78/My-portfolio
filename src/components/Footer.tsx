const Footer = () => {
    return (
        <footer className="bg-ink text-white pt-12 pb-6 px-6 md:px-12 border-t border-white/10 relative">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

                {/* Left Side */}
                <div className="flex flex-col text-center md:text-left">
                    <span className="font-display font-bold text-lg">Sadia</span>
                    <span className="font-mono text-xs text-muted">Full Stack Developer &middot; Bangladesh</span>
                </div>

                {/* Center: Heartbeat Line */}
                <div className="hidden md:flex flex-1 max-w-[200px] items-center mx-8">
                    <div className="h-px bg-white/10 w-full relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full animate-ping opacity-50"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full"></div>
                    </div>
                </div>

                {/* Right Side */}
                <div className="flex flex-col items-center md:items-end gap-2 text-center md:text-right">
                    <nav className="flex gap-4 font-mono text-xs text-muted">
                        <a href="#" className="hover:text-white transition-colors">Home</a>
                        <a href="#about" className="hover:text-white transition-colors">About</a>
                        <a href="#projects" className="hover:text-white transition-colors">Projects</a>
                        <a href="#contact" className="hover:text-white transition-colors">Contact</a>
                    </nav>
                    <span className="font-mono text-[10px] text-white/30">&copy; 2026 Sadia. All rights reserved.</span>
                </div>

            </div>

            {/* Easter Egg */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 font-mono text-[10px] text-white/5 opacity-50 hover:opacity-100 hover:text-white/40 transition-opacity cursor-default">
                &#9000; Built with obsession.
            </div>
        </footer>
    );
};

export default Footer;
