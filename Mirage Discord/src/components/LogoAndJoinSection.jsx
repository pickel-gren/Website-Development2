import logo from "../assets/2Q.jpg";
import pic from "/image.png";
import discordLogo from "../assets/discord-logo.svg";

export default function LogoAndJoinSection() {
    // Prevent drag, copy, and context menu for the whole container
    const preventActions = (e) => {
        e.preventDefault();
        return false;
    };

    return (
        <div
            className="flex items-center justify-center min-h-[400px] w-full relative select-none"
            onDragStart={preventActions}
            onCopy={preventActions}
            onCut={preventActions}
            onContextMenu={preventActions}
            onMouseDown={e => {
                if (e.button === 2) preventActions(e);
            }}
            style={{ userSelect: "none" }}
        >
            {/* Frosted glass container with floating animation and glitter edges - NOW TRANSPARENT */}
            <div
                className="
                    relative
                    flex flex-col md:flex-row items-center justify-center
                    backdrop-blur-xl
                    border-4 border-white/80
                    rounded-3xl
                    shadow-2xl
                    overflow-hidden
                    p-8
                    w-[90vw]
                    max-w-none
                    animate-float
                    select-none
                "
                onDragStart={preventActions}
                onCopy={preventActions}
                onCut={preventActions}
                onContextMenu={preventActions}
                style={{ userSelect: "none" }}
            >
                {/* Background image at 90% opacity, inside container */}
                <img
                    src={pic || ""}
                    alt="Mirage Background"
                    className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none select-none"
                    style={{ opacity: 0.9, userSelect: "none" }}
                    draggable={false}
                    onContextMenu={preventActions}
                    onDragStart={preventActions}
                />

                {/* Top edge shimmer */}
                <div className="absolute top-0 left-0 w-full h-3 rounded-t-3xl bg-gradient-to-r from-white/60 via-white/40 to-white/60 animate-shimmer-glitter z-20 pointer-events-none" />
                {/* Bottom edge shimmer */}
                <div className="absolute bottom-0 left-0 w-full h-3 rounded-b-3xl bg-gradient-to-r from-white/60 via-white/40 to-white/60 animate-shimmer-glitter z-20 pointer-events-none" />

                {/* Mirage icon inside a frosted bubble glass circular edge */}
                <div
                    className="relative flex-shrink-0 mr-0 md:mr-8 z-10 w-32 h-32 md:w-40 md:h-40 flex items-center justify-center select-none"
                    onDragStart={preventActions}
                    onCopy={preventActions}
                    onCut={preventActions}
                    onContextMenu={preventActions}
                    style={{ userSelect: "none" }}
                >
                    {/* Frosted glass circular edge */}
                    <div
                        className="absolute left-1/2 top-1/2 w-[110%] h-[110%] rounded-full border-4 border-white/80 bg-white/30 backdrop-blur-xl shadow-[0_0_30px_rgba(255,255,255,0.15)] z-10 pointer-events-none select-none"
                        style={{
                            transform: "translate(-50%, -50%)",
                            boxShadow: "0 0 32px 8px rgba(255,255,255,0.10), 0 0 0 12px rgba(255,255,255,0.10)",
                            borderRadius: "50%",
                            userSelect: "none"
                        }}
                        draggable={false}
                        onContextMenu={preventActions}
                        onDragStart={preventActions}
                    />
                    {/* Mirage icon image, strictly undraggable/uncopyable/undownloadable */}
                    <img
                        src={logo || "/2Q.jpg"}
                        alt="Mirage Icon"
                        className="relative w-24 h-24 md:w-32 md:h-32 rounded-full object-cover z-20 select-none pointer-events-none"
                        style={{
                            boxShadow: "0 0 0 8px rgba(255,255,255,0.15)",
                            background: "rgba(255,255,255,0.15)",
                            userSelect: "none"
                        }}
                        draggable={false}
                        onContextMenu={preventActions}
                        onDragStart={preventActions}
                    />
                </div>

                {/* Join Discord Card - MAINTAINING VISIBILITY WITH SUBTLE BACKGROUND */}
                <div className="
                    relative
                    backdrop-blur-xl
                    border-4 border-white/60
                    rounded-2xl
                    p-6
                    flex flex-col gap-3
                    shadow-[0_0_30px_rgba(255,255,255,0.15)]
                    min-w-[220px]
                    z-10
                    select-none
                "
                    onDragStart={preventActions}
                    onCopy={preventActions}
                    onCut={preventActions}
                    onContextMenu={preventActions}
                    style={{ userSelect: "none" }}
                >
                    <div className="bg-[#5865F2] rounded-md p-2 shadow-[0_0_10px_rgba(88,101,242,0.7)] w-fit mx-auto transition-all duration-200 hover:bg-[#4752C4] hover:shadow-[0_0_12px_rgba(88,101,242,0.7)] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#5865F2]">
                        <div className="flex items-center space-x-2">
                            {/* Official Discord logo from discord.com/branding */}
                            <img
                                src={discordLogo}
                                alt="Discord Logo"
                                className="w-5 h-5"
                            />
                        </div>
                    </div>
                    <a
                        href="https://discord.gg/GerGdy49"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block mx-auto bg-[#5865F2] text-white font-semibold p-2 rounded-lg transition-all duration-200 hover:bg-[#4752C4] hover:shadow-[0_0_12px_rgba(88,101,242,0.7)] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#5865F2] z-10 select-none"
                        style={{ fontFamily: "'Josefin Sans', sans-serif", userSelect: "none" }}
                        draggable={false}
                        onContextMenu={preventActions}
                        onDragStart={preventActions}
                    >
                        Join Mirage Community Today
                    </a>
                    <div
                        className="mt-2 text-center font-bold px-4 py-2 rounded-lg shadow-lg"
                        style={{
                            background: "linear-gradient(90deg, #ff512f 0%, #dd2476 100%)",
                            color: "#fff",
                            fontSize: "1.15rem",
                            letterSpacing: "1px",
                            boxShadow: "0 0 16px 0 rgba(221,36,118,0.25), 0 2px 8px 0 rgba(255,81,47,0.18)",
                            fontFamily: "'Josefin Sans', sans-serif"
                        }}
                    >
                        <span className="pulse-dot" style={{ display: "inline-block", width: "8px", height: "8px", backgroundColor: "#4ade80", borderRadius: "50%", marginRight: "6px", verticalAlign: "middle" }}></span>
                        63,000 Members Online
                    </div>
                </div>
            </div>
        </div>
    );
}