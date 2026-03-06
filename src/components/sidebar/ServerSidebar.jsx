import { MessageSquare, Users, Megaphone, BellRing, Settings, Plus, Moon, Sun } from "lucide-react";

export default function ServerSidebar({
    activeTab = "messages",
    onTabSelect = () => { },
    hasNotifications = false,
    userInitials = "U",
    isDarkMode = false,
    toggleTheme = () => { }
}) {
    return (
        <nav className="w-16 bg-[var(--bg-primary)] rounded-[24px] flex flex-col items-center py-5 shadow-sm border border-[var(--border-primary)] z-10 shrink-0">
            {/* Top Logo / Brand Icon */}
            <div className="mb-6 cursor-pointer transform hover:scale-110 active:scale-95 transition-all duration-300" aria-label="Home">
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-[var(--bg-secondary)] flex justify-center items-center shadow-md shadow-black/5 border border-[var(--border-primary)] overflow-hidden">
                    <img
                        src="/Propstar Revised Logo (1).png"
                        alt="Propstar Logo"
                        className="w-full h-full object-contain p-1"
                    />
                </div>
            </div>

            {/* Navigation Icons */}
            <div className="flex flex-col gap-4 flex-1 w-full items-center">
                <NavItem icon={<MessageSquare size={18} strokeWidth={2} />} label="Chats" active={activeTab === "messages"} onClick={() => onTabSelect("messages")} />
                <NavItem icon={<Users size={18} strokeWidth={2} />} label="Groups" active={activeTab === "groups"} onClick={() => onTabSelect("groups")} />
                <NavItem icon={<Megaphone size={18} strokeWidth={2} />} label="Broadcast Channels" active={activeTab === "broadcasts"} onClick={() => onTabSelect("broadcasts")} />
                <NavItem icon={<BellRing size={18} strokeWidth={2} />} label="Notifications" hasIndicator={hasNotifications} active={activeTab === "notifications"} onClick={() => onTabSelect("notifications")} />
                <NavItem icon={<Settings size={18} strokeWidth={2} />} label="Settings" active={activeTab === "settings"} onClick={() => onTabSelect("settings")} />
            </div>

            {/* Bottom Profile and Theme */}
            <div className="mt-auto flex flex-col items-center gap-3">
                <button
                    onClick={toggleTheme}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-all mb-2"
                    aria-label="Toggle Theme"
                    title="Toggle Light/Dark Mode"
                >
                    {isDarkMode ? <Sun size={18} strokeWidth={2} /> : <Moon size={18} strokeWidth={2} />}
                </button>
                <button className="w-8 h-8 rounded-full border border-dashed border-[var(--border-primary)] text-[var(--text-muted)] flex items-center justify-center hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] transition" aria-label="Add Workspace">
                    <Plus size={16} />
                </button>
                <button className="w-8 h-8 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center text-[var(--text-secondary)] border border-[var(--border-primary)] shadow-sm cursor-pointer hover:ring-2 ring-[var(--text-primary)]/20 transition" aria-label="User Profile">
                    <span className="text-[11px] font-bold text-[var(--text-primary)]">{userInitials}</span>
                </button>
            </div>
        </nav>
    );
}

function NavItem({ icon, active = false, hasIndicator = false, onClick, label }) {
    return (
        <button
            onClick={onClick}
            aria-label={label}
            title={label}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all relative group
      ${active
                    ? "bg-[var(--accent-primary)] text-[var(--accent-text)] shadow-sm"
                    : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
                }
    `}>
            {/* Active Indicator Bar */}
            {active && (
                <div className="absolute -right-[12px] w-1 h-5 bg-[var(--accent-primary)] rounded-l-full"></div>
            )}

            {/* Notification Dot */}
            {hasIndicator && (
                <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-[var(--danger-primary)] rounded-full border border-[var(--bg-primary)]"></div>
            )}

            {icon}
        </button>
    );
}
