export default function Footer() {
    const socialLinks = [
        {
            label: "GitHub",
            href: "https://github.com",
            icon: "code",
        },
        {
            label: "LinkedIn",
            href: "https://linkedin.com",
            icon: "work",
        },
        {
            label: "Twitter",
            href: "https://twitter.com",
            icon: "share",
        },
        {
            label: "Email",
            href: "mailto:hello@ganeshkulkarni.dev",
            icon: "mail",
        },
    ];

    return (
        <footer className="w-full py-12 bg-transparent">
            <div className="flex flex-col items-center gap-6 max-w-7xl mx-auto px-8">
                {/* Social Icons */}
                <div className="flex items-center gap-4">
                    {socialLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 flex items-center justify-center rounded-full border border-outline-variant/20 text-neutral-500 hover:text-blue-400 hover:border-blue-400/50 transition-colors solaris-transition"
                            aria-label={link.label}
                        >
                            <span className="material-symbols-outlined text-xl">
                                {link.icon}
                            </span>
                        </a>
                    ))}
                </div>

                {/* Brand */}
                <div className="text-lg font-black text-neutral-100 font-[family-name:var(--font-headline)] tracking-widest">
                    GANESH KULKARNI
                </div>

                {/* Text Links */}
                <div className="flex gap-8">
                    {socialLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-[family-name:var(--font-body)] text-xs uppercase tracking-widest text-neutral-500 hover:text-blue-400 transition-colors"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>

                <p className="font-[family-name:var(--font-body)] text-[10px] uppercase tracking-widest text-neutral-500 opacity-60 text-center">
                    © {new Date().getFullYear()} Ganesh Kulkarni. Built for the cinematic
                    web.
                </p>
            </div>
        </footer>
    );
}
