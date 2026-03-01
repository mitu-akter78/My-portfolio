import { ArrowRight } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="py-32 bg-ink text-white relative overflow-hidden">

            {/* Abstract Background Elements */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/1 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

            <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10 flex flex-col items-center">

                <h2 className="font-display text-5xl md:text-7xl lg:text-[6rem] font-bold tracking-[-0.03em] leading-[1.1] mb-8">
                    Let's build something <br />
                    <span className="font-serif italic text-white/90">remarkable</span> together.
                </h2>

                <p className="text-muted text-lg md:text-xl max-w-xl mb-12 leading-relaxed">
                    Whether it's a project, a role, or just a hello &mdash; <br className="hidden sm:block" />
                    my inbox is always open.
                </p>

                <a
                    href="mailto:hello@example.com"
                    className="group relative inline-flex items-center gap-4 px-10 py-5 bg-white text-ink rounded-full font-medium text-lg overflow-hidden"
                >
                    <span className="relative z-10 text-ink group-hover:text-white transition-colors duration-300">Work With Me</span>
                    <ArrowRight className="relative z-10 text-ink group-hover:text-white group-hover:translate-x-1 transition-all duration-300" size={20} />

                    {/* Hover Inversion Background */}
                    <div className="absolute inset-0 bg-ink translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-full -mx-px"></div>
                    <div className="absolute inset-0 border border-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity delay-100"></div>
                </a>

                {/* Divider separator */}
                <div className="w-full max-w-xs h-px bg-white/10 my-16 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-ink px-4 text-xs font-mono text-muted uppercase tracking-widest">
                        Or find me on
                    </div>
                </div>

                {/* Social Links Minimum style */}
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
                    {['GitHub', 'LinkedIn', 'Twitter'].map(social => (
                        <a
                            key={social}
                            href="#"
                            className="flex items-center gap-2 text-muted hover:text-white transition-colors group"
                        >
                            <span className="font-mono text-sm">{social}</span>
                            <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 transform -rotate-45" />
                        </a>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Contact;
