import { Link } from "react-router-dom";

export default function Disclaimer() {
    return (
        <div
            className="container mx-auto p-4 text-center text-sm text-white/70"
            style={{ fontFamily: "'Josefin Sans', sans-serif" }}
        >
            <p>© 2026 Mirage Community</p>
            <p>We're not affiliated with or endorsed by Discord.</p>
            <div className="mt-4">
                <Link
                    to="/terms"
                    className="underline hover:text-white"
                    style={{ fontFamily: "'Josefin Sans', sans-serif" }}
                >
                    Terms of Service
                </Link>
                <span className="mx-2 text-white/70">|</span>
                <Link
                    to="/privacy"
                    className="underline hover:text-white"
                    style={{ fontFamily: "'Josefin Sans', sans-serif" }}
                >
                    Privacy Policy
                </Link>
            </div>
        </div>
    );
}