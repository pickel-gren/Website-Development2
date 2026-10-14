import { Link } from "react-router-dom";
import discordWhiteLogo from "../assets/discord-logo.svg";

export default function Footer() {
    return (
        <footer
            className="
                w-[90vw] mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-8
                bg-white/10
                backdrop-blur-lg
                border-2 border-white/30
                rounded-2xl
                relative overflow-hidden
                p-6
            "
            style={{ fontFamily: "'Josefin Sans', sans-serif" }}
        >

            <div className="text-center">
                <h3
                    className="text-xl font-extrabold mb-4 tracking-widest"
                    style={{
                        color: "#fff",
                        fontFamily: "'Josefin Sans', sans-serif"
                    }}
                >
                    About Us
                </h3>
                <p className="text-white" style={{ fontFamily: "'Josefin Sans', sans-serif" }}>
                    Mirage is one of the most advanced, fastest-growing, and uniquely crafted communities on Discord. Built with passion and precision, Mirage brings together users from all walks of life to connect, play, and thrive in a vibrant, welcoming atmosphere. Whether you're here for games, social interaction, or just a place to chill, Mirage evolves constantly to deliver something truly special.
                </p>
            </div>
            <div className="text-center">
                <h3
                    className="text-xl font-extrabold mb-4 tracking-widest"
                    style={{
                        color: "#fff",
                        fontFamily: "'Josefin Sans', sans-serif"
                    }}
                >
                    Links
                </h3>
                <ul className="space-y-2">
                    <li>
                        <Link
                            to="/docs"
                            className="footer-link"
                            style={{ fontFamily: "'Josefin Sans', sans-serif", textDecoration: 'underline' }}
                        >
                            Docs
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/faq"
                            className="footer-link"
                            style={{ fontFamily: "'Josefin Sans', sans-serif", textDecoration: 'underline' }}
                        >
                            FAQ
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="text-center">
                <h3
                    className="text-xl font-extrabold mb-4 tracking-widest"
                    style={{
                        color: "#fff",
                        fontFamily: "'Josefin Sans', sans-serif"
                    }}
                >
                    Contact Us
                </h3>
                <p className="text-white mb-4" style={{ fontFamily: "'Josefin Sans', sans-serif" }}>
                    Have questions or concerns? Reach out to us at &nbsp;
                    <a
                        href="mailto:official.mirage.team@gmail.com"
                        className="text-[#5544F3] hover:underline font-semibold"
                        style={{ fontFamily: "'Josefin Sans', sans-serif" }}
                    >
                        official.mirage.team@gmail.com
                    </a>
                    &nbsp;. We’ll get back to you as soon as possible.
                </p>
                <a
                    href="https://discord.gg/mtFqgbqw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-extrabold flex items-center justify-center gap-3 w-full py-3 rounded-xl transition-all duration-200 border border-[#c4b5fd]/30 bg-gradient-to-r from-[#5865F2]/90 to-[#a78bfa]/90 hover:from-[#a78bfa]/90 hover:to-[#5865F2]/90 text-white text-center hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#8b5cf6] backdrop-blur-md"
                    style={{
                        fontFamily: "'Josefin Sans', sans-serif",
                        fontSize: "1.15rem",
                        letterSpacing: "1px"
                    }}
                >
                    <img
                        src={discordWhiteLogo}
                        alt="Discord Logo"
                        className="h-7 w-7 select-none"
                        style={{ userSelect: 'none' }}
                        draggable={false}
                        onContextMenu={e => e.preventDefault()}
                        onMouseDown={e => e.preventDefault()}
                    />
                    Discord Server
                </a>
            </div>
        </footer>
    );
}

// Custom styles for footer links
if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.innerHTML = `
        .footer-link {
            color: #fff;
            text-decoration: none;
            padding: 0.5rem;
            border-radius: 0.5rem;
            transition: color 0.18s, text-decoration 0.18s, background 0.18s;
            font-weight: normal;
            font-size: 1rem;
            display: inline-block;
        }
        .footer-link:hover, .footer-link:focus {
            text-decoration: underline;
            color: #fff;
            background: none;
        }
    `;
    document.head.appendChild(style);
}