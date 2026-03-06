import { Search, Plus, PenSquare, MessageSquare } from "lucide-react";

export default function ChannelSidebar({
    chats = [],
    onChatSelect = () => { },
    activeChatId = null,
    onInviteClick = () => { },
    onCreateChat = () => { }
}) {
    return (
        <div className="w-[280px] flex flex-col gap-3 z-10 shrink-0">

            {/* Top User Invite Widget */}
            <div className="bg-[var(--bg-primary)] rounded-[20px] p-3 flex flex-col shadow-sm border border-[var(--border-primary)]">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex -space-x-1.5">
                        {/* Generic avatar placeholders indicating team presence */}
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-600 border border-[#FFFFFF] dark:border-[#1E1E24] flex items-center justify-center">
                                <svg className="w-3 h-3 text-gray-400 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                            </div>
                        ))}
                        <button
                            onClick={onInviteClick}
                            className="w-6 h-6 rounded-full bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] text-[10px] flex items-center justify-center border border-[var(--border-primary)] z-10 font-bold transition-colors"
                            aria-label="Add Member"
                        >
                            +
                        </button>
                    </div>
                    <button
                        onClick={onInviteClick}
                        className="bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-[var(--accent-text)] px-4 py-1.5 rounded-lg text-xs font-medium transition-colors shadow-sm"
                    >
                        Invite
                    </button>
                </div>

                {/* Search */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[var(--text-primary)] text-xs rounded-lg py-2 pl-3 pr-8 outline-none focus:ring-1 focus:ring-[var(--accent-primary)] transition-shadow placeholder-[var(--text-muted)]"
                    />
                    <Search className="absolute right-2.5 top-1/2 -trangray-y-1/2 text-gray-400" size={14} />
                </div>
            </div>

            {/* Messages List Area */}
            <div className="bg-[var(--bg-primary)] rounded-[20px] flex-1 flex flex-col overflow-hidden shadow-sm border border-[var(--border-primary)]">

                <div className="px-4 py-3.5 flex items-center justify-between border-b border-[var(--border-primary)] bg-[var(--bg-primary)] z-10">
                    <div className="flex items-center gap-2">
                        <h2 className="text-[13px] font-bold text-[var(--text-primary)]">Messages</h2>
                        {/* Optional unread badge, could pass total unread count */}
                        {chats.some(c => c.unread > 0) && (
                            <span className="text-[var(--accent-text)] text-[10px] font-bold bg-[var(--accent-primary)] px-1.5 py-0.5 rounded">
                                Unread
                            </span>
                        )}
                    </div>
                    <button
                        onClick={onCreateChat}
                        className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition p-1 rounded-md hover:bg-[var(--bg-secondary)]"
                        aria-label="New Chat"
                    >
                        <PenSquare size={14} strokeWidth={2.5} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-2 py-2 custom-scrollbar">
                    {!chats || chats.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400 py-10">
                            <MessageSquare size={24} className="mb-2 opacity-20" />
                            <p className="text-xs text-center px-4 font-medium">No conversations found.</p>
                            <p className="text-[10px] text-center px-4 mt-1 opacity-70">Start a new chat to begin messaging.</p>
                        </div>
                    ) : (
                        chats.map((chat) => (
                            <div
                                key={chat.id}
                                onClick={() => onChatSelect(chat.id)}
                                className={`flex items-center gap-2.5 p-2 rounded-xl cursor-pointer transition-all mb-0.5 ${chat.id === activeChatId
                                    ? "bg-[var(--bg-secondary)] shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[var(--border-secondary)] z-10"
                                    : "hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-transparent"
                                    }`}
                            >
                                <div className="relative flex-shrink-0">
                                    {/* Generic User Initials Avatar mapping */}
                                    <div className={`w-9 h-9 flex items-center justify-center rounded-full text-xs font-bold text-white shadow-inner bg-gray-300 dark:bg-gray-600 uppercase ${chat.id === activeChatId ? 'ring-2 ring-white dark:ring-gray-800' : ''}`}>
                                        {chat.name.charAt(0)}
                                    </div>

                                    {chat.online && (
                                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#FFFFFF] dark:border-[#1E1E24] rounded-full"></div>
                                    )}
                                </div>

                                <div className="flex-1 min-w-0 flex flex-col justify-center">
                                    <div className="flex justify-between items-center mb-[2px]">
                                        <h3 className={`font-semibold text-xs truncate ${chat.id === activeChatId ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}>
                                            {chat.name}
                                        </h3>
                                        <span className="text-[10px] text-[var(--text-muted)] flex-shrink-0 ml-2">{chat.time}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className={`text-[11px] truncate max-w-[120px] ${chat.id === activeChatId ? 'text-[var(--text-secondary)]' : 'text-[var(--text-muted)]'}`}>
                                            {chat.lastMessage}
                                        </p>
                                        {chat.unread > 0 && (
                                            <span className="w-3.5 h-3.5 bg-[var(--danger-primary)] text-white text-[9px] font-bold rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                                                {chat.unread > 9 ? '9+' : chat.unread}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

            </div>
        </div>
    );
}
