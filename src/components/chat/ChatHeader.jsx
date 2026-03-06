import { Phone, Video, MoreVertical, Users } from "lucide-react";

export default function ChatHeader({
    activeChat = null,
    onActionClick = () => { }
}) {
    return (
        <div className="bg-[var(--bg-primary)] rounded-[20px] h-16 px-6 flex flex-shrink-0 items-center justify-between shadow-sm border border-[var(--border-primary)]">

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
            <div className="flex items-center gap-1.5">
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
                <button
                    onClick={() => onActionClick('options')}
                    className="w-8 h-8 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] flex items-center justify-center transition"
                    disabled={!activeChat}
                >
                    <MoreVertical size={16} />
                </button>
            </div>

        </div>
    );
}
