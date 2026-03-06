import { useState, useRef, useEffect } from "react";
import { Phone, Video, MoreVertical, Users, Info } from "lucide-react";

export default function ChatHeader({
    activeChat = null,
    onActionClick = () => { }
}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    // Handle click outside to close menu
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        }
        if (isMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMenuOpen]);

    const handleOptionClick = (action) => {
        onActionClick(action);
        setIsMenuOpen(false);
    };

    return (
        <div className="bg-[var(--bg-primary)] rounded-[20px] h-16 px-6 flex flex-shrink-0 items-center justify-between shadow-sm border border-[var(--border-primary)] relative z-20">

            {/* Title & Avatars */}
            {!activeChat ? (
                <div className="text-sm font-semibold text-[var(--text-muted)]">No Chat Selected</div>
            ) : (
                <div className="flex items-center gap-4">
                    <h1 className="text-lg font-bold text-[var(--text-primary)]">{activeChat.title || "Chat Detail"}</h1>

                    <div className="flex items-center gap-2 bg-[var(--bg-secondary)] pl-1.5 pr-3 py-1 rounded-full border border-[var(--border-primary)]">
                        <div className="flex -space-x-1.5">
                            {activeChat.participants && activeChat.participants.length > 0 ? (
                                activeChat.participants.slice(0, 3).map((participant, i) => (
                                    <div key={i} className="w-6 h-6 rounded-full bg-[var(--bg-tertiary)] border-2 border-[var(--bg-primary)] flex items-center justify-center text-[9px] font-bold text-[var(--text-muted)]">
                                        {participant.name?.charAt(0) || "U"}
                                    </div>
                                ))
                            ) : (
                                <div className="w-6 h-6 rounded-full bg-[var(--bg-tertiary)] border-2 border-[var(--bg-primary)] flex items-center justify-center">
                                    <Users size={12} className="text-[var(--text-muted)]" />
                                </div>
                            )}
                        </div>
                        {activeChat.participants?.length > 3 && (
                            <span className="text-[var(--accent-primary)] font-bold text-[10px] bg-[var(--bg-tertiary)] px-1.5 py-0.5 rounded-full ml-0.5">
                                +{activeChat.participants.length - 3}
                            </span>
                        )}
                    </div>
                </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-1.5 relative">
                <button
                    onClick={() => onActionClick('call')}
                    className="w-8 h-8 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] flex items-center justify-center transition"
                    disabled={!activeChat}
                >
                    <Phone size={16} />
                </button>
                <button
                    onClick={() => onActionClick('video')}
                    className="w-8 h-8 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] flex items-center justify-center transition"
                    disabled={!activeChat}
                >
                    <Video size={16} />
                </button>
                <div className="w-[1px] h-5 bg-[var(--border-primary)] mx-1"></div>

                <div className="relative" ref={menuRef}>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition shadow-sm ${isMenuOpen
                                ? "bg-[var(--bg-secondary)] text-[var(--text-primary)]"
                                : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
                            }`}
                        aria-label="More options"
                    >
                        <MoreVertical size={16} />
                    </button>

                    {/* Dropdown Menu */}
                    {isMenuOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-xl shadow-lg py-1.5 z-50 animate-in fade-in zoom-in duration-200 origin-top-right">
                            <button
                                onClick={() => handleOptionClick('chat-details')}
                                className="w-full px-4 py-2 text-left text-xs font-medium text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] flex items-center gap-3 transition-colors"
                            >
                                <Info size={14} className="text-[var(--text-muted)]" />
                                Chat Details
                            </button>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}
