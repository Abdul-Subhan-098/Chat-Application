import { Search, Plus, PenSquare, MessageSquare } from "lucide-react";
import UserProfile from "./UserProfile";

export default function ChannelSidebar({
    chats = [],
    onChatSelect = () => { },
    activeChatId = null,
    onInviteClick = () => { },
    onCreateChat = () => { },
    activeTab = "messages",
    // User Profile Props
    currentUser,
    isMuted,
    isDeafened,
    onMuteToggle,
    onDeafenToggle,
    onStatusChange,
    onSettingsClick
}) {
    return (
        <div className="w-[300px] flex flex-col gap-3 z-10 shrink-0 h-full pb-1">

            {/* Top Search Area */}
            <div className="bg-[var(--bg-primary)] rounded-[24px] p-3 flex flex-col shadow-sm border border-[var(--border-primary)]">
                <div className="flex items-center justify-between mb-3 px-1">
                    <h2 className="text-[14px] font-black text-[var(--text-primary)] tracking-tight uppercase">
                        {activeTab === 'messages' ? 'Direct Messages' : activeTab}
                    </h2>
                    <button
                        onClick={onInviteClick}
                        className="w-7 h-7 rounded-lg bg-[var(--bg-secondary)] text-[var(--text-primary)] hover:bg-[var(--accent-primary)] hover:text-white transition-all flex items-center justify-center border border-[var(--border-primary)] shadow-sm active:scale-90"
                        title="Start New Chat"
                    >
                        <Plus size={16} strokeWidth={3} />
                    </button>
                </div>

                <div className="relative group">
                    <input
                        type="text"
                        placeholder="Search conversations..."
                        className="w-full bg-[var(--bg-secondary)] border border-[var(--border-primary)] text-[var(--text-primary)] text-xs rounded-xl py-2.5 pl-9 pr-4 outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20 focus:border-[var(--accent-primary)] transition-all placeholder-[var(--text-muted)] font-medium"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-[var(--accent-primary)] transition-colors" size={14} />
                </div>
            </div>

            {/* List Area */}
            <div className="bg-[var(--bg-primary)] rounded-[24px] flex-1 flex flex-col overflow-hidden shadow-sm border border-[var(--border-primary)]">
                <div className="flex-1 overflow-y-auto px-2 py-2 custom-scrollbar">
                    {!chats || chats.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400 py-10 opacity-50">
                            <MessageSquare size={32} className="mb-3 opacity-20" />
                            <p className="text-xs text-center px-6 font-bold text-[var(--text-muted)] uppercase tracking-wider">No Conversations</p>
                        </div>
                    ) : (
                        chats.map((chat) => (
                            <div
                                key={chat.id}
                                onClick={() => onChatSelect(chat.id)}
                                className={`flex items-center gap-3 p-2.5 rounded-2xl cursor-pointer transition-all mb-1 group ${chat.id === activeChatId
                                    ? "bg-[var(--bg-secondary)] shadow-sm border border-[var(--border-primary)]"
                                    : "hover:bg-[var(--bg-secondary)]/50 border border-transparent"
                                    }`}
                            >
                                <div className="relative flex-shrink-0 isolate">
                                    <div className={`w-11 h-11 flex items-center justify-center rounded-2xl text-sm font-black shadow-inner transition-transform group-hover:scale-105 ${chat.id === activeChatId
                                        ? 'bg-[var(--accent-primary)] text-white'
                                        : 'bg-[var(--bg-tertiary)] text-[var(--text-primary)] border border-[var(--border-primary)]'
                                        }`}>
                                        {chat.initials || chat.name.charAt(0)}
                                    </div>

                                    {chat.online && (
                                        <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-[3px] border-[var(--bg-primary)] rounded-full shadow-[0_0_8px_rgba(16,185,129,0.3)]"></div>
                                    )}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline mb-0.5">
                                        <h3 className="font-bold text-sm truncate text-[var(--text-primary)] tracking-tight">
                                            {chat.name}
                                        </h3>
                                        <span className="text-[10px] text-[var(--text-muted)] font-bold opacity-70 flex-shrink-0 ml-2 uppercase">{chat.time}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className="text-xs truncate text-[var(--text-muted)] font-medium">
                                            {chat.lastMessage}
                                        </p>
                                        {chat.unread > 0 && (
                                            <span className="min-w-[18px] h-[18px] px-1 bg-[var(--accent-primary)] text-white text-[10px] font-black rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg shadow-[var(--accent-primary)]/20 animate-in zoom-in duration-300">
                                                {chat.unread > 9 ? '9+' : chat.unread}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Discord-style User Profile Section */}
                <div className="p-2 border-t border-[var(--border-primary)] bg-[var(--bg-primary)]">
                    <UserProfile
                        user={currentUser}
                        isMuted={isMuted}
                        isDeafened={isDeafened}
                        onMuteToggle={onMuteToggle}
                        onDeafenToggle={onDeafenToggle}
                        onStatusChange={onStatusChange}
                        onSettingsClick={onSettingsClick}
                    />
                </div>
            </div>
        </div>
    );
}
