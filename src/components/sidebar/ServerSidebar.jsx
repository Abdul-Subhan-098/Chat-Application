import { LayoutDashboard, MessageSquare, Briefcase, BellRing, Settings, Plus, User, Moon, Sun } from "lucide-react";

export default function ServerSidebar({
    activeTab = "messages",
    onTabSelect = () => { },
    hasNotifications = false,
    userInitials = "U",
    isDarkMode = false,
    toggleTheme = () => { }
}) {
    return (
        <nav className="w-16 bg-[#FFFFFF] dark:bg-[#1E1E24]  rounded-[24px] flex flex-col items-center py-5 shadow-sm border border-[#E2E8F0] dark:border-[#333338] dark:border-gray-700 z-10 shrink-0">
            {/* Top Logo / App Icon */}
            <div className="mb-6 cursor-pointer opacity-90 hover:opacity-100 transition" aria-label="Home">
                <div className="w-8 h-8 rounded-xl bg-gray-900 dark:bg-gray-100 flex justify-center items-center">
                    <div className="grid grid-cols-2 gap-[2px]">
                        <div className="w-1.5 h-1.5 rounded-[2px] bg-white dark:bg-gray-900"></div>
                        <div className="w-1.5 h-1.5 rounded-[2px] bg-white dark:bg-gray-900"></div>
                        <div className="w-1.5 h-1.5 rounded-[2px] bg-white dark:bg-gray-900"></div>
                        <div className="w-1.5 h-1.5 rounded-[2px] bg-white dark:bg-gray-900"></div>
                    </div>
                </div>
            </div>

            {/* Navigation Icons */}
            <div className="flex flex-col gap-4 flex-1 w-full items-center">
                <NavItem icon={<LayoutDashboard size={18} strokeWidth={2} />} label="Dashboard" active={activeTab === "dashboard"} onClick={() => onTabSelect("dashboard")} />
                <NavItem icon={<MessageSquare size={18} strokeWidth={2} />} label="Messages" active={activeTab === "messages"} onClick={() => onTabSelect("messages")} />
                <NavItem icon={<Briefcase size={18} strokeWidth={2} />} label="Projects" active={activeTab === "projects"} onClick={() => onTabSelect("projects")} />
                <NavItem icon={<BellRing size={18} strokeWidth={2} />} label="Notifications" hasIndicator={hasNotifications} active={activeTab === "notifications"} onClick={() => onTabSelect("notifications")} />
                <NavItem icon={<Settings size={18} strokeWidth={2} />} label="Settings" active={activeTab === "settings"} onClick={() => onTabSelect("settings")} />
            </div>

            {/* Bottom Profile and Theme */}
            <div className="mt-auto flex flex-col items-center gap-3">
                <button
                    onClick={toggleTheme}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all mb-2"
                    aria-label="Toggle Theme"
                    title="Toggle Light/Dark Mode"
                >
                    {isDarkMode ? <Sun size={18} strokeWidth={2} className="text-amber-400" /> : <Moon size={18} strokeWidth={2} />}
                </button>
                <button className="w-8 h-8 rounded-full border border-dashed border-gray-300 dark:border-gray-600 text-gray-400 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-[#1778F2] hover:border-blue-400 transition" aria-label="Add Workspace">
                    <Plus size={16} />
                </button>
                <button className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-[#64748B] dark:text-[#9CA3AF] border border-gray-200 dark:border-gray-600 shadow-sm cursor-pointer hover:ring-2 ring-blue-500/50 transition" aria-label="User Profile">
                    <span className="text-[11px] font-bold">{userInitials}</span>
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
                    ? "bg-[#EBF4FF] dark:bg-blue-900/40 text-[#1778F2] dark:text-blue-400 shadow-sm"
                    : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                }
    `}>
            {/* Active Indicator Bar */}
            {active && (
                <div className="absolute -right-[12px] w-1 h-5 bg-[#EBF4FF]0 rounded-l-full"></div>
            )}

            {/* Notification Dot */}
            {hasIndicator && (
                <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-[#FFFFFF] dark:border-[#1E1E24]"></div>
            )}

            {icon}
        </button>
    );
}
